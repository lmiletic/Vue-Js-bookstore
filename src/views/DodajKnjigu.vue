<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <Sidebar />
    <div class="wrapper main-wrapper">
      <Card>
        <template v-slot:header>
          <p class="heading">Dodaj novu knjigu</p>
        </template>
        <div class="new-book-wrapper">
          <div>
              <div>
                <img class="big-img" :src="'img/knjige/book_' + selectedImg + '.jpg'"/>
              </div>
              <img class="small-img clickable" src="@/assets/book_1.jpg" @click="selectImg(1)"/>
              <img class="small-img clickable" src="@/assets/book_2.jpg" @click="selectImg(2)"/>
              <img class="small-img clickable" src="@/assets/book_3.jpg" @click="selectImg(3)"/>
          </div>
          <div class="inputs-wrapper">
            <input
              v-model="nazivKnjige"
              class="input-text"
              type="text"
              placeholder="Naziv knjige"
            />
            <input
              v-model="nazivAutora"
              class="input-text"
              type="text"
              placeholder="Naziv autora"
            />
            <input
              v-model="opis"
              class="input-text"
              type="text"
              placeholder="Opis"
            />
            <input
              v-model="godinaIzdanja"
              class="input-text"
              type="number"
              min="1900"
              max="2022"
              placeholder="Godina izdanja"
            />
            <input
              v-model="brojStrana"
              class="input-text"
              type="number"
              min="1"
              placeholder="Broj strana"
            />
          </div>
        </div>
        <div v-if="saved" class="info-mes">
            <p>Uspešno dodata knjiga!</p>
        </div>
        <div v-if="notFilled" class="error-unsuccessful-save info-mes">
            <p>Moraju sva polja da budu popunjena!</p>
        </div>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="dodajKnjigu()">Dodaj</button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import LogoBar from "@/components/LogoBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Card from "@/components/Card.vue";
import knjige from "@/data/knjige.js";

export default {
  name: "DodajKnjigu",
  components: {
    LogoBar,
    Sidebar,
    Card,
  },
  created(){
    if(localStorage.getItem("knjige")){
      this.localKnjige = JSON.parse(localStorage.getItem("knjige"));
    }else{
      localStorage.setItem("knjige", JSON.stringify(knjige));
      this.localKnjige = knjige;
    }
  },
  data(){
      return{
          localKnjige: [],
          nazivKnjige: "",
          nazivAutora: "",
          opis: "",
          godinaIzdanja: "",
          brojStrana: "",
          selectedImg: 1,
          notFilled: false,
          saved: false
      }
  },
  methods:{
      selectImg(num){
          this.selectedImg = num;
      },
      dodajKnjigu(){
          if(this.nazivKnjige == "" || this.nazivAutora == "" || this.opis == ""
            || this.godinaIzdanja == "" || this.brojStrana == ""){
                this.notFilled = true;
                this.saved = false;
          }else{
              this.notFilled = false;
              this.saved = true;
              let maxId = 0;
              this.localKnjige.forEach(knjiga => {
              if(knjiga.id > maxId)
                maxId = knjiga.id;
              });
              const knjiga = {
                  id: maxId + 1,
                  naziv: this.nazivKnjige,
                  autor: this.nazivAutora,
                  opis: this.opis,
                  brStrana: this.brojStrana,
                  izdanje: this.godinaIzdanja + ".",
                  img: "book_" + this.selectedImg,
                  ocena: 0
              };
              this.localKnjige.push(knjiga);
              localStorage.setItem("knjige", JSON.stringify(this.localKnjige));
          }
      }
  }
};
</script>

<style>

.info-mes{
    text-align: center;
}

.new-book-wrapper{
    display: flex;
    gap: 40px;
}

.big-img{
  width: 150px;
  height: 180px;
  margin-top: 40px;
  margin-bottom: 10px;
}

.small-img {
  width: 40px;
  height: 50px;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
}

</style>
