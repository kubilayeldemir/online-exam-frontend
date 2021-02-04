<template>
  <div class="body">
    <sidebar></sidebar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container announcementt">
        <h1 class="display-4">Welcome to Online Exam Creator</h1>
        <p class="lead" style="color: black">You can create, join exams. Check your results and much more... </p>
      </div>
    </div>

    <br>
    <div class="announcement">
      <h2>Announcements</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        llamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
      <p>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        llamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>
    </div>


  </div>
</template>


<script>
import Sidebar from "@/components/Sidebar"

export default {
  data() {
    return {}
  },
  methods: {},
  props: {
    examisim: String,
    examStart: String,
    examEnd: String,
  },
  name: 'Homepage',
  components: {
    Sidebar

  },
  // created() {
  //   axios.get(`http://localhost:3000/api/users`)
  //       .then(response => {
  //         // JSON responses are automatically parsed.
  //         console.log(response.data);
  //       })
  //       .catch(e => {
  //         this.errors.push(e)
  //       })
  // }
}
</script>
<style scoped>
.announcement {
  width: 50%;
  margin-left: 25%;
  font-size: 1.1vw;
  font-family: 'Dosis', Arial, Helvetica, sans-serif;
  color: black;
}

.announcementt {
  width: 50%;
  margin-left: 25%;
  font-size: 1.5vw;
  font-family: 'Dosis', Arial, Helvetica, sans-serif;
  color: black;
}

.announcement h2 {
  font-size: 1.5em;
  letter-spacing: 0.04em;
  margin: 0;
  font-weight: normal;
  color: black;
}

.announcement {
  color: black;
  padding: 10px 15px 0px;
  border: 1px solid #e1e1e1;
  background-color: #f9f9f9;
  border-radius: 4px;

}

.announcement p {
  color: black;
  font-size: 0.75em;
}
</style>
