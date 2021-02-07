<template>
  <div class="selam">
    <div id="login">
      <h1>Login</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Mail</span>
        </div>
        <input v-model="input.mail" type="text" class="form-control" placeholder="ogretmen@ege.edu.tr" aria-label="Username" aria-describedby="basic-addon1">
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
        mail: "",
        password: "",
      }
    }
  },
  computed:{

  },
  methods: {

    async login() {

      var temp = {};

      var AuthKey = `${this.input.mail}:${this.input.password}`;
      console.log(AuthKey)
      var crypto = await this.CryptoJS.AES.encrypt(AuthKey, "sifrecisifrecii").toString();
      console.log(crypto)
      temp.input=this.input;
      temp.secret=crypto;
      var result = await this.$store.dispatch('login',temp)
      if(result.status===401){
        this.$swal({
          title: 'Error!',
          text: 'Wrong mail or password!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else{
        console.log(result)
        localStorage.setItem('Auth', crypto)
        this.$router.push(localStorage.getItem('pathToLoadAfterLogin') || '/');
      }




    }

  },
  created(){
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
