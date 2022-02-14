<template>
  <div class="card-promo">
    <header class="form-elements-spacing" >
      <p class="heading">Knjige na promociji:</p>
    </header>
    <main class="form-elements-spacing">
      <div class="promoList" v-if="this.prikazKnjige.length">
        <img src="@/assets/icons/chevron-left.svg" @click="clickLeft"/>
        <div v-for="knjiga in prikazKnjige" :key="knjiga.id" class="promoFiled">
          <img :src="'img/knjige/'+ knjiga.img + '.jpg'" class="promoImg" @click="goToBook(knjiga.id)"/>
          <p @click="goToBook(knjiga.id)">{{knjiga.naziv}}</p>
        </div>
        <img src="@/assets/icons/chevron-right.svg" @click="clickRight"/>
      </div>
    </main>
    <footer class="form-elements-spacing"> 
    </footer>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'CardPromo',
  props:{
    knjige: Array
  },
  created(){
    this.last = (this.knjige.length > 4) ? 4 : this.knjige.length;
    this.prikazKnjige = this.knjige.slice(this.first,this.last);
  },
  data(){
    return{
      prikazKnjige: [],
      first: 0,
      last: 4
    }
  },
  methods:{
    clickRight(){
      if(this.last < this.knjige.length){
        this.first++;
        this.last++;
        this.prikazKnjige = this.knjige.slice(this.first,this.last);
      }
    },
    clickLeft(){
      if(this.first>0){
        this.first--;
        this.last--;
        this.prikazKnjige = this.knjige.slice(this.first,this.last);
      }
    },
    goToBook(num){
      router.push({name:'PregledKnjige', params: {id: num}});
    }
  }
};
</script>

<style>

.promoFiled{
  word-wrap: break-word;
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.promoList{
  display:flex;
  gap: 50px;
}

.promoImg{
  width: 120px;
  height: 180px;
  margin-top: 40px;
  margin-bottom: 15px;
}

.card-promo {
    background-color: #f0f5f9;
    border-radius: 30px;
    height: 420px;
    width: 1100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right:60px;
    margin-top:40px;
}
 
.form-elements-spacing {
    margin-bottom: 10px;
}

</style>