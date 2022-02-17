<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <Sidebar/>
    <div class="wrapper main-wrapper">
        <Card>
            <template v-slot:header>
                <p class="heading">Pregled knjige</p>
            </template>
            <div class="book-view">
                <div>
                    <img :src="'/img/knjige/' + this.knjiga.img + '.jpg'" class="book-view-img"/>
                </div>
                <div class="book-view-info">
                    <p class="info-heading">Naziv:</p><p class="info-text">{{knjiga.naziv}}</p>
                    <p class="info-heading">Autora:</p><p class="info-text">{{knjiga.autor}}</p>
                    <p class="info-heading">Opis:</p><p class="info-text">{{knjiga.opis}}</p>
                    <p class="info-heading">Br. strana:</p><p class="info-text">{{knjiga.brStrana}}</p>
                    <p class="info-heading">Izdanje:</p><p class="info-text">{{knjiga.izdanje}}</p>
                    <p class="info-heading">Ocena:</p><p class="info-text">{{knjiga.ocena}}</p>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" v-if="user.role=='Kupac'">Preporuči</button>
                <button class="btn btn-promote prom" v-if="user.role=='Prodavac' && !naPromociji" @click="postavi()">Postavi na promociju</button>
                <button class="btn btn-promote no-prom"  v-if="user.role == 'Prodavac' && naPromociji" @click="skini()">Skini sa promocije</button>
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
import knjigePromocija from "@/data/knjigePromocija.js";

export default {
    name: "PregledKnjige",
    components:{
        LogoBar,
        Sidebar,
        Card,
    },
    data(){
        return{
            sveKnjige:[],
            knjiga:null,
            user:null,
            localPromocija:[],
            naPromociji: false
        }
    },
    created(){
        if(localStorage.getItem("user")){
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        if(localStorage.getItem("knjige")){
            this.sveKnjige = JSON.parse(localStorage.getItem("knjige"));
        }else{
            localStorage.setItem("knjige", JSON.stringify(knjige));
            this.sveKnjige = knjige;
        }
        if(localStorage.getItem("promocija")){
            this.localPromocija = JSON.parse(localStorage.getItem("promocija"));
        }else{
            localStorage.setItem("promocija", JSON.stringify(knjigePromocija));
            this.localPromocija = knjigePromocija;
        }
        this.knjiga = this.sveKnjige.find(knjiga =>{
            return knjiga.id == this.$route.params.id;
        });
        if(this.localPromocija.includes(this.knjiga.id)){
            this.naPromociji = true;
        }else{
            this.naPromociji = false;
        }
        console.log(JSON.stringify(this.knjiga));
    },
    methods:{
        postavi(){
            this.naPromociji = true;
            this.localPromocija.push(this.knjiga.id);
            localStorage.setItem("promocija", JSON.stringify(this.localPromocija));
        },
        skini(){
            this.naPromociji = false;
            this.localPromocija = this.localPromocija.filter(promo => promo != this.knjiga.id);
            localStorage.setItem("promocija", JSON.stringify(this.localPromocija));
        }
    }
}
</script>

<style>

.book-view{
    display:flex;
    margin-top: 20px;
}

.book-view-info{
    margin-left: 50px;
    font-size: 24px;
    display: grid;
    grid-template-columns: [first] auto [second] auto;
    /* grid-template-rows: 100%; */
}

.book-view-img{
    width: 160px;
    height: 240px;
}

.info-heading{
    color: #878B8E;
}

.info-text{
    max-width: 600px;
    margin-left: 10px;
}

.btn-promote {
    color: #f0f5f9;
    width: 180px;
    height: 35px;
    font-size: 16px;
}

.prom{
    background-color: #1F7CEF;
}

.no-prom{
    background-color: #DE0D4C;
}

</style>