import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {api} from "@/util/api";

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        user: {
            user_id: 2,
            user_name: ""
        },
        exams: [],
        createdExam: {},
        examToCreate: {
            exam_id: 30,
            teacher_id: 2,
            name: "",
            lesson: "",
            startdate: "",
            enddate: "",
            questionNumber: 0,
            questions: []
        }
    }
}


const state = {
    user: {
        user_id: 2,
        user_name: ""
    },
    exams: [],
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
const getters = {};
const mutations = {
    resetState(state) {
        Object.assign(state, getDefaultState())
    },
    setExam(state, examJson) {
        state.exams = examJson;
    },
    setExamToTakeId(state, id) {
        state.examToTake.exam_id = id;
    },
    setCreatedExam(state, exam) {
        state.createdExam = exam;
    },
    setExamOptions(state, exam) {
        state.examToCreate.name = exam.name;
        state.examToCreate.lesson = exam.lesson;
        state.examToCreate.questionNumber = exam.questionNumber;
    },
    setExamDate(state, examDate) {
        state.examToCreate.startdate = examDate.startDate;
        state.examToCreate.enddate = examDate.endDate;
    },
    pushToQuestionList(state, question) {
        question.exam_id = state.examToCreate.exam_id;
        question.teacher_id = state.user.user_id;
        console.log(question)
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
    resetStorageState({commit}) {
        commit('resetState')
    },
    async getExams({commit}) {
        const {data} = await api.get('exams')
        commit("setExam", data);
        return data;
    },
    async postExam({commit, state}) {
        const {data} = await api.post('exams', state.examToCreate);
        if (data) {
            commit("setCreatedExam", data)
        }
    },
    async postQuestions({commit, state}) {
        const {data} = await api.post(`exams/${state.createdExam.exam_id}/questions`, state.examToCreate.questions);
        if (data) {
            commit('setCreatedQuestions', data);
            return data;
        }
    },
    async getExam(examId) {
        const {data} = await api.get(`exams/${examId}`)
        if (data) {
            return data;
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
