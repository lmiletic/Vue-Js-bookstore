<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <div class="wrapper-promo">
        <CardPromo v-bind:knjige="this.knjigeNaProm"/>
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
    CardPromo
  },
  created(){
    this.sveKnjige = knjige;
    this.knjigeNaProm = knjige.filter(knjiga => knjigePromocija.includes(knjiga.id));
  },
  data(){
    return{
      knjigeNaProm: null,
      sveKnjige: null,
    }
  }
};
</script>

<style>

</style>
