<template>
  <div v-show="showSidebar===true" class="wrapper" style="position: relative">
    <!-- Sidebar -->
    <nav id="sidebar" :class="{ hide: hide }">
      <div style="margin: 10px" @click="hide = !hide">
        <font-awesome-icon class="pointer " icon="thumbtack" size="lg" style=""/>
      </div>
      <div class="sidebar-header">
        <h3 :class="{ hide: hide }">Quick Exam</h3>
      </div>

      <ul class="list-unstyled components">
        <p>Welcome to Quick Exams</p>
        <li class="homeButton" :class="{ active: isHome }">
          <a aria-expanded="false" class="" data-toggle="collapse" @click="isExamCreate=true">
            <router-link :to="{name:'Homepage'}">Home</router-link>
          </a>
        </li>
        <li class="createExam" v-if="user.usertype!==2" :class="{ active: isExamCreate }" @click="goCreateExam">
          <a href="#">
            <router-link :to="{name:'ExamOptions'}">Create Exams</router-link>
          </a>
        </li>
        <li class="examsButton">
          <a aria-expanded="false" class="" data-toggle="collapse" href="#pageSubmenu">
            <router-link :to="{name:'Exams'}">Exams</router-link>
          </a>
          <ul id="pageSubmenu" class="collapse list-unstyled">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a @click.prevent="logoutRequest" href="#">Logout</a>
        </li>
      </ul>


    </nav>
    <!-- Page Content -->
    <div id="content">

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">


        </div>
      </nav>
    </div>
  </div>
</template>

<script>


import {mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      hide: false,
      showSidebar: true,
      active: true,
      isHome: true,
      isExamCreate: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations([
      "logout"
    ]),
    logoutRequest(){
      this.logout()
      location.reload();
    },
    goCreateExam() {
      this.isHome = false;
      this.isExamCreate = true
    }
  },
  name: 'Sidebar',
  components: {}
}
</script>
<style>
.wrapper {
  display: flex;
  width: 100%;
}

#sidebar {
  width: 13%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #7386D5;
  color: #fff;
  transition: all 0.3s;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
}

#sidebar p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #ffffff;
}

a, a:hover, a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #4169E1;
  color: #fff;
  transition: all 0.3s;
}

.hide {
  width: 5% !important;
  font-size: 10px !important;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #4169E1;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #7386D5;
  background: #a7b9f1;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
  color: #fff;
  background: #2251dd;
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}
</style>
