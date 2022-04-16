<template>
  <main class="page page-standalone-tasks">
    <MainNavigation></MainNavigation>
    <h1>Standalone Tasks</h1>
    <button @click="toggleNewTaskForm">Create new task</button>
    <section v-if="newTaskFormVisible">
      <form @submit="createNewTask">
        <div>
          <label for="task-title">Title</label>
          <input id="task-title" v-model="newTask.title" />
        </div>
        <div>
          <label for="task-description">Description</label>
          <input id="task-description" v-model="newTask.description" />
        </div>
        <div>
          <label for="task-deadline">Title</label>
          <input
            id="task-deadline"
            type="datetime-local"
            v-model="newTask.deadline"
          />
        </div>
        <div>
          <label for="task-start-time">Title</label>
          <input
            id="task-start-time"
            type="datetime-local"
            v-model="newTask.startTime"
          />
        </div>
        <button @click="createNewTask">Create</button>
      </form>
    </section>
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

const createNewTask = async () => {
  const createdTask = await TaskService.createTask(newTask);
  tasks.value.push(createdTask)
};

console.log(tasks);
</script>

<style scoped></style>
