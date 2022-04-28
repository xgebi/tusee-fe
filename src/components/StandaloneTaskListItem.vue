<template>
  <div class="standalone-task-list-item">
    <h2>{{ props.task.title }}</h2>
    <p class="time-task" v-if="props.task.startTime">
      Start time: {{ formatDate(props.task.startTime) }}
    </p>
    <p class="time-task" v-if="props.task.deadline">
      Deadline: {{ formatDate(props.task.deadline) }}
    </p>
    <label class="task-done" :for="'task-done-' + props.task.task_uuid">
      <input
        type="checkbox"
        @change="completeTask"
        :checked="props.task.task_status === TaskStatuses.DONE"
      />
      Done
    </label>
    <router-link :to="{ path: `/task/${props.task.task_uuid}` }" class="edit"
      >Edit</router-link
    >
    <button class="delete" @click="deleteTask">Delete</button>
  </div>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { formatDate } from '@/utils/date';
import TaskStatuses from '@/const/TaskStatuses';
import { useTaskStore } from '@/stores/tasks';
import _ from 'lodash';

const props = defineProps<{
  task: ITask;
}>();
const completeTask = async (e: Event) => {
  // TODO make this more reusable
  e.preventDefault();
  const task = _.cloneDeep(props.task);
  if (task.task_status === TaskStatuses.DONE) {
    task.task_status = TaskStatuses.IN_PROGRESS;
  } else {
    task.task_status = TaskStatuses.DONE;
    task.done_date = new Date();
  }
  await taskStore.updateTask(task);
};

const taskStore = useTaskStore();
const deleteTask = async (e: Event) => {
  await taskStore.deleteStandAloneTasks(props.task);
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
