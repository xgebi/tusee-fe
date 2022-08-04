<template>
  <div class="board-list-item"></div>
</template>

<script setup lang="ts">
import type { IBoard } from '@/interfaces/IBoard';
import { formatDate } from '@/utils/date';
import TaskStatuses from '@/const/TaskStatuses';
import { useTaskStore } from '@/stores/tasks';
import _ from 'lodash';

const props = defineProps<{
  board: IBoard;
}>();
</script>

<style scoped>
.board-list-item {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.board-list-item h2 {
  margin: 0;
  grid-column: 1 / 3;
}
</style>
