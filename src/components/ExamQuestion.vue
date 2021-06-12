<template>
  <div class="container">
    <div class="input-group ">
      <span class="input-group-text"> Question: {{ index + 1 }}</span>
      <textarea v-model="question.question_text" aria-label="With textarea" class="form-control" readonly></textarea>
    </div>

    <b-form-group v-slot="{ ariaDescribedby }" label="Options:">
      <b-form-radio v-model="answer.selected_option" :aria-describedby="ariaDescribedby" :name="'radio'+index"
                    class="inputBox" :class="'choice'+'A'" value="A">
        <p>{{ question.option_1 }}</p>
      </b-form-radio>
      <b-form-radio v-model="answer.selected_option" :aria-describedby="ariaDescribedby" :name="'radio'+index"
                    class="inputBox" :class="'choice'+'B'" value="B">
        <p>{{ question.option_2 }}</p>
      </b-form-radio>
      <b-form-radio v-model="answer.selected_option" :aria-describedby="ariaDescribedby" :name="'radio'+index"
                    class="inputBox" :class="'choice'+'C'" value="C">
        <p>{{ question.option_3 }}</p>
      </b-form-radio>
      <b-form-radio v-model="answer.selected_option" :aria-describedby="ariaDescribedby" :name="'radio'+index"
                    class="inputBox" :class="'choice'+'D'" value="D">
        <p>{{ question.option_4 }}</p>
      </b-form-radio>
      <b-form-radio v-model="answer.selected_option" :aria-describedby="ariaDescribedby" :name="'radio'+index"
                    class="inputBox" :class="'choice'+'E'" value="E">
        <p>{{ question.option_5 }}</p>
      </b-form-radio>
    </b-form-group>
  </div>
</template>


<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      answer: {
        selected_option: "",
        question_id: 0,
        exam_id: 0,
        student_id: 0
      }
    }
  },
  computed: {
    ...mapState({
      exam_id: state => state.examToTake.exam_id,
      student_id: state => state.user.user_id
    })
  },
  methods: {
    pushAnswer() {
      this.$store.commit("pushToAnswerList", this.answer);
    }
  },

  name: 'ExamQuestion',
  components: {},
  props: {
    question: {},
    examId: Number,
    index: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.answer.question_id = this.question.question_id;
    this.answer.exam_id = this.question.exam_id;
    this.answer.student_id = this.student_id;
  }

}
</script>
<style scoped>
.inputBox {
  margin-top: 3px;
}

.form-control {
  width: 300%;
  margin: 0px;
  padding: 0px;
}

</style>

