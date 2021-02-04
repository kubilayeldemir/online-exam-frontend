<template>
  <div class="container" style="margin-top:50px;margin-left: 15%;margin-right: 50px">

    <div style="">
      <Sidebar></Sidebar>
    </div>
    <div class="jumbotron">
      <h1 class="display-4">Welcome to exam create page!</h1>
      <p class="lead" style="color: black;">On this page you can set exam's name, start-end date, people who will attend
        exam...</p>
      <hr class="my-4">
    </div>

    <div class="row">
      <h5 class="col">Write a name for your exam</h5>
      <div class=" input-group " style="">
        <div class="input-group-prepend ">
          <span id="inputGroup-sizing-default" class="input-group-text">Exam Name:</span>
        </div>
        <input v-model="exam.name" aria-describedby="inputGroup-sizing-default" aria-label="Sizing example input"
               class="form-control"
               type="text"
               @change="setOptions">
      </div>
    </div>
    <br>
    <div class="row">

      <div class=" input-group " style="">
        <div class="input-group-prepend ">
          <span id="inputGroup-sizing-default" class="input-group-text">Lesson:</span>
        </div>
        <input v-model="exam.lesson" aria-describedby="inputGroup-sizing-default" aria-label="Sizing example input"
               class="form-control"
               type="text"
               @change="setOptions">
      </div>
    </div>

    <br>
    <my-date text="Start date and time of your exam"></my-date>

    <p class="lead">
      <router-link :to="{name:'createexam',params:{examisim : examName}}"
                   style="color: aliceblue;text-decoration: none">
        <a class="btn btn-primary btn-lg" role="button" style="float: right;" @click="console.log('...')">
          Next step
        </a>
      </router-link>
    </p>
  </div>
</template>

<script>
import MyDate from "@/components/myDate";
import Sidebar from "@/components/Sidebar";
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      exam: {
        name: "",
        lesson: ""
      }
    }
  },

  methods: {
    ...mapMutations([
      "setExamOptions"
    ]),
    ...mapActions([
      "postExam"
    ]),
    setOptions() {
      this.$store.commit("setExamOptions", this.exam)
    },
    async sendExam(){
      await this.$store.dispatch("postExam");
    }
  },
  computed: {

  },

  name: 'ExamOptions',
  components: {Sidebar, MyDate}

}
</script>
<style>

</style>
