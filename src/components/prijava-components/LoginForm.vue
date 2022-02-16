<template>
  <div class="wrapper wrapper-top">
    <Card>
      <template v-slot:header>
        <p class="heading">Dobrodošli!</p>
      </template>

      <div class="inputs-wrapper">
        <input
          v-model="username"
          class="input-text"
          type="text"
          placeholder="Korisničko ime"
        />
        <input
          v-model="password"
          class="input-text"
          type="password"
          placeholder="Lozinka"
        />
      </div>
      <div v-if="loginError" class="error-unsuccessful-login">
        <p>Pogrešni kredencijali!</p>
      </div>

      <template v-slot:footer>
        <button class="btn btn-primary" @click="checkLogin()">Prijava</button>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import korisnici from "@/data/korisnici.js";
import router from "@/router";

export default {
  name: "LoginForm",
  components: {
    Card,
  },
  data() {
    return {
      username: "",
      password: "",
      loginError: false,
      users: []
    };
  },
  created(){
    if(localStorage.getItem("users")){
      this.users = JSON.parse(localStorage.getItem("users"));
    }else{
      localStorage.setItem("users", JSON.stringify(korisnici));
      this.users = korisnici;
    }
  },
  methods: {
    checkLogin() {
      let ret = this.users.every((korisnik) => {
        if (
          korisnik.username == this.username &&
          korisnik.password == this.password
        ) {
          localStorage.setItem("user", JSON.stringify(korisnik));
          return false;
        }
        return true;
      });
      if (!ret) {
        router.push({ path: "/" });
      } else {
        this.loginError = true;
      }
    },
  },
};
</script>

<style>
.heading {
  font-size: 36px;
}

.input-text {
  background-color: #c9d6df;
  border-radius: 30px;
  font-size: 16px;
  height: 40px;
  width: 270px;
  padding: 20px;
  border: none;
  margin-bottom: 20px;
}

.inputs-wrapper {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.error-unsuccessful-login {
  color: red;
}
</style>
