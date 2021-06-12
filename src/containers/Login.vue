<template>
  <div class="selam">
    <div id="login">
      <h1>Login</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span id="basic-addon1" class="input-group-text">Mail</span>
        </div>
        <input v-model="input.mail" aria-describedby="basic-addon1" aria-label="Username" class="form-control loginMail"
               placeholder="ogretmen@ege.edu.tr" type="text">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span id="basic-addon1" class="input-group-text">Password </span>
        </div>
        <input v-model="input.password" aria-describedby="basic-addon1" aria-label="Username" class="form-control loginPassword"
               placeholder="Password" type="password" v-on:keyup.enter="login()">
      </div>
      <div style="color: aliceblue;text-decoration: none">
        <button class="btn btn-light login" style="margin-left: 200px" type="button" v-on:click="login()">Login</button>
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
        mail: "",
        password: "",
      }
    }
  },
  computed: {},
  methods: {

    async login() {

      var temp = {};

      var AuthKey = `${this.input.mail}:${this.input.password}`;
      var crypto = await this.CryptoJS.AES.encrypt(AuthKey, "sifrecisifrecii").toString();
      temp.input = this.input;
      temp.secret = crypto;
      var result = await this.$store.dispatch('login', temp)
      if (result.status === 401) {
        this.$swal({
          title: 'Error!',
          text: 'Wrong mail or password!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        localStorage.setItem('Auth', crypto)
        this.$router.push(localStorage.getItem('pathToLoadAfterLogin') || '/');
      }


    }

  },
  created() {
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
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
  background: url('../../src/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}
</style>
