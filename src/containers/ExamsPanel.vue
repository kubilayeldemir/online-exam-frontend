<template>
  <div class="container" style="margin-top:50px;margin-left: 15%;margin-right: 50px">
    <Sidebar></Sidebar>
    <!--  <div class="jumbotron">-->
    <!--    <h1 class="display-4">Exams</h1>-->
    <!--    <p class="lead" style="color: black;">On this page you can set exam's name, start-end date, people who will attend exam...</p>-->
    <!--    <hr class="my-4">-->
    <!--  </div>-->

    <div v-for="exam in exams" :key="exam.exam_id">
      <Exam :exam="exam"></Exam>
      <br>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar"
import Exam from "@/components/ExamCard"
import {mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      exams: state => state.exams
    })
  },
  methods: {
    ...mapMutations([
      "setExam"
    ]),
    async getExams() {
      await this.$store.dispatch("getExams");
    }
  },
  props: {},
  name: 'Homepage',
  components: {
    Sidebar,
    Exam

  },
  created() {
    this.getExams()
  }
}
</script>
