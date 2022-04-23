<template>
  <main class="page page-single-board">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <h2></h2>
    <router-link
          :to="{ name: 'board-settings', params: { id: board.boardUuid } }"
          >Board settings
        </router-link>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';

const boards: Ref<IBoard[]> = ref([]);
const loadBoard = async () => {
  boards.value = await BoardsService.getAvailableBoards();
};
loadBoard();

const createBoard = () => {
  console.log('create board');
};
</script>

<style scoped></style>
