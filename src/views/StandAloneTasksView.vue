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
    <ul>
      <li v-for="(task, i) in tasks" :key="i"></li>
    </ul>
  </main>
</template>

<script async setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import { onBeforeMount, reactive, ref, type Ref } from 'vue';
import TaskService from '@/services/Task.service';
import type ITask from '@/interfaces/ITask';
import TaskEdit from '@/components/shared/TaskEdit.vue';

const newTaskFormVisible: Ref<boolean> = ref(false);
const tasks: Ref<ITask[]> = ref([]);
const newTask: ITask = reactive({
  title: '',
  description: '',
  deadline: undefined,
  startTime: undefined,
});
onBeforeMount(async () => {
  const tasksFetched = await TaskService.getStandAloneTasks();
  console.log('tasksFetched', tasksFetched);
  tasks.value = tasksFetched;
});

const toggleNewTaskForm = () =>
  (newTaskFormVisible.value = !newTaskFormVisible.value);

const createNewTask = async (e: ITask) => {
  tasks.value.push(e);
};

console.log(tasks);
</script>

<style scoped></style>
