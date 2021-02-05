<template>
  <div>
    <exam-question v-for="(question,index) in questions" :key="index" :index="index"
                   :question="questions[index]"></exam-question>
  </div>
</template>


<script>
import ExamQuestion from "@/components/ExamQuestion";

export default {
  props: {},
  data() {
    return {
      questions: []
    }
  },
  methods: {
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
