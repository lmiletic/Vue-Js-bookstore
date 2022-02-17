<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <Sidebar />
    <modal name="preporuci-knjigu">
      <Card class="preporuci">
        <template v-slot:header>
          <p class="heading">Preporuči kupcima</p>
        </template>
        <div>
          <table class="table-p">
            <tr class="row-p">
              <td><p class="data-p">Slika</p></td>
              <td><p class="data-p">Korisničko ime</p></td>
              <td><p class="data-p">Preporuka</p></td>
            </tr>
            <tr
              v-for="korisnik in this.localUsers"
              :key="korisnik.username"
              class="row-p"
            >
              <td>
                <img :src="'/img/' + korisnik.img" class="img" />
              </td>
              <td>
                <p class="data-p">{{ korisnik.username }}</p>
              </td>
              <td v-if="!alreadyReco(korisnik.username)">
                <button class=" btn btn-promote prom" @click="reco(korisnik.username)">Preporuči</button>
              </td>
              <td v-if="alreadyReco(korisnik.username)">
                <button class=" btn btn-promote no-prom" @click="unreco(korisnik.username)">Ne preporučuj</button>
              </td>
            </tr>
          </table>
        </div>
        <template v-slot:footer>
          <button class="btn btn-promote no-prom" @click="close()">
            Zatvori prozor
          </button>
        </template>
      </Card>
    </modal>
    <div class="wrapper-promo main-wrapper">
      <Card class="card-pos">
        <template v-slot:header>
          <p class="heading">Pregled knjige</p>
        </template>
        <div class="book-view">
          <div>
            <img
              :src="'/img/knjige/' + this.knjiga.img + '.jpg'"
              class="book-view-img"
            />
          </div>
          <div class="book-view-info">
            <p class="info-heading">Naziv:</p>
            <p class="info-text">{{ knjiga.naziv }}</p>
            <p class="info-heading">Autora:</p>
            <p class="info-text">{{ knjiga.autor }}</p>
            <p class="info-heading">Opis:</p>
            <p class="info-text">{{ knjiga.opis }}</p>
            <p class="info-heading">Br. strana:</p>
            <p class="info-text">{{ knjiga.brStrana }}</p>
            <p class="info-heading">Izdanje:</p>
            <p class="info-text">{{ knjiga.izdanje }}</p>
            <p class="info-heading">Ocena:</p>
            <p class="info-text">
              <star-rating
                :rating="knjiga.ocena"
                :star-size="24"
                :show-rating="false"
                :read-only="true"
              ></star-rating>
            </p>
          </div>
        </div>
        <template v-slot:footer>
          <button
            class="btn btn-primary"
            v-if="user.role == 'Kupac'"
            @click="preporuci()"
          >
            Preporuči
          </button>
          <button
            class="btn btn-promote prom"
            v-if="user.role == 'Prodavac' && !naPromociji"
            @click="postavi()"
          >
            Postavi na promociju
          </button>
          <button
            class="btn btn-promote no-prom"
            v-if="user.role == 'Prodavac' && naPromociji"
            @click="skini()"
          >
            Skini sa promocije
          </button>
        </template>
      </Card>
      <Card class="card-kom">
        <template v-slot:header>
          <p class="heading">Komentari</p>
        </template>
        <div>
          <div class="komentar" v-if="this.user.role == 'Kupac'">
            <div>
              <p>{{this.userKomentar.username}}</p>
              <star-rating
                v-model="userKomentar.ocena"
                :star-size="20"
                :show-rating="false"
                :read-only="editComment"
              ></star-rating>
            </div>
            <div>
              <input class="komentar-polje" v-model="userKomentar.komentar" :disabled="editComment">
            </div>
            <div>
              <button class="btn btn-com prom" v-if="!editComment" @click="saveComm()">Sačuvaj</button>
              <button class="btn btn-com no-prom" v-if="editComment" @click="editComm()">Izmeni</button>
            </div>
          </div>
          <div v-for="komentar in localKomentari" :key="komentar.komentar" class="komentar">
            <div>
              <p>{{komentar.username}}</p>
              <star-rating
                :rating="komentar.ocena"
                :star-size="20"
                :show-rating="false"
                :read-only="true"
              ></star-rating>
            </div>
            <div>
              <input class="komentar-polje" v-model="komentar.komentar" disabled>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LogoBar from "@/components/LogoBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Card from "@/components/Card.vue";
