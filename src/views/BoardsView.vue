<template>
  <main class="page page-boards">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <h1>Boards</h1>
    <section v-for="board in boards" :key="board.boardUuid">
      <h2>
        <router-link
          :to="{ name: 'board', params: { id: board.boardUuid } }"
          >{{ board.name }}
        </router-link>
      </h2>
    </section>
  </main>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';
import { useRouter } from 'vue-router';

const router = useRouter();

const boards: Ref<IBoard[]> = ref([]);
const loadBoards = async () => {
  boards.value = await BoardsService.getAvailableBoards();
};
loadBoards();

const createBoard = () => {
  router.push({ name: 'board-settings', params: { id: 'new' } });
};
</script>

<style scoped></style>
