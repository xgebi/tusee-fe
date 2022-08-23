<template>
  <main class="page page-boards">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <h1>Boards</h1>
    <ul>
      <li v-for="board in boardsStore.getBoards" :key="board.boardUuid">
        <h2>
          <router-link
            :to="{ path: `/board/${board.boardUuid}` }"
            >{{ board.name }}
          </router-link>
        </h2>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import type { IBoard } from '@/interfaces/IBoard';
import { useRouter } from 'vue-router';
import { useBoardsStore } from '@/stores/boards';

const router = useRouter();
const boardsStore = useBoardsStore();

const boards: Ref<IBoard[]> = ref([]);
const loadBoards = async () => {
  await boardsStore.fetchBoards();
};
loadBoards();

const createBoard = () => {
  router.push({ name: 'board-settings', params: { id: 'new' } });
};
</script>

<style scoped>
.page-boards {
  grid-template-rows: 3rem 2rem auto;
}

.page-boards *:not(.top-bar) {
  grid-column: 2 / 3;
}
</style>
