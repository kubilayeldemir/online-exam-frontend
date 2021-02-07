<template>
  <div class="container" style="margin-left: 15%;">

    <Sidebar></Sidebar>
    <div class="jumbotron">
      <h1 class="display-4">Exam: {{ examisim }}</h1>
      <p class="lead"></p>
      <hr class="my-4">

    </div>

    <div>
      <question v-for="index in examToCreate.questionNumber" :key="index" ref="questions" :index="index"></question>
    </div>
    <!--<button @click="printRef">Ref print ve sıfırla</button>-->
    <button @click="sendExam">Create Exam And Post questions.</button>
    <button @click="sendQuestions">Post questions.</button>

    <!--    <p class="lead">-->
    <!--      <router-link :to="{name:'Succesfull'}"-->
    <!--                   style="color: aliceblue;text-decoration: none">-->
    <!--        <a class="btn btn-primary btn-lg" style="float: right;" role="button">-->
    <!--          Create Exam-->
    <!--        </a>-->
    <!--      </router-link>-->
    <!--    </p>-->

  </div>
</template>


<script>
import Question from "@/components/Question";
import Sidebar from "@/components/Sidebar";
import {mapState} from "vuex";

export default {
  data() {
    return {
      count: 5
    }
  },
  computed: {
    ...mapState(["examToCreate"])
  },
  methods: {
    createExamPostQuestions() {

    },
    printRef() {
      this.$store.dispatch("resetStorageState");
    },
    async sendExam() {
      await this.$store.dispatch("postExam");
    },
    async sendQuestions() {
      this.$store.commit('resetQuestions');

      for (let i = 0; i < this.$refs.questions.length; i++) {
        this.$refs.questions[i].pushQuestion();
      }
      console.log(this.examToCreate)
      await this.$store.dispatch("postQuestions")
    }
  },
  props: {
    examisim: String,
    examStart: String,
    examEnd: String,
  },
  name: 'ExamCreate',
  components: {
    Question,
    Sidebar


  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
