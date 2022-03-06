<template>
  <main class="page page-logged-out">
    <section>
      <router-link :to="{ name: 'login' }">Log back in</router-link>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoggedOutView',
});
</script>

<style scoped>
@import '../assets/user-modals.scss';
</style>
