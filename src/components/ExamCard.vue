<template>
  <div>
    <b-card-group deck>
      <b-card :footer="'Teacher: '+exam.teacher_name+' '+exam.teacher_surname"
              :header='exam.lesson'
              :title="exam.name"
              footer-tag="footer"
              header-tag="header"
              @click="setExamId(exam.exam_id)"
      >

        <b-card-text>
          <span>Start : {{ exam.startdate | moment("dddd, MMMM Do YYYY,h:mm:ss a") }}</span>
          <br>
          <span>End: {{ exam.enddate | moment("dddd, MMMM Do YYYY,h:mm:ss a") }}</span>

        </b-card-text>
        <router-link :to="{name:'ExamPage',params:{examId : this.exam.exam_id, Exam:exam}}">
          <a class="btn btn-primary btn-lg" role="button" style="float: right;">
            Take Exam!
          </a>
        </router-link>
      </b-card>
    </b-card-group>
  </div>
</template>


<script>


export default {
  props: {
    exam: Object
  },
  data() {
    return {}
  },
  methods: {
    setExamId(id) {
      this.$store.commit('setExamToTakeId', id)
    }

  },
  name: 'ExamCard',
  components: {},
  mounted() {
  }
}
</script>
