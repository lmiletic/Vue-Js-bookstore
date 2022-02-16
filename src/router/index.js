import Vue from 'vue'
import VueRouter from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Prijava from '../views/Prijava.vue'
import Profil from '../views/Profil.vue'
import IzmeniSifru from '../views/IzmeniSifru.vue'
import PreporuceneKnjige from '../views/PreporuceneKnjige.vue';
import PregledKnjige from '../views/PregledKnjige.vue';
import DodajKnjigu from '../views/DodajKnjigu.vue';

Vue.use(VueRouter)

const beforeEnter = (from, to, next) => {
  if (localStorage.getItem('user')) {
    return next();
  }

  return next({ path: '/login' });
}


const routes = [
  {
    path: '/login',
    name: 'Prijava',
    component: Prijava,
    beforeEnter(from, to, next) {
      if (localStorage.getItem('user')) {
        return next({ path: '/' });
      }
      return next();
    }
  },
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna,
    beforeEnter
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    beforeEnter
  },
  {
    path: '/izmenisifru',
    name: 'IzmeniSifru',
    component: IzmeniSifru,
    beforeEnter
  },
  {
    path: '/preporucene',
    name: 'PreporuceneKnjige',
    component: PreporuceneKnjige,
    beforeEnter(from, to, next){
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.role == "Kupac")
          return next();
        else
          return next({ path: '/' });
      }
    
      return next({ path: '/login' });
    }
  },
  {
    path: '/knjiga/:id',
    name: 'PregledKnjige',
    component: PregledKnjige,
    beforeEnter
  },
  {
    path: '/dodajknjigu',
    name: 'DodajKnjigu',
    component: DodajKnjigu,
    beforeEnter(from, to, next){
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.role == "Prodavac")
          return next();
        else
          return next({ path: '/' });
      }
    
      return next({ path: '/login' });
    }
  },
]

//napravi gurad za id knjige

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
