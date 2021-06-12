import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {api} from "@/util/api";

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        user: null,
        exams: [],
        createdExam: {},
        examToCreate: {}
    }
}


const state = {
    user: null,
    secret: null,
    exams: [],
    oldExams: [],
    futureExams: [],
    createdExam: {},
    createdQuestions: {},
    examToTake: {
        exam_id: 0,
        questions: [],
        answers: []
    },
    examToCreate: {
        exam_id: 0,
        teacher_id: 2,
        name: "",
        lesson: "",
        startdate: "",
        enddate: "",
        questionNumber: 0,
        questions: []
    }
};
const getters = {
    isAuthenticated: state => !!state.user
};
const mutations = {
    setUser(state, user) {

        state.user = user;
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    },
    logout(state){
      state.user=null;
    },
    setExam(state, examJson) {
        state.exams = examJson.active_exams;
        state.oldExams = examJson.old_exams;
        state.futureExams = examJson.future_exams;
    },
    setExamToTakeId(state, id) {
        state.examToTake.exam_id = id;
    },
    setCreatedExam(state, exam) {
        state.createdExam = exam;
    },
    setExamOptions(state, exam) {
        state.examToCreate.teacher_id = state.user.user_id;
        state.examToCreate.name = exam.name;
        state.examToCreate.lesson = exam.lesson;
        state.examToCreate.questionNumber = exam.questionNumber;
    },
    setExamDate(state, examDate) {
        state.examToCreate.startdate = examDate.startDate;
        state.examToCreate.enddate = examDate.endDate;
    },
    pushToQuestionList(state, question) {
        question.exam_id = state.createdExam.exam_id;
        question.teacher_id = state.user.user_id;
        state.examToCreate.questions.push(question);
    },
    resetAnswerList(state) {
        state.examToTake.answers.length = 0;
    },
    pushToAnswerList(state, answer) {
        state.examToTake.answers.push(answer);
    },
    setCreatedQuestions(state, questions) {
        state.createdQuestions = questions;
    },
    resetQuestions(state) {
        state.examToCreate.questions.length = 0;
    }
};
const actions = {
    async login({commit}, inputObj) {
        const res = await api.post('login', inputObj.input).catch((error) => {
            return error.response
        })
        if (res.status === 200)
            commit('setUser', res.data)
        return res;
    },
    resetStorageState({commit}) {
        commit('resetState')
    },
    async getExams({commit}) {
        const {data} = await api.get('exams')
        commit("setExam", data);
        return data;
    },
    async getExam(examId) {
        const {data} = await api.get(`exams/${examId}`)
        if (data) {
            return data;
        }
    },
    async getExamByURL({commit}, URL) {
        const {data} = await api.get(`exams/url/${URL}`)
        commit("setExamToTakeId", data[0].exam_id)
        return data;
    },
    async postExam({commit, state}) {
        const {data} = await api.post('exams', state.examToCreate);
        if (data) {
            commit("setCreatedExam", data)
        }
    },
    async postQuestions({commit, state}) {
        const res = await api.post(`exams/${state.createdExam.exam_id}/questions`, state.examToCreate.questions);
        if (res.data) {
            commit('setCreatedQuestions', res.data);
            return res;
        }
    },
    async getQuestions({state}) {
        let url = `exams/${state.examToTake.exam_id}/questions`
        const {data} = await api.get(url)
        if (data) {
            return data;
        }
    },
    async postAnswers({state}) {
        let url = `exams/${state.examToTake.answers[0].exam_id}/answers`;
        const {data} = await api.post(url, state.examToTake.answers);
        if (data) {
            return data;
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
