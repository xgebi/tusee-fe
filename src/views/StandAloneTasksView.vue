<template>
  <main class="page page-standalone-tasks">
    <MainNavigation></MainNavigation>
    <h1>Standalone Tasks</h1>
    <ul v-if="!state.loading">
      <li v-for="(task, i) in taskStore.getStandaloneTasks" :key="i">
        <StandaloneTaskListItem :task="task"></StandaloneTaskListItem>
      </li>
    </ul>
    <p v-if="state.loading">Loading tasks</p>
    <button class="button" @click="loadArchived">Load done tasks</button>
    <section v-if="state.archiveLoaded">
      <h2>Done tasks</h2>
      <ul>
        <li v-for="(task, i) in doneTasks" :key="i">
          <StandaloneTaskListItem :task="task"></StandaloneTaskListItem>
        </li>
      </ul>
    </section>
    <p v-if="state.archiveLoading">Loading tasks</p>
  </main>
</template>

<script async setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import { onBeforeMount, reactive, ref, type Ref } from 'vue';
import TaskService from '@/services/Task.service';
import type { ITask } from '@/interfaces/ITask';
import TaskEdit from '@/components/shared/TaskEdit.vue';
import TaskStatuses from '@/const/TaskStatuses';
import StandaloneTaskListItem from '@/components/StandaloneTaskListItem.vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

const state = reactive({
  loading: true,
  archiveLoading: false,
  archiveLoaded: false,
});
const doneTasks: ITask[] = reactive([]);
const loadArchived = async () => {
  state.archiveLoading = true;
  doneTasks.splice(0, doneTasks.length)
  doneTasks.push(...await TaskService.getDoneStandAloneTasks());
  state.archiveLoading = false;
  state.archiveLoaded = true;
};
onBeforeMount(async () => {
  await taskStore.fetchStandAloneTasks();
  state.loading = false;
});

</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
