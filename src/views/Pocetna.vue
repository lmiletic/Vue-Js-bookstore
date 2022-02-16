<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <div class="wrapper-promo main-wrapper">
      <CardPromo v-bind:knjige="this.knjigeNaProm" />
      <CardList v-bind:knjige="this.sveKnjige" v-bind:preporuka="false">
        <template v-slot:header>
          <p class="heading">Sve knjige u sistemu:</p>
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
import CardPromo from "@/components/CardPromo.vue";
import knjige from "@/data/knjige.js";
import knjigePromocija from "@/data/knjigePromocija.js";

export default {
  name: "Pocetna",
  components: {
    LogoBar,
    Sidebar,
    CardList,
    CardPromo,
  },
  created() {
    if(localStorage.getItem("knjige")){
      this.sveKnjige = JSON.parse(localStorage.getItem("knjige"));
    }else{
      localStorage.setItem("knjige", JSON.stringify(knjige));
      this.sveKnjige = knjige;
    }
    if(localStorage.getItem("promocija")){
      this.localProm = JSON.parse(localStorage.getItem("promocija"));
    }else{
      localStorage.setItem("promocija", JSON.stringify(knjigePromocija));
      this.localProm = knjigePromocija;
    }
    
    this.knjigeNaProm = this.sveKnjige.filter((knjiga) =>
      this.localProm.includes(knjiga.id)
    );
  },
  data() {
    return {
      knjigeNaProm: null,
      sveKnjige: null,
      localProm: []
    };
  },
};
</script>

<style>
</style>
