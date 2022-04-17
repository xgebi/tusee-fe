<template>
  <section>
    <form @submit="createNewTask">
      <div>
        <label for="task-title">Title</label>
        <input id="task-title" v-model="task.title" />
      </div>
      <div>
        <label for="task-description">Description</label>
        <input id="task-description" v-model="task.description" />
      </div>
      <div>
        <label for="task-deadline">Title</label>
        <input
          id="task-deadline"
          type="datetime-local"
          v-model="task.deadline"
        />
      </div>
      <div>
        <label for="task-start-time">Title</label>
        <input
          id="task-start-time"
          type="datetime-local"
          v-model="task.startTime"
        />
      </div>
      <button @click="createNewTask">Create</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { reactive } from 'vue';
import TaskService from '@/services/Task.service';
import TaskStatuses from '@/const/TaskStatuses';

const props = defineProps<{
  newTask?: boolean;
  task?: ITask;
}>();

const emit = defineEmits<{
  (e: 'created', task: ITask): void;
  (e: 'updated', task: ITask): void;
}>();

let task: ITask;
if (props.newTask && !props.task) {
  task = reactive({
    description: '',
    title: '',
    startTime: undefined,
    deadline: undefined,
    task_status: TaskStatuses.READY,
  } as ITask);
} else {
  task = reactive(props.task as ITask);
}

const createNewTask = async (e: Event) => {
  e.preventDefault();
  const createdTask = await TaskService.createTask(task);
  if (props.newTask) {
    emit('created', createdTask);
  } else {
    emit('updated', createdTask);
  }
};
</script>
<style scoped></style>
