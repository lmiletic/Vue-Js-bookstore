<template>
  <div class="card">
    <header class="form-elements-spacing">
      <slot name="header"></slot>
    </header>
    <main class="form-elements-spacing">
      <slot></slot>
    </main>
    <footer class="form-elements-spacing">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style>
.card {
  background-color: #f0f5f9;
  border-radius: 30px;
  /* height: 520px; */
  min-width: 480px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
</style>
