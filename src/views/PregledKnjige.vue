<template>
  <div class="hole-page">
    <LogoBar :showlogout="true" />
    <Sidebar/>
  </div>
</template>

<script>
import LogoBar from "@/components/LogoBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import knjige from "@/data/knjige.js";

export default {
    name: "PregledKnjige",
    components:{
        LogoBar,
        Sidebar
    },
    data(){
        return{
            knjiga:null,
        }
    },
    created(){
        this.knjiga = knjige.find(knjiga =>{
            return knjiga.id == this.$route.params.id;
        });
        console.log(JSON.stringify(this.knjiga));
    }
}
</script>

<style>

</style>