<template>
  <main class="page page-single-board-settings">
    <MainNavigation></MainNavigation>
    <form @submit="processBoardForm">name, description, columns</form>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params.id);
let boardData: IBoard = reactive({});
if (route.params.id !== 'new') {
  reactive({
    ...BoardsService.getBoardInformation(route.params.id as string),
  });
}
const processBoardForm = () => {};
</script>

<style scoped></style>
