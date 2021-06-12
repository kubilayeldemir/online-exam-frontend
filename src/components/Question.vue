<template>
  <div class="container">
    <div class="input-group ">
      <span class="input-group-text"> Enter your question</span>
      <textarea v-model="question.question_text" aria-label="With textarea" class="form-control questionText" :class="'question'+index"></textarea>
    </div>

    <b-form-group label="Options:" v-slot="{ ariaDescribedby }">
      <b-form-radio class="inputBox" v-model="question.correct_option" :aria-describedby="ariaDescribedby" :name="'radio'+index" value="A">
        <input v-model="question.option_1" type="text" class="form-control" :class="'question'+index+'A'">
      </b-form-radio>
      <b-form-radio class="inputBox" v-model="question.correct_option" :aria-describedby="ariaDescribedby" :name="'radio'+index" value="B">
        <input v-model="question.option_2" type="text" class="form-control" :class="'question'+index+'B'">
      </b-form-radio>
      <b-form-radio class="inputBox" v-model="question.correct_option" :aria-describedby="ariaDescribedby" :name="'radio'+index" value="C">
        <input v-model="question.option_3" type="text" class="form-control" :class="'question'+index+'C'">
      </b-form-radio>
      <b-form-radio class="inputBox" v-model="question.correct_option" :aria-describedby="ariaDescribedby" :name="'radio'+index" value="D">
        <input v-model="question.option_4" type="text" class="form-control" :class="'question'+index+'D'">
      </b-form-radio>
      <b-form-radio class="inputBox" v-model="question.correct_option" :aria-describedby="ariaDescribedby" :name="'radio'+index" value="E">
        <input v-model="question.option_5" type="text" class="form-control" :class="'question'+index+'E'">
      </b-form-radio>
    </b-form-group>
  </div>


</template>


<script>

export default {
  data() {
    return {
      question:{
        question_text:"",
        correct_option: "",
        option_1:"",
        option_2:"",
        option_3:"",
        option_4:"",
        option_5:""
      }

    }
  },
  methods: {
    pushQuestion(){
      this.$store.commit("pushToQuestionList",this.question);
    }
  },

  name: 'Question',
  components: {},
  props:{
    index:{
      type:Number,
      default:0
    }
  }
}
</script>
<style scoped>
.inputBox{
  margin-top: 3px;
}
.form-control{
  width: 300%;
  margin: 0px;
  padding: 0px;
}

</style>
