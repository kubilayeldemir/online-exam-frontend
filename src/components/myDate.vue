<template>
  <div>
    <h5 class="d-flex justify-content-center">{{ text }}</h5>
    <vc-date-picker
        v-model="examdate.startDate"
        :min-date='new Date()'
        :model-config="modelConfig"
        class="d-flex justify-content-center"
        is24hr
        mode="dateTime"
        @input="setDate">
      <template v-slot="{ inputValue, inputEvents }">
        <input
            v-on="inputEvents"
            :value="inputValue"
            class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300 startDate"

        />
      </template>
    </vc-date-picker>
    <div v-if="this.examdate.startDate!==''">
      <h5 class="d-flex justify-content-center">End date and time of your exam</h5>
      <vc-date-picker
          v-model="examdate.endDate"
          :min-date='examdate.startDate'
          :model-config="modelConfig" class="d-flex justify-content-center" is24hr mode="dateTime"
          @input="setDate">
        <template v-slot="{ inputValue, inputEvents }">
          <input
              v-on="inputEvents"
              :value="inputValue"
              class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300 endDate"
          />
        </template>
      </vc-date-picker>
    </div>


  </div>
</template>


<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      examdate: {
        startDate: "",
        endDate: ""
      },
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD HH:MM:SS', // Uses 'iso' if missing
      }
    }
  },
  props: {
    text: String,

  },
  name: 'myDate',
  methods: {
    setDate() {
      this.$store.commit("setExamDate", this.examdate);
    },
    ...mapMutations([
      "setExamDate"
    ])

  },
  watch: {}

}
</script>


