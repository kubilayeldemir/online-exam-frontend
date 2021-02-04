import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {api} from "@/util/api";

Vue.use(Vuex);

const state = {
    user: {
        user_id: 2,
        user_name: ""
    },
    exams: [],
    createdExam: {},
    examToCreate: {
        teacher_id: 2,
        name: "",
        lesson: "",
        startdate: "",
        enddate: "",

    }
};
const getters = {};
const mutations = {
    setExam(state, examJson) {
        state.exams = examJson;
    },
    setCreatedExam(state, exam) {
        state.createdExam = exam;
    },
    setExamOptions(state, exam) {
        state.examToCreate.name = exam.name;
        state.examToCreate.lesson = exam.lesson;
    },
    setExamDate(state, examDate) {
        state.examToCreate.startdate = examDate.startDate;
        state.examToCreate.enddate = examDate.endDate;
    }
};
const actions = {
    async getExams({commit}) {
        const {data} = await api.get('exams')
        commit("setExam", data);
        return data;
    },
    async postExam({commit,state}) {
        const {data} = await api.post('exams', state.examToCreate);
        if (data) {
            commit("setCreatedExam", data)
        }
    }
};


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState()]
})
export default store;
