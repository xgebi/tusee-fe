<template>
  <div class="standalone-task-list-item">
    <h2>{{ props.task.title }}</h2>
    <p class="time-task" v-if="task.startTime">
      {{ formatDate(task.startTime) }}
    </p>
    <p class="time-task" v-if="task.deadline">
      {{ formatDate(task.deadline) }}
    </p>
    <label class="task-done" :for="'task-done-' + task.task_uuid">
      <input
        type="checkbox"
        @change="completeTask"
        :checked="task.task_status === TaskStatuses.DONE"
      />
      Done
    </label>
    <a class="edit">Edit</a>
    <button class="delete">Delete</button>
  </div>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { formatDate } from '@/utils/date';
import TaskStatuses from '@/const/TaskStatuses';
import { reactive } from 'vue';
import TaskService from '@/services/Task.service';

const props = defineProps<{
  task: ITask;
}>();
let task = reactive(props.task as ITask);
const completeTask = async (e: Event) => {
  e.preventDefault();
  if (task.task_status === TaskStatuses.DONE) {
    task.task_status = TaskStatuses.IN_PROGRESS;
  } else {
    task.task_status = TaskStatuses.DONE;
  }
  task = reactive({ ...(await TaskService.updateTask(task)) });
};
</script>

<style scoped>
.standalone-task-list-item {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.standalone-task-list-item h2 {
  margin: 0;
  grid-column: 1 / 3;
}

.standalone-task-list-item .time-task {
  grid-column: 1 / 2;
}

.standalone-task-list-item .delete,
.standalone-task-list-item .edit,
.standalone-task-list-item .task-done {
  grid-column: 2 / 3;
}
</style>
