<template>
  <main class="page page-single-board">
    <MainNavigation></MainNavigation>
    <template v-if="boardStore.getSelectedBoard">
      <h2>{{ boardStore.getSelectedBoard.name }}</h2>
      <p>{{ boardStore.getSelectedBoard.description }}</p>
      <router-link :to="{ path: `/board/${route.params.id}/settings` }">
        Board settings
      </router-link>
      <section class="board-table">
        <div
          class="table-header"
          v-for="column in boardStore.getSelectedBoard.columns.split(',')"
          :key="column.split(':')[0]"
        >
          {{ column.split(':')[0] }}
        </div>
        <div
          class="drop-zone"
          v-for="column in boardStore.getSelectedBoard.columns.split(',')"
          @dragover="dragOver"
          :data-name="column.split(':')[0]"
          :key="column.split(':')[0]"
          @drop="dropped"
        >

          <BoardListTask
            v-for="task in boardStore.getSelectedBoardTasks.filter(
              (t) => t.taskStatus === column.split(':')[0]
            )"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragStop"
            :data-uuid="task.taskUuid"
            :task="task"
            :key="task.taskUuid"
          ></BoardListTask>
        </div>
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, reactive, type Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type { IBoard } from '@/interfaces/IBoard';
import { useRoute } from 'vue-router';
import type { ITask } from '@/interfaces/ITask';
import { useBoardsStore } from '@/stores/boards';
import BoardListTask from '@/components/BoardListTask.vue';

const route = useRoute();
const boardStore = useBoardsStore();

const loadSelectedBoard = async () => {
  await boardStore.setSelectedBoard(route.params.id as string);
};
loadSelectedBoard();

const dragged: Ref<EventTarget | null> = ref(null);
const currentDropZone: Ref<EventTarget | null> = ref(null);

const dragStart = (e: Event) => {
  console.log(e.target);
  dragged.value = e.target;
  e.target.classList.add('dragging');
};

const dragStop = (e: Event) => {
  console.log(e);
  e.target.classList.remove('dragging');
};

const dragOver = (e: Event) => {
  e.preventDefault();
  if (currentDropZone.value != e.target) {
    currentDropZone.value = e.target;
  }
};

const dropped = (e: Event) => {
  console.log('dropped', e.target.dataset, currentDropZone.value);
  let dropZone: HTMLElement = currentDropZone.value as HTMLElement;
  while (!dropZone.classList.contains('drop-zone')) {
    dropZone = dropZone.parentElement as HTMLElement;
  }
  boardStore.updateBoardTask(dragged.value?.dataset.uuid, dropZone?.dataset?.name as string);
};

const createBoard = () => {
  console.log('create board');
};
</script>

<style scoped>
.page-single-board {
  grid-template-rows: 3rem auto;
}

.page-single-board > *:not(.top-bar) {
  grid-column: 2 / 3;
}

.page-single-board .board-table {
  grid-column: 2 / 3;
  display: grid;
  grid-template-rows: 40px auto;
  column-gap: 1rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
}

.table-header {
  grid-row: 1 / 2;
}

.drop-zone {
  background: lightslategrey;
  padding: 1rem;
  grid-row: 2 / 3;
  min-height: 50vh;
  display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
