<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">Exam: {{ Exam.name }}-{{ Exam.lesson }}</h1>
      <h5>Start: {{ Exam.startdate | moment("d, MMM,h:mm") }} - End:
        {{ Exam.enddate | moment("d, MMM  YYYY,h:mm") }}</h5>
      <h5>Teacher: {{ Exam.teacher_name }} {{ Exam.teacher_surname }}</h5>
      <p class="lead"></p>
      <hr class="my-4">

    </div>

    <exam-question v-for="(question,index) in questions" :key="index" ref="questionsRef"
                   :index="index" :question="questions[index]"></exam-question>
    <button class="btn btn-primary btn-lg" style="float:right;margin-right: 15%" type="button"
            @click="askAndSendAnswers">Complete Exam
    </button>

  </div>
</template>


<script>
import ExamQuestion from "@/components/ExamQuestion";
import * as Swal from "sweetalert2";

export default {
  props: {Exam: {}},
  data() {
    return {
      questions: []
    }
  },
  methods: {
    async askAndSendAnswers() {
      Swal.fire({
        title: 'Are you sure to complete exam?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, send my answers!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sendExamAnswers().then(res => {
            Swal.fire(
                'Success!',
                'Your answers has been sent.',
                'success'
            )
            console.log(res);
          }).catch(err => {
            if (err.response.status !== 200) {
              Swal.fire(
                  'Sorry',
                  "We couldn't send your answers. You tried to send answers twice?",
                  'error'
              );
            }
          })

        }
      })

    },
    async sendExamAnswers() {
      this.$store.commit("resetAnswerList");
      for (let i = 0; i < this.$refs.questionsRef.length; i++) {
        this.$refs.questionsRef[i].pushAnswer();
      }
      await this.$store.dispatch('postAnswers');

    },
    async getExamQuestions() {
      this.questions = await this.$store.dispatch('getQuestions')
    }
  },
  created() {
    this.getExamQuestions()
  },
  name: 'ExamPage',
  components: {
    ExamQuestion
  }
}
</script>
