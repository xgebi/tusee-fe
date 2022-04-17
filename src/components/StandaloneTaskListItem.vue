<template>
  <div class="standalone-task-list-item">
    <h2>{{ props.task.title }}</h2>
    <p v-if="task.startTime">{{ formatDate(task.startTime) }}</p>
    <p v-if="task.deadline">{{ formatDate(task.deadline) }}</p>
    <label :for="'task-done-' + task.task_uuid">
      <input
        type="checkbox"
        @change="completeTask"
        :checked="task.task_status === TaskStatuses.DONE"
      />
      Done
    </label>
    <a>Edit</a>
    <button>Delete</button>
  </div>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { formatDate } from '@/utils/date';
import TaskStatuses from '@/const/TaskStatuses';
import { reactive } from 'vue';

const props = defineProps<{
  task: ITask;
}>();
const task = reactive(props.task as ITask);
const completeTask = (e: Event) => {
  e.preventDefault();
};
</script>

<style scoped></style>
