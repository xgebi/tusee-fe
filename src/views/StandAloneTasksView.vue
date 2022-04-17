<template>
  <main class="page page-standalone-tasks">
    <MainNavigation></MainNavigation>
    <h1>Standalone Tasks</h1>
    <TaskEdit :new-task="true" v-on:created="createNewTask"></TaskEdit>
    <ul v-if="!state.loading">
      <li v-for="(task, i) in taskStore.getStandaloneTasks" :key="i">
        <StandaloneTaskListItem :task="task"></StandaloneTaskListItem>
      </li>
    </ul>
    <p v-if="state.loading">Loading tasks</p>
  </main>
</template>

<script async setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import { onBeforeMount, reactive, ref, type Ref } from 'vue';
import TaskService from '@/services/Task.service';
import type ITask from '@/interfaces/ITask';
import TaskEdit from '@/components/shared/TaskEdit.vue';
import TaskStatuses from '@/const/TaskStatuses';
import StandaloneTaskListItem from '@/components/StandaloneTaskListItem.vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

const state = reactive({
  loading: true,
});
const newTask: ITask = reactive({
  title: '',
  description: '',
  deadline: undefined,
  startTime: undefined,
  task_status: TaskStatuses.READY,
});
onBeforeMount(async () => {
  await taskStore.fetchStandAloneTasks();
  state.loading = false;
});

const createNewTask = async (task: ITask) => {
  taskStore.appendStandAloneTasks(task);
};
</script>

<style scoped>
.page-standalone-tasks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.page-standalone-tasks *:not(.top-bar) {
  grid-column: 2 / 3;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
