<template>
  <div class="card-promo">
    <header class="form-elements-spacing--promo">
      <p class="heading">Knjige na promociji:</p>
    </header>
    <main class="form-elements-spacing--promo">
      <div class="promoList" v-if="this.prikazKnjige.length">
        <img :class="arrowL" src="@/assets/icons/chevron-left.svg" @click="clickLeft" />
        <div v-for="knjiga in prikazKnjige" :key="knjiga.id" class="promoFiled">
          <img
            :src="'img/knjige/' + knjiga.img + '.jpg'"
            class="promoImg clickable"
            @click="goToBook(knjiga.id)"
          />
          <p class="clickable" @click="goToBook(knjiga.id)">{{ knjiga.naziv }}</p>
        </div>
        <img :class="arrowR" src="@/assets/icons/chevron-right.svg" @click="clickRight" />
      </div>
    </main>
    <footer class="form-elements-spacing--promo"></footer>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "CardPromo",
  props: {
    knjige: Array,
  },
  created() {
    this.last = this.knjige.length > 4 ? 4 : this.knjige.length;
    this.prikazKnjige = this.knjige.slice(this.first, this.last);
    this.disableArrows();
  },
  data() {
    return {
      prikazKnjige: [],
      first: 0,
      last: 4,
      arrowL: 'arrowEnabled',
      arrowR: 'arrowEnabled'
    };
  },
  methods: {
    clickRight() {
      if (this.last < this.knjige.length) {
        this.first++;
        this.last++;
        this.prikazKnjige = this.knjige.slice(this.first, this.last);
      }
      this.disableArrows();
    },
    clickLeft() {
      if (this.first > 0) {
        this.first--;
        this.last--;
        this.prikazKnjige = this.knjige.slice(this.first, this.last);
      }
      this.disableArrows();
    },
    disableArrows(){
      if(this.first == 0)
        this.arrowL = "arrowDisabled";
      else
        this.arrowL = "arrowEnabled";
      if(this.last == this.knjige.length)
        this.arrowR = "arrowDisabled";
      else
        this.arrowR = "arrowEnabled";
    },
    goToBook(num) {
      router.push({ name: "PregledKnjige", params: { id: num } });
    },
  },
};
</script>

<style>

.arrowDisabled{
  filter: invert(93%) sepia(11%) saturate(313%) hue-rotate(172deg) brightness(90%) contrast(94%);
  cursor: default;
}

.arrowEnabled{
  cursor: pointer;
}

.promoFiled {
  word-wrap: break-word;
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.promoList {
  display: flex;
  gap: 50px;
  justify-content: space-evenly;
  width: 100%;
}

.promoImg {
  width: 120px;
  height: 180px;
  margin-top: 40px;
  margin-bottom: 15px;
}
</style>