import knjige from "@/data/knjige.js";
import knjigePromocija from "@/data/knjigePromocija.js";
import StarRating from "vue-star-rating";
import korisnici from "@/data/korisnici.js";
import preporucene from "@/data/preporucene.js";
import komentari from "@/data/komentari.js";

export default {
  name: "PregledKnjige",
  components: {
    LogoBar,
    Sidebar,
    Card,
    StarRating,
  },
  data() {
    return {
      sveKnjige: [],
      knjiga: null,
      user: null,
      localPromocija: [],
      naPromociji: false,
      localUsers: [],
      localPreporucene: [],
      localKomentari: [],
      userKomentar: null,
      editComment: false
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if (localStorage.getItem("users")) {
      this.localUsers = JSON.parse(localStorage.getItem("users"));
    } else {
      localStorage.setItem("users", JSON.stringify(korisnici));
    }
    this.localUsers = this.localUsers.filter((user) => user.role == "Kupac" && user.username != this.user.username);
    if (localStorage.getItem("knjige")) {
      this.sveKnjige = JSON.parse(localStorage.getItem("knjige"));
    } else {
      localStorage.setItem("knjige", JSON.stringify(knjige));
      this.sveKnjige = knjige;
    }
    if (localStorage.getItem("promocija")) {
      this.localPromocija = JSON.parse(localStorage.getItem("promocija"));
    } else {
      localStorage.setItem("promocija", JSON.stringify(knjigePromocija));
      this.localPromocija = knjigePromocija;
    }
    if (localStorage.getItem("preporucene")) {
      this.localPreporucene = JSON.parse(localStorage.getItem("preporucene"));
    } else {
      localStorage.setItem("preporucene", JSON.stringify(preporucene));
      this.localPreporucene = preporucene;
    }
    if (localStorage.getItem("komentari")) {
      this.localKomentari = JSON.parse(localStorage.getItem("komentari"));
    } else {
      localStorage.setItem("komentari", JSON.stringify(komentari));
      this.localKomentari = komentari;
    }
    this.knjiga = this.sveKnjige.find((knjiga) => {
      return knjiga.id == this.$route.params.id;
    });
    this.localPreporucene = this.localPreporucene.filter(
        (prep) => prep.idKnjige == this.knjiga.id && prep.od == this.user.username
    );
    this.userKomentar = this.localKomentari.find(
      (komentar) => komentar.username == this.user.username && komentar.idKnjige == this.knjiga.id
    );
    this.editComment = true;
    if(this.userKomentar == null){
      this.editComment = false;
      this.userKomentar = {
        idKnjige: this.knjiga.id,
        ocena: 0,
        username: this.user.username,
        komentar: ""
      };
    }
    console.log(JSON.stringify(this.userKomentar));
    this.localKomentari = this.localKomentari.filter(
      (komentar)=> komentar.idKnjige == this.knjiga.id && komentar.username != this.user.username
    );
    this.calcOcena(this.editComment);
    console.log(JSON.stringify(this.localKomentari));
    if (this.localPromocija.includes(this.knjiga.id)) {
      this.naPromociji = true;
    } else {
      this.naPromociji = false;
    }
    console.log(JSON.stringify(this.knjiga));
  },
  methods: {
    postavi() {
      this.naPromociji = true;
      this.localPromocija.push(this.knjiga.id);
      localStorage.setItem("promocija", JSON.stringify(this.localPromocija));
    },
    skini() {
      this.naPromociji = false;
      this.localPromocija = this.localPromocija.filter(
        (promo) => promo != this.knjiga.id
      );
      localStorage.setItem("promocija", JSON.stringify(this.localPromocija));
    },
    preporuci() {
      console.log("Preporuci");
      this.$modal.show("preporuci-knjigu");
    },
    close(){
      this.$modal.hide("preporuci-knjigu");
    },
    reco(username){
      const novaPrep = {
        idKnjige: this.knjiga.id,
        od: this.user.username,
        za: username
      };
      this.localPreporucene.push(novaPrep);
      var updatePrep;
      if (localStorage.getItem("preporucene")) {
        updatePrep = JSON.parse(localStorage.getItem("preporucene"));
      } else {
        updatePrep = preporucene;
      }
      updatePrep.push(novaPrep);
      localStorage.setItem("preporucene", JSON.stringify(updatePrep));
    },
    unreco(username){
      this.localPreporucene = this.localPreporucene.filter(
        (prep) => !(prep.idKnjige == this.knjiga.id && prep.od == this.user.username && prep.za == username)
      );
      var updatePrep;
      if (localStorage.getItem("preporucene")) {
        updatePrep = JSON.parse(localStorage.getItem("preporucene"));
      } else {
        updatePrep = preporucene;
      }
      updatePrep = updatePrep.filter(
        (prep) => !(prep.idKnjige == this.knjiga.id && prep.od == this.user.username && prep.za == username)
      );
      localStorage.setItem("preporucene", JSON.stringify(updatePrep));
    },
    alreadyReco(username){
        let exists = this.localPreporucene.find(prep=> prep.za == username);
        if(exists)
          return true;
        return false;
    },
    editComm(){
      this.editComment = false;
    },
    saveComm(){
      this.editComment = true;
      var updateKom;
      if (localStorage.getItem("komentari")) {
        updateKom = JSON.parse(localStorage.getItem("komentari"));
      } else {
        updateKom = komentari;
      }
      updateKom = updateKom.filter(
        (kom)=> !(kom.idKnjige == this.userKomentar.idKnjige && kom.username == this.userKomentar.username)
      );
      updateKom.push(this.userKomentar);
      this.calcOcena(true);
      console.log(JSON.stringify(this.userKomentar));
      localStorage.setItem("komentari", JSON.stringify(updateKom));
    },
    calcOcena(uslov){
      var i = 0;
      var ocene = 0;
      this.localKomentari.forEach(komentar =>{
        ocene += komentar.ocena;
        i++;
      });
      if(this.user.role == "Kupac" && uslov){
        ocene += this.userKomentar.ocena;
        i++;
      }
      var ocena = Math.round(ocene/i);
      this.knjiga.ocena = ocena;
      console.log(ocena);
    }
  },
};
</script>

<style>

.card-pos{
  margin-right: 200px;
}

.card-kom{
  margin-right: 150px;
}

.book-view {
  display: flex;
  margin-top: 20px;
}

.book-view-info {
  margin-left: 50px;
  font-size: 24px;
  display: grid;
  grid-template-columns: [first] auto [second] auto;
  /* grid-template-rows: 100%; */
}

.book-view-img {
  width: 160px;
  height: 240px;
}

.info-heading {
  color: #878b8e;
}

.info-text {
  max-width: 600px;
  margin-left: 10px;
}

.btn-promote {
  color: #f0f5f9;
  width: 180px;
  height: 35px;
  font-size: 16px;
}

.btn-com{
  color: #f0f5f9;
  width: 70px;
  height: 25px;
  font-size: 14px;
}

.prom {
  background-color: #1f7cef;
}

.no-prom {
  background-color: #de0d4c;
}

.table-p {
  width: 600px;
}

.img {
  height: 40px;
  width: 30px;
  margin-left: 50px;
}

.row-p {
  height: 50px;
  display: grid;
  align-items: center;
  grid-template-columns: [first] 90px [second] 320px [third] auto;
  grid-template-rows: 100%;
  border-bottom: 1px solid #c1c9ce;
}

.data-p {
  margin-left: 50px;
}

.preporuci {
  margin-top: 0px;
  width: 600px;
}

.vm--modal {
  border-radius: 30px !important;
  height: unset !important;
}

.komentar{
  min-width: 600px;
  background-color: #c9d6df;
  border-radius: 30px;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  display:flex;
}

.komentar-polje{
  min-height: 100px;
  background-color: #f0f5f9;
  border: none;
  border-radius: 30px;
  margin-left:20px;
  width: 500px;
  padding: 15px;
}
</style>
