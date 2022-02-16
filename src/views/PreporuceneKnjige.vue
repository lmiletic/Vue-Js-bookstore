<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <div class="wrapper-list main-wrapper">
      <CardList v-bind:knjige="this.preporucene" v-bind:preporuka="true">
        <template v-slot:header>
          <p class="heading">Knjige koje su Vam preporučene:</p>
        </template>
      </CardList>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import LogoBar from "@/components/LogoBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import CardList from "@/components/CardList.vue";
import knjige from "@/data/knjige.js";
import preporuceneKnjige from "@/data/preporucene.js";

export default {
  name: "PerporuceneKnjige",
  components: {
    LogoBar,
    Sidebar,
    CardList,
  },
  created() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(localStorage.getItem("knjige")){
      this.localKnjige = JSON.parse(localStorage.getItem("knjige"));
    }else{
      localStorage.setItem("knjige", JSON.stringify(knjige));
      this.localKnjige = knjige;
    }
    if(localStorage.getItem("preporucene")){
      this.localPreporucene = JSON.parse(localStorage.getItem("preporucene"));
    }else{
      localStorage.setItem("preporucene", JSON.stringify(preporuceneKnjige));
      this.localPreporucene = preporuceneKnjige;
    }
    let prepor = this.localPreporucene.filter(
      (prep) => prep.za == this.user.username
    );
    this.localKnjige.forEach((knjiga) => {
      prepor.some((prep) => {
        if (prep.idKnjige == knjiga.id) {
          let knjigaPrep = knjiga;
          knjigaPrep.prep = prep.od;
          this.preporucene.push(knjigaPrep);
          return true;
        }
      });
    });
    // console.log(JSON.stringify(this.preporucene));
  },
  data() {
    return {
      preporucene: [],
      user: null,
      localPreporucene: [],
      localKnjige: []
    };
  },
};
</script>

<style>
</style>
