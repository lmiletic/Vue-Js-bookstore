<template>
  <div class="sidebar">
    <header class="user-in-session">
      <a href="/profil">
        <figure>
          <img :src="'/img/' + user.img" class="avatar" />
          <figcaption>
            <p class="user-heading">{{ user.ime }} {{ user.prezime }}</p>
            <p class="user-role">{{ user.role }}</p>
          </figcaption>
        </figure>
      </a>
    </header>
    <main>
      <ul>
        <li class="nav-link">
          <div class="nav-text meni-font">Meni</div>
        </li>
        <li :class="navNum==1?'selected-nav':''" class="nav-link">
          <a class="nav-text" href="/">
            <img class="icon-color" src="@/assets/icons/home.svg" />
            Početna
          </a>
        </li>
        <li :class="navNum==2?'selected-nav':''" class="nav-link" v-if="user.role == 'Kupac'">
          <a class="nav-text" href="/preporucene">
            <img class="icon-color" src="@/assets/icons/book-open.svg" />
            Preporučene knjige
          </a>
        </li>
        <li :class="navNum==3?'selected-nav':''" class="nav-link" v-if="user.role == 'Prodavac'">
          <a class="nav-text" href="/">
            <img class="icon-color" src="@/assets/icons/plus-square.svg" />
            Dodaj knjigu
          </a>
        </li>
        <slot></slot>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  created() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    this.selectedNav(this.$route.name);
  },
  data() {
    return {
      user: {
        ime: "Korisnik",
        prezime: "Korisniković",
        role: "Kupac",
        img: "user.png",
        nav: 'selected-nav',
        navNum: 1
      },
    };
  },
  methods:{
    selectedNav(page){
      if(page == "Pocetna")
      this.navNum = 1;
    else
      if(page == "PreporuceneKnjige")
        this.navNum = 2;
      else
        if(page == "DodajKnjigu")
          this.navNum = 3;
        else
          this.navNum = 0;
    }
  }
};
</script>

<style>
.sidebar {
  background-color: #1e2022;
  /* font-family: Playfair Display; */
  width: 300px;
  height: 100vh;
  color: #f0f5f9;
  position: fixed;
  z-index: 999;
  top: 1;
  left: 1;
  overflow-x: hidden;
}

.user-in-session {
  background-color: #52616b;
  height: 90px;
  padding: 10px;
}


figure {
  display: flex;
}

figcaption {
  margin-left: 15px;
  margin-top: 10px;
}

.avatar {
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.user-heading {
  font-size: 24px;
}

.user-role {
  font-size: 20px;
  color: #384146;
}

.meni-font {
  color: #52616b;
}
</style>
