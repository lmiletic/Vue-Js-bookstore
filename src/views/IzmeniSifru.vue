<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <div class="wrapper main-wrapper">
      <Card>
        <template v-slot:header>
          <p class="heading">Izmena lozinke</p>
        </template>

        <div class="inputs-wrapper">
          <input
            v-model="oldPass"
            id="input1"
            class="input-text"
            type="password"
            placeholder="Stara lozinka"
          />
          <input
            v-model="newPass"
            id="input2"
            class="input-text"
            type="password"
            placeholder="Nova lozinka"
          />
          <input
            v-model="newPassRept"
            id="input3"
            class="input-text"
            type="password"
            placeholder="Ponovite novu lozinku"
          />
        </div>
        <div class="checkbox-wrapper">
          <input class="checkbox-button" type="checkbox" @click="showPass()" />
          <p class="checkbox-info">Prikaži šifru</p>
        </div>

        <div v-if="notFilled" class="error-unsuccessful-save">
          <p>Moraju sva polja da budu popunjena!</p>
        </div>
        <div v-if="notOld" class="error-unsuccessful-save">
          <p>Pogrešna lozinka!</p>
        </div>
        <div v-if="notSame" class="error-unsuccessful-save">
          <p>Nove lozinke se ne poklapaju!</p>
        </div>
        <div v-if="saved">
          <p>Uspešno sačuvano!</p>
        </div>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="changePass()">Izmeni</button>
        </template>
      </Card>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import LogoBar from "@/components/LogoBar.vue";
import Card from "@/components/Card.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "IzmeniSifru",
  components: {
    Card,
    Sidebar,
    LogoBar,
  },
  created() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  data() {
    return {
      user: null,
      notFilled: false,
      saved: false,
      notSame: false,
      notOld: false,
      oldPass: "",
      newPass: "",
      newPassRept: "",
    };
  },
  methods: {
    changePass() {
      if (this.oldPass == "" || this.newPass == "" || this.newPassRept == "") {
        this.saved = false;
        this.notFilled = true;
        this.notOld = false;
        this.notSame = false;
      } else {
        if (this.oldPass == this.user.password) {
          if (this.newPass == this.newPassRept) {
            this.saved = true;
            this.notFilled = false;
            this.notOld = false;
            this.notSame = false;
            this.user.password = this.newPass;
            localStorage.setItem("user", JSON.stringify(this.user));
          } else {
            this.saved = false;
            this.notFilled = false;
            this.notOld = false;
            this.notSame = true;
          }
        } else {
          this.saved = false;
          this.notFilled = false;
          this.notOld = true;
          this.notSame = false;
        }
      }
    },
    showPass() {
      for (let i = 1; i < 4; i++) {
        var id = "input";
        id += i;
        var x = document.getElementById(id);
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
    },
  },
};
</script>

<style>
.heading {
  font-size: 36px;
}

button {
  margin: 5px;
}

.checkbox-button {
  margin-left: 10px;
}

.checkbox-info {
  margin-left: 10px;
}

.checkbox-wrapper {
  height: 40px;
  width: 270px;
  padding: 10px;
  display: flex;
  font-size: 16px;
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

.error-unsuccessful-save {
  color: red;
}
</style>
