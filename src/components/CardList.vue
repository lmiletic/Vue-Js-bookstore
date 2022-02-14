<template>
  <div class="card-list">
    <header class="form-elements-spacing" >
      <slot name="header"></slot>
    </header>
    <main class="form-elements-spacing">
        <table class="table">
            <tr class="row">
                <td><p class="data">Slika</p></td>
                <td><p class="data">Naziv</p></td>
                <td><p class="data">Autor</p></td>
                <td><p class="data" v-if="preporuka">Preporučio</p></td>
            </tr>
            <tr v-for="knjiga in this.knjigePrikaz" :key="knjiga.id" class="row" @click="goToBook(knjiga.id)">
              <td><img :src="'img/knjige/' + knjiga.img + '.jpg'" class="img"></td>
              <td><p class="data">{{knjiga.naziv}}</p></td>
              <td><p class="data">{{knjiga.autor}}</p></td>
              <td><p class="data" v-if="preporuka">{{knjiga.prep}}</p></td>
            </tr>
        </table>
    </main>
    <footer class="form-elements-spacing">
      <button v-for="index in this.numOfButtons" :key="index" @click="changePage(index)">{{index}}</button>
    </footer>
  </div>
</template>

<script>
import router from "@/router";
const prikazPoStrani = 5;
export default {
  name: 'CardList',
  props: {
    knjige: Array,
    preporuka : Boolean
  },
  created(){
    this.numOfButtons = Math.floor(this.knjige.length/prikazPoStrani);
    if(this.knjige.length % prikazPoStrani != 0){
      this.numOfButtons++;
    }
    this.knjigePrikaz = this.knjige.slice(this.indFrom, this.indTo);
  },
  data(){
    return{
      knjigePrikaz: null,
      indFrom: 0,
      indTo: prikazPoStrani,
      numOfButtons: 0
    }
  },
  methods:{
    changePage(num){
      this.indFrom = prikazPoStrani*(num-1);
      this.indTo = prikazPoStrani*num;
      this.knjigePrikaz = this.knjige.slice(this.indFrom,this.indTo);
    },
    goToBook(num){
      router.push({name:'PregledKnjige', params: {id: num}});
    }
  }
};
</script>

<style>

.table{
  width: 1100px;
}

.img{
  height: 40px;
  widows: 40px;
  padding-left: 50px;
}

.row{
  height: 50px;
  display:grid;
  align-items: center;
  grid-template-columns: [first] 90px [second] 400px [third] 300px [fourth] auto;
  grid-template-rows: 100%;
  border-bottom: 1px solid #C1C9CE;
}

.data{
  padding-left: 50px;
}


 .card-list {
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