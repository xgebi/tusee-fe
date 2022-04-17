<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <TaskEdit
      :new-task="false"
      :task="taskStore.getSelectedTask"
      v-on:created="createdTask"
      v-on:updated="updatedTask"
    ></TaskEdit>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import TaskEdit from '@/components/shared/TaskEdit.vue';
import type ITask from '@/interfaces/ITask';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';

const router = useRoute();
const taskStore = useTaskStore();
taskStore.selectStandAloneTask(router.params.id as string);

const createdTask = (e: ITask) => {
  console.log(e);
};

const updatedTask = (e: ITask) => {
  console.log(e);
};
</script>

<style scoped></style>
