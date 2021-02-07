<template>
  <div class="selam">
    <div id="login">
      <h1>Login</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Mail</span>
        </div>
        <input v-model="input.username" type="text" class="form-control" placeholder="ogretmen@ege.edu.tr" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1" >Password </span>
        </div>
        <input v-model="input.password" v-on:keyup.enter="login()" type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div style="color: aliceblue;text-decoration: none">
        <button style="margin-left: 200px" v-on:click="login()" type="button" class="btn btn-light">Login</button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  computed:{

  },
  methods: {

    login() {
      this.$store.commit('setUser');
      this.$router.push(localStorage.getItem('pathToLoadAfterLogin') || 'somedefaultroute');


      // this.$swal({
        //   title: 'Error!',
        //   text: 'Wrong mail or password!',
        //   icon: 'error',
        //   confirmButtonText: 'OK'
        // });
    }

  },
  created(){
      console.log(this.CryptoJS.AES.encrypt("kubilayeldemir@hotmail.com:admin5432", "sifrecisifrecii").toString())
  }
}
</script>

<style scoped>
#login {
  opacity: 1;
  width: 500px;


  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
.selam {
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:1000;
  background: url('../../src/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}
</style>
