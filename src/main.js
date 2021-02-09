import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'
import VCalendar from 'v-calendar';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret,
    faPlus,
    faMinus,
    faPlusSquare,
    faMinusSquare,
    faThumbtack
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Homepage from "@/containers/Homepage";
import ExamOptions from "@/containers/ExamOptions";
import ExamsPanel from "@/containers/ExamsPanel";
import ExamCreate from "@/containers/ExamCreate";
import ExamPage from "@/containers/ExamPage";
import ExamURLPage from "@/containers/ExamURLPage";
import Login from "@/containers/Login";
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2);

library.add(faUserSecret, faPlus, faMinus, faPlusSquare, faMinusSquare, faThumbtack)
Vue.use(VCalendar, {
    componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />  // ...other defaults
});


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/login', component: Login, name: "Login", props: true, meta: {guest: true}},
        {path: '/', component: Homepage, name: "Homepage", props: true, meta: {requiresAuth: true}},
        {path: '/examoptions', component: ExamOptions, name: "ExamOptions", props: true, meta: {requiresAuth: true}},
        {path: '/exams', component: ExamsPanel, name: "Exams", props: true, meta: {requiresAuth: true}},
        {path: '/examcreate', component: ExamCreate, name: "ExamCreate", props: true, meta: {requiresAuth: true}},
        {path: '/exampage', component: ExamPage, name: "ExamPage", props: true, meta: {requiresAuth: true}},
        {path: '/exam/:url', component: ExamURLPage, name: "ExamURLPage", props: true, meta: {requiresAuth: true}}
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next()
            return
        }
        localStorage.setItem('pathToLoadAfterLogin', to.path)
        next('/login')
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next();
    } else {
        next();
    }
});

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app')
