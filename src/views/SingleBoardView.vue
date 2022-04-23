<template>
  <main class="page page-single-board">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <h2></h2>
    <router-link
      :to="{ path: `/board/${route.params.id}/settings` }"
      >Board settings
    </router-link>
    <section>
      <div>

      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, reactive, type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';
import { useRoute } from 'vue-router';
import type ITask from '@/interfaces/ITask';

const route = useRoute();

let board: IBoard = reactive({});
let tasks: ITask[] = reactive([]);
const loadBoard = async () => {
  const res = await BoardsService.getBoardView(route.params.id as string);
  console.log('res', res)
  board = {...res.board};
  tasks = {...res.tasks};
};
loadBoard();

const createBoard = () => {
  console.log('create board');
};
</script>

<style scoped></style>
