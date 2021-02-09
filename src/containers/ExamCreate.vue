<template>
  <div class="container" style="margin-left: 15%;">

    <Sidebar></Sidebar>
    <div class="jumbotron">
      <h2>Exam: {{ examToCreate.name }}</h2>
      <h3>Lesson: {{ examToCreate.lesson }}</h3>
      <h3>{{ examToCreate.startdate }} <span>-{{ examToCreate.enddate }}</span></h3>
      <h3 style=""></h3>


      <p class="lead"></p>
      <hr class="my-4">

    </div>

    <div>
      <question v-for="index in examToCreate.questionNumber" :key="index" ref="questions" :index="index"></question>
    </div>
    <!--<button @click="printRef">Ref print ve sıfırla</button>-->
    <button class="btn btn-primary btn-lg" style="float:right;margin-right: 15%" @click="createExamPostQuestions">Create
      Exam
    </button>
    <!--    <button @click="sendQuestions">Post questions.</button>-->

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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      count: 5
    }
  },
  computed: {
    ...mapState(["examToCreate", "createdExam"])
  },
  methods: {
    async createExamPostQuestions() {
      await this.sendExam();
      var res = await this.sendQuestions();
      this.finalAlert(res)
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
      var questions = await this.$store.dispatch("postQuestions")
      return questions
    },
    finalAlert(response) {
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: "Exam has been created",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to Homepage',
          showCancelButton: true,
          cancelButtonColor: '#fc0',
          cancelButtonText: 'Show Exam'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/')
          } else {
            this.$router.push(`/exam/` + this.createdExam.url)
          }
        })
      } else {
        Swal.fire(
            'Error!',
            "Sorry, We couldn't create exam...",
            'error'
        )
      }
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
