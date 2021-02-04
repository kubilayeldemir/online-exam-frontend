<template>
  <b-card-group deck>
    <b-card
        :footer="'Teacher: '+exam.teacher_name+' '+exam.teacher_surname"
        :header='exam.lesson'
        :title="exam.name"
        footer-tag="footer"
        header-tag="header"
    >

      <b-card-text>
        <span>Start : {{ exam.startdate | moment("dddd, MMMM Do YYYY,h:mm:ss a") }}</span>
        <br>
        <span>End: {{ exam.enddate | moment("dddd, MMMM Do YYYY,h:mm:ss a") }}</span>

      </b-card-text>
      <b-button href="#" variant="primary">Take Exam</b-button>
    </b-card>
  </b-card-group>
</template>


<script>


export default {
  props: {
    exam: Object,
    header: String,
    headerTag: String,
    footer: String,
    footertag: String,
    title: String
  },
  data() {
    return {
      hide: false,
      showSidebar: true,
      active: true,
      isHome: true,
      isExamCreate: false
    }
  },
  methods: {
    goCreateExam() {
      this.isHome = false;
      this.isExamCreate = true
    }
  },
  name: 'Exam',
  components: {}
}
</script>
