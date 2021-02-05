<template>
  <div class="container" style="margin-left: 15%;">
    <sidebar></sidebar>
    <div class="jumbotron">
      <h1 class="display-4">Exam: {{ exam.name }}-{{ exam.lesson }}</h1>
      <h5>Start: {{ exam.startdate | moment("d, MMM,h:mm") }} - End:
        {{ exam.enddate | moment("d, MMM  YYYY,h:mm") }}</h5>
      <h5>Lesson: {{ exam.lesson }}</h5>
      <h5>Teacher: {{ exam.teacher_name }} {{ exam.teacher_surname }}</h5>
      <p class="lead"></p>
      <hr class="my-4">
    </div>
    <router-link :to="{name:'ExamPage',params:{examId : this.exam.exam_id, Exam:exam}}">
      <a class="btn btn-primary btn-lg" role="button" style="float: right;">
        Take Exam!
      </a>
    </router-link>
    {{ this.url }}
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  data() {
    return {
      exam: {}
    }
  },
  name: "ExamURLPage",
  props: {
    url: String
  },
  methods: {
    async getExamByURL(URL) {
      let e = await this.$store.dispatch('getExamByURL', URL);
      this.exam = e[0];
    }
  },
  created() {
    this.getExamByURL(this.url);
  },
  components: {
    Sidebar
  }
}
</script>

<style scoped>

</style>
