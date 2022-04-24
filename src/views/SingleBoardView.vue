<template>
  <main class="page page-single-board">
    <MainNavigation></MainNavigation>
    <button @click="createBoard">Create board</button>
    <div v-if="boardStore.getSelectedBoard">
      <h2>{{ boardStore.getSelectedBoard.name }}</h2>
      <p>{{ boardStore.getSelectedBoard.description }}</p>
      <router-link :to="{ path: `/board/${route.params.id}/settings` }">
        Board settings
      </router-link>
      <section class="board-table">
        <div class="table-header" v-for="column in boardStore.getSelectedBoard.columns.split(',')" :key="column.split(':')[0]">
          {{ column.split(':')[0] }}
        </div>
        <div v-for="column in boardStore.getSelectedBoard.columns.split(',')" @dragover="dragOver" :data-name="column.split(':')[0]" :key="column.split(':')[0]"
          @drop="dropped"
        >
          <article
            v-for="task in boardStore.getSelectedBoardTasks.filter((t) => t.task_status === column.split(':')[0])"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragStop"
            :data-uuid="task.task_uuid"
            :key="task.task_uuid"
          >
            Title: {{ task.title }}
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, reactive, type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';
import { useRoute } from 'vue-router';
import type ITask from '@/interfaces/ITask';
import { useBoardsStore } from '@/stores/boards';

const route = useRoute();
const boardStore = useBoardsStore()

const loadSelectedBoard = async () => {
  await boardStore.setSelectedBoard(route.params.id as string);
};
loadSelectedBoard();

const dragged: Ref<EventTarget | null>  = ref(null);
const currentDropZone: Ref<EventTarget | null>  = ref(null);

const dragStart = (e: Event) => {
  console.log(e.target);
  dragged.value = e.target;
  e.target.classList.add('dragging');
}

const dragStop = (e: Event) => {
  console.log(e);
  e.target.classList.remove('dragging');
}

const dragOver = (e: Event) => {
  e.preventDefault();
  if (currentDropZone.value != e.target) {
    currentDropZone.value = e.target;
  }
}

const dropped = (e: Event) => {
  console.log('dropped', e.target.dataset, dragged.value.dataset);
  boardStore.updateBoardTask(dragged.value?.dataset.uuid, currentDropZone.value?.dataset.name);
}

const createBoard = () => {
  console.log('create board');
};
</script>

<style scoped>
.board-table {
  display: grid;
  grid-template-rows: 40px auto;
}

.table-header {
  grid-row: 1 / 2;
}
</style>
