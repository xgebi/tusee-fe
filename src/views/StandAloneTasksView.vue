<template>
  <main class="page page-standalone-tasks">
    <MainNavigation></MainNavigation>
    <h1>Standalone Tasks</h1>
    <button @click="toggleNewTaskForm">Create new task</button>
    <TaskEdit
      v-if="newTaskFormVisible"
      :new-task="true"
      v-on:created="createNewTask"
    ></TaskEdit>
    <ul v-if="!state.loading">
      <li v-for="(task, i) in tasks" :key="i">
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

const newTaskFormVisible: Ref<boolean> = ref(false);
const tasks: Ref<ITask[]> = ref([]);
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
  const tasksFetched = await TaskService.getStandAloneTasks();
  console.log('tasksFetched', tasksFetched);
  tasks.value = tasksFetched;
  state.loading = false;
});

const toggleNewTaskForm = () =>
  (newTaskFormVisible.value = !newTaskFormVisible.value);

const createNewTask = async (e: ITask) => {
  tasks.value.push(e);
};
</script>

<style scoped></style>
