<template>
  <section>
    <button @click="openDialog">Create new task</button>
    <dialog @close="createNewTask" ref="dialog">
      <form method="dialog">
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
        <!--        <input type="submit" value="Create" />-->
        <button value="cancel">Cancel</button>
        <button id="confirmBtn" value="create">Create task</button>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { reactive, Ref, ref } from 'vue';
import TaskService from '@/services/Task.service';
import TaskStatuses from '@/const/TaskStatuses';
import { useTaskStore } from '@/stores/tasks';
const dialog = ref(null);

const taskStore = useTaskStore();

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

const dialogOpened: Ref<boolean> = ref(false);
const openDialog = () => {
  dialog.value.showModal();
};

const createNewTask = async (e: Event) => {
  e.preventDefault();
  dialog.value.close();
  if (e.target?.returnValue === 'create') {
    await taskStore.appendStandAloneTasks(task);
  }
};
</script>
<style scoped>
dialog::backdrop {
  background: rgba(101, 82, 82, 0.25);
}
</style>
