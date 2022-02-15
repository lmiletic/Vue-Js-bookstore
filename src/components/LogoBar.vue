<template>
  <div class="logo-bar">
    <div class="logo-bar-centered">
      <a href="/">
        <img class="perce-logo" src="@/assets/perceLogo.png" />
      </a>
    </div>
    <div v-if="showlogout" class="btn-wrapper">
      <button class="btn btn-primary" @click="odjava()">Odjavi me</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "LogoBar",
  props: ["showlogout"],
  methods: {
    odjava() {
      localStorage.removeItem("user");
      router.push({ path: "/login" });
    },
  },
};
</script>

<style>
.logo-bar {
  background-color: #f0f5f9;
  height: 90px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;
  /* overflow-x: hidden; */
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
}

.logo-bar-centered {
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  position: relative;
}

.perce-logo {
  height: 90px;
}

.btn-wrapper {
  position: absolute;
  right: 20px;
  top: 22.5px;
}
</style>
