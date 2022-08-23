<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <form @submit="formSubmitted" class="task-view">
      <div class="task-view__input">
        <label for="title">Title</label>
        <input type="text" v-model="task.title" id="title" />
      </div>
      <div class="task-view__textarea">
        <label for="Description">Description</label>
        <textarea v-model="task.description" id="Description"></textarea>
      </div>
      <div class="task-view__select">
        <label for="task-board">Board</label>
        <select id="task-board" v-model="task.board">
          <option :value="undefined"></option>
          <option
            v-for="board in boardsStore.getBoards"
            :key="board.boardUuid"
            :value="board.boardUuid"
          >
            {{ board.name }}
          </option>
        </select>
      </div>
      <label class="task-view__box" :for="'task-done-' + task.taskUuid">
        <input
          type="checkbox"
          :checked="task.taskStatus === TaskStatuses.DONE"
        />
        Done
      </label>
      <div class="task-view__info">Updated: {{ task.updated }}</div>
      <div class="task-view__info">Created: {{ task.created }}</div>
      <div class="task-view__button">
        <button>Save</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import type { ITask } from '@/interfaces/ITask';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';
import { reactive } from 'vue';
import TaskStatuses from '@/const/TaskStatuses';
import { useUserStore } from '@/stores/user';
import TaskService from '@/services/Task.service';
import { useBoardsStore } from '@/stores/boards';

const router = useRoute();
const taskStore = useTaskStore();
const userStore = useUserStore;
const boardsStore = useBoardsStore();
let task: ITask = reactive({
  title: '',
  description: '',
  deadline: undefined,
  startTime: undefined,
  taskUuid: '',
  creator: '',
  board: '',
  updated: undefined,
  created: undefined,
  taskStatus: TaskStatuses.READY,
  active: true,
});
const setTask = async () => {
  if (router.params.id.toString().toLowerCase() !== 'new') {
    await taskStore.selectStandAloneTask(router.params.id as string);
    const localTask = taskStore.getSelectedTask as ITask;
    task.title = localTask.title;
    task.description = localTask.description;
    task.deadline = localTask.deadline;
    task.startTime = localTask.startTime;
    task.taskUuid = localTask.taskUuid;
    task.creator = localTask.creator;
    task.board = localTask.board;
    task.updated = localTask.updated;
    task.created = localTask.created;
    task.taskStatus = localTask.taskStatus;
  }
};
setTask();

const formSubmitted = (e: Event) => {
  e.preventDefault();
  if (router.params.id.toString().toLowerCase() !== 'new') {
    updateTask();
  } else {
    createTask();
  }
};

const createTask = async () => {
  console.log('create');
  task = reactive({ ...(await TaskService.createTask(task)) });
};

const updateTask = async () => {
  console.log('update');
  task = reactive({ ...(await TaskService.updateTask(task)) });
};
</script>

<style scoped></style>
