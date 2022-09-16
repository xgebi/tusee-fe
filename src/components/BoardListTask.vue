<template>
  <div class="board-list-task">
    <p>
      <router-link
        :to="{ path: `/task/${props.task.taskUuid}` }"
        class="edit"
      >{{ props.task.title }}
      </router-link
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/interfaces/ITask';

const props = defineProps<{
  task: ITask;
}>();
</script>

<style scoped>
.board-list-task {
  padding: .5rem;
	color: var(--primary-color);
	background: var(--background-light);
	border-radius: .5rem;
	border: 1px solid var(--primary);
}

.board-list-task p {
  margin: 0;
}

.board-list-task a,
.board-list-task a:visited {
  color: var(--primary-color);
}

.small-drop-zone {
  height: 1rem;
}

.small-drop-zone:hover {
  background: pink;
}
</style>