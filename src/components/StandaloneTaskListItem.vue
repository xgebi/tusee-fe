<template>
  <div class="standalone-task-list-item">
    <h2>{{ props.task.title }}</h2>
    <p class="time-task" v-if="props.task.startTime">
      Start time: {{ formatDate(props.task.startTime) }}
    </p>
    <p class="time-task" v-if="props.task.deadline">
      Deadline: {{ formatDate(props.task.deadline) }}
    </p>
    <label class="task-done" :for="'task-done-' + props.task.taskUuid">
      <input
        type="checkbox"
        @change="completeTask"
        :checked="props.task.taskStatus === TaskStatuses.DONE"
      />
      Done
    </label>
    <router-link :to="{ path: `/task/${props.task.taskUuid}` }" class="edit button"
      >Edit</router-link
    >
    <button class="button button--secondary delete" @click="deleteTask">Delete</button>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '@/interfaces/ITask';
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
  if (task.taskStatus === TaskStatuses.DONE) {
    task.taskStatus = TaskStatuses.IN_PROGRESS;
    task.active = true;
  } else {
    task.taskStatus = TaskStatuses.DONE;
    task.active = false;
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
  border: 2px solid #76aac8;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - .5rem));
  gap: 1rem;
	border-radius: .5rem;
	background: #fefefe;
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
