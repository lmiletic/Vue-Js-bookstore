<template>
  <div class="card-promo">
    <header class="form-elements-spacing">
      <slot name="header"></slot>
    </header>
    <main class="form-elements-spacing">
      <table class="table">
        <tr class="row">
          <td><p class="data">Slika</p></td>
          <td v-if="this.user.role=='Kupac'"><p class="data">Naziv</p></td>
          <td v-if="this.user.role=='Prodavac'"><input class="input-data" type="text" placeholder="Naziv" v-model="searchName"></td>
          <td v-if="this.user.role=='Kupac'"><p class="data">Autor</p></td>
          <td v-if="this.user.role=='Prodavac'"><input class="input-data" type="text" placeholder="Autor" v-model="searchAuthor"></td>
          <td><p class="data" v-if="preporuka">Preporučio</p></td>
        </tr>
        <tr
          v-for="knjiga in this.knjigePrikaz"
          :key="knjiga.id"
          class="row clickable"
          @click="goToBook(knjiga.id)"
        >
          <td>
            <img :src="'img/knjige/' + knjiga.img + '.jpg'" class="img" />
          </td>
          <td>
            <p class="data">{{ knjiga.naziv }}</p>
          </td>
          <td>
            <p class="data">{{ knjiga.autor }}</p>
          </td>
          <td>
            <p class="data" v-if="preporuka">{{ knjiga.prep }}</p>
          </td>
        </tr>
      </table>
    </main>
    <footer class="form-elements-spacing">
      <button
        class="page-btn"
        v-for="index in this.numOfButtons"
        :key="index"
        @click="changePage(index)"
      >
        {{ index }}
      </button>
    </footer>
  </div>
</template>

<script>
import router from "@/router";
const prikazPoStrani = 5;
export default {
  name: "CardList",
  props: {
    knjige: [],
    preporuka: Boolean,
  },
  created() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    this.knjigeSearch = this.knjige;
    this.createButtons();
    this.knjigePrikaz = this.knjigeSearch.slice(this.indFrom, this.indTo);
  },
  data() {
    return {
      knjigePrikaz: [],
      knjigeSearch: [],
      indFrom: 0,
      indTo: prikazPoStrani,
      numOfButtons: 0,
      searchName: "",
      searchAuthor: "",
      user: null,
    };
  },
  watch:{
    searchName(){
      this.searchBooks();
    },
    searchAuthor(){
      this.searchBooks();
    }
  },
  methods: {
    changePage(num) {
      this.indFrom = prikazPoStrani * (num - 1);
      this.indTo = prikazPoStrani * num;
      this.knjigePrikaz = this.knjigeSearch.slice(this.indFrom, this.indTo);
    },
    goToBook(num) {
      router.push({ name: "PregledKnjige", params: { id: num } });
    },
    createButtons(){
      this.numOfButtons = Math.floor(this.knjigeSearch.length / prikazPoStrani);
      if (this.knjigeSearch.length % prikazPoStrani != 0) {
        this.numOfButtons++;
      }
      if(this.knjigeSearch.length <= 5){
        this.numOfButtons=0;
      }
    },
    searchBooks(){
      this.knjigeSearch = this.knjige.filter(knjiga =>{
        return knjiga.naziv.toLowerCase().includes(this.searchName.toLowerCase());
      });
      this.knjigeSearch = this.knjigeSearch.filter(knjiga =>{
        return knjiga.autor.toLowerCase().includes(this.searchAuthor.toLowerCase());
      });
      this.indFrom = 0;
      this.indTo = prikazPoStrani;
      this.createButtons();
      this.knjigePrikaz = this.knjigeSearch.slice(this.indFrom, this.indTo);
    }
  },
};
</script>

<style>

.page-btn{
  background-color: #C9D6DF;
  border: none;
  color: #1E2022;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
}

.table {
  width: 1100px;
}

.img {
  height: 40px;
  width: 30px;
  margin-left: 50px;
}

.row {
  height: 50px;
  display: grid;
  align-items: center;
  grid-template-columns: [first] 90px [second] 400px [third] 300px [fourth] auto;
  grid-template-rows: 100%;
  border-bottom: 1px solid #c1c9ce;
}

.data {
  padding-left: 50px;
}

.input-data {
  background-color: #c9d6df;
  border-radius: 30px;
  font-size: 16px;
  height: 20px;
  width: 200px;
  padding-left: 10px;
  margin-left: 50px;
  border: none;
}
</style>
