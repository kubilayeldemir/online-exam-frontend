<template>
  <div>
    <h5 class="d-flex justify-content-center">{{ text }}</h5>
    <vc-date-picker
        v-model="examdate.startDate"
        @input="setDate"
        :model-config="modelConfig"
        :disabled-dates='[
    {
      start: new Date(2021, 1, 10),
      end: new Date(2021, 1, 10)
    }]'
        :min-date='new Date()'
        class="d-flex justify-content-center"
        is24hr
        mode="dateTime" >
      <template v-slot="{ inputValue, inputEvents }">
        <input
            v-on="inputEvents"
            :value="inputValue"
            class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"

        />
      </template>
    </vc-date-picker>
    <div v-if="this.examdate.startDate!==null">
      <h5 class="d-flex justify-content-center">End date and time of your exam</h5>
      <vc-date-picker
          v-model="examdate.endDate"
          :model-config="modelConfig"
          :disabled-dates='[{start: new Date(2021, 1, 10),end: new Date(2021, 1, 10)}]'
          :min-date='examdate.startDate' class="d-flex justify-content-center" is24hr mode="dateTime"
          @input="setDate">
        <template v-slot="{ inputValue, inputEvents }">
          <input
              v-on="inputEvents"
              :value="inputValue"
              class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"

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
      },
      forbiddenDates: ['Fri Feb 12 2021 16:00:00 GMT+0300 (GMT+03:00)',
        'Fri Feb 12 2021 15:00:00 GMT+0300 (GMT+03:00)',
        'Fri Feb 12 2021 14:00:00 GMT+0300 (GMT+03:00)',
        'Fri Feb 12 2021 17:00:00 GMT+0300 (GMT+03:00)',
        'Mon Feb 15 2021 10:00:00 GMT+0300 (GMT+03:00)',
        'Mon Feb 15 2021 11:00:00 GMT+0300 (GMT+03:00)',
        'Mon Feb 15 2021 12:00:00 GMT+0300 (GMT+03:00)',
        'Mon Feb 15 2021 13:00:00 GMT+0300 (GMT+03:00)']
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
  watch: {
    // whenever question changes, this function will run
    /*date: function (date) {
      console.log(this.forbiddenDates[0]);
      var i;
      for (i = 0; i < this.forbiddenDates.length; i++) {
        if (date.toString().localeCompare(this.forbiddenDates[i]) === 0) {
          this.date = null;
          this.date2 = null;
          this.$swal({
            title: 'Error!',
            text: 'There is already an exam at this date, please select a different date',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    }*/
  }

}
</script>


