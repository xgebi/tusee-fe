<template>
  <main class="page page-boards">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <section v-for="board in boards" :key="board.boardUuid"></section>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';

const boards: Ref<IBoard[]> = ref([]);
const loadBoards = async () => {
  boards.value = await BoardsService.getAvailableBoards();
};
loadBoards();

const createBoard = () => {
  console.log('create board');
};
</script>

<style scoped></style>
