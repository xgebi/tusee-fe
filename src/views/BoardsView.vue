<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <section v-for="board in boards" :key="board.boardUuid"></section>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';

const boards = await BoardsService.getAvailableBoards();
</script>

<style scoped></style>
