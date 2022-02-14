<template>
  <div class="hole-page">
    <LogoBar :showlogout="false" />
    <LoginForm />
  </div>
</template>

<script>
import LogoBar from '@/components/LogoBar.vue';
import LoginForm from '@/components/prijava-components/LoginForm.vue';
export default {
  name: "Prijava",
  components: {
    LogoBar,
    LoginForm,
  },
};
</script>

