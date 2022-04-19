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
          <textarea id="task-description" v-model="task.description"></textarea>
        </div>
        <div>
          <label for="task-deadline">Deadline</label>
          <div id="task-deadline">
            <input type="date" v-model="taskDateTimes.deadlineDate" />
            <input type="time" v-model="taskDateTimes.deadlineTime" />
          </div>
        </div>
        <div>
          <label for="task-start-time">Start date</label>
          <div id="task-start-time">
            <input type="date" v-model="taskDateTimes.startTimeDate" />
            <input type="time" v-model="taskDateTimes.startTimeTime" />
          </div>
        </div>
        <button value="cancel">Cancel</button>
        <button id="confirmBtn" value="create">Create task</button>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';
import { reactive, Ref, ref } from 'vue';
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
const taskDateTimes = reactive({
  deadlineDate: '',
  deadlineTime: '',
  startTimeDate: '',
  startTimeTime: '',
});

const dialogOpened: Ref<boolean> = ref(false);
const openDialog = () => {
  dialog.value.showModal();
};

const createNewTask = async (e: Event) => {
  e.preventDefault();
  dialog.value.close();
  if (e.target?.returnValue === 'create') {
    if (taskDateTimes.deadlineDate) {
      task.deadline = taskDateTimes.deadlineTime
        ? new Date(
            `${taskDateTimes.deadlineDate}T${taskDateTimes.deadlineTime}`
          )
        : new Date(`${taskDateTimes.deadlineDate}T23:59:59`);
    }
    if (taskDateTimes.startTimeDate) {
      task.startTime = taskDateTimes.startTimeTime
        ? new Date(
            `${taskDateTimes.startTimeDate}T${taskDateTimes.startTimeTime}`
          )
        : new Date(`${taskDateTimes.startTimeDate}T23:59:59`);
    }
    await taskStore.appendStandAloneTasks(task);
  }
};
</script>
<style scoped>
dialog::backdrop {
  background: rgba(101, 82, 82, 0.25);
}

form div {
  display: flex;
  flex-flow: column;
}
</style>
