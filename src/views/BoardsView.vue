<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    This is Boards view
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';

export default defineComponent({
  name: 'BoardsView',
  components: {
    MainNavigation,
  },
});
</script>

<style scoped></style>
