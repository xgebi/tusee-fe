<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    This is Boards view
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';

export default defineComponent({
  name: 'BoardsView',
  components: {
    MainNavigation,
  },
  async created() {
    await BoardsService.getBoardsInfo();
  },
});
</script>

<style scoped></style>
