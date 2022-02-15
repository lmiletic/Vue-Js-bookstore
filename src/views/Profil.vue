<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <div class="wrapper main-wrapper">
      <Card>
        <template v-slot:header>
          <p class="heading">Profil</p>
        </template>

        <div class="inputs-wrapper">
          <input
            v-model="user.ime"
            class="input-text"
            type="text"
            placeholder="Ime"
          />
          <input
            v-model="user.prezime"
            class="input-text"
            type="text"
            placeholder="Prezime"
          />
          <input
            v-model="user.telefon"
            class="input-text"
            type="text"
            placeholder="Kontakt telefon"
          />
          <input
            v-model="user.adresa"
            class="input-text"
            type="text"
            placeholder="Adresa"
          />
        </div>
        <div v-if="notFilled" class="error-unsuccessful-save">
          <p>Moraju sva polja da budu popunjena!</p>
        </div>
        <div v-if="saved">
          <p>Uspešno sačuvano!</p>
        </div>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="save()">Sačuvaj</button>
          <button class="btn btn-primary" @click="changePass()">
            Izmeni lozinku
          </button>
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
import router from "@/router";

export default {
  name: "Profil",
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
    };
  },
  methods: {
    save() {
      if (
        this.user.ime == "" ||
        this.user.prezime == "" ||
        this.user.telefon == "" ||
        this.user.adresa == ""
      ) {
        this.notFilled = true;
        this.saved = false;
      } else {
        this.notFilled = false;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.saved = true;
      }
    },
    changePass() {
      router.push({ path: "/izmenisifru" });
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
