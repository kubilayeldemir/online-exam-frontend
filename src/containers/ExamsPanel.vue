<template>
  <div class="container" style="margin-top:50px;margin-left: 15%;margin-right: 50px">
    <Sidebar></Sidebar>
    <!--  <div class="jumbotron">-->
    <!--    <h1 class="display-4">Exams</h1>-->
    <!--    <p class="lead" style="color: black;">On this page you can set exam's name, start-end date, people who will attend exam...</p>-->
    <!--    <hr class="my-4">-->
    <!--  </div>-->
    <h1>Active Exams:</h1>
    <div v-for="exam in exams" :key="exam.exam_id">
      <Exam :exam="exam"></Exam>
      <br>
    </div>

    <b-button v-b-toggle="'collapse-2'" class="m-1">Future Exams</b-button>
    <b-collapse id="collapse-2" style="">
      <div v-for="exam in futureExams" :key="exam.exam_id">
        <Exam :exam="exam" :is-active="false"></Exam>
        <br>
      </div>
    </b-collapse>
    <br>
    <b-button v-b-toggle="'collapse-3'" class="m-1">Past Exams</b-button>
    <b-collapse id="collapse-3" style="">
      <div v-for="exam in oldExams" :key="exam.exam_id">
        <Exam :exam="exam" :is-active="false"></Exam>
        <br>
      </div>
    </b-collapse>

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
      exams: state => state.exams,
      oldExams: state => state.oldExams,
      futureExams: state => state.futureExams
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
