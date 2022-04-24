<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <form @submit="formSubmitted">
      <div>
        <label for="title">Title</label>
        <input type="text" v-model="task.title" id="title" />
      </div>
      <div>
        <label for="Description">Description</label>
        <textarea v-model="task.description" id="Description"></textarea>
      </div>
      <div>
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
      <label class="task-done" :for="'task-done-' + task.task_uuid">
        <input
          type="checkbox"
          :checked="task.task_status === TaskStatuses.DONE"
        />
        Done
      </label>
      <div>Updated: {{ task.updated }}</div>
      <div>Created: {{ task.created }}</div>
      <div>
        <button>Save</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import type ITask from '@/interfaces/ITask';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';
import { reactive } from 'vue';
import TaskStatuses from '@/const/TaskStatuses';
import { useUserStore } from '@/stores/user';
import TaskService from '@/services/Task.service';
import { useBoardsStore } from "@/stores/boards";

const router = useRoute();
const taskStore = useTaskStore();
const userStore = useUserStore;
const boardsStore = useBoardsStore();
let task: ITask = reactive({
  title: '',
  description: '',
  deadline: undefined,
  startTime: undefined,
  task_uuid: '',
  creator: '',
  board: '',
  updated: undefined,
  created: undefined,
  task_status: TaskStatuses.READY,
});
if (router.params.id.toString().toLowerCase() !== 'new') {
  taskStore.selectStandAloneTask(router.params.id as string);
  task = reactive({ ...(taskStore.getSelectedTask as ITask) });
}

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
