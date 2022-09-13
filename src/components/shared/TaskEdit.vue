<template>
  <section>
    <button class="button" @click="openDialog">Create new task</button>
    <dialog @close="createNewTask" ref="dialog">
      <form method="dialog" @submit="createNewTask">
        <div>
          <label for="task-title">Title</label>
          <input id="task-title" v-model="task.title" />
        </div>
        <div>
          <label for="task-description">Description</label>
          <textarea id="task-description" v-model="task.description"></textarea>
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
        <button class="button button--secondary" value="cancel">Cancel</button>
        <button class="button" id="confirmBtn" value="create">Create task</button>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type { ITask } from '@/interfaces/ITask';
import { reactive, type Ref, ref } from 'vue';
import TaskStatuses from '@/const/TaskStatuses';
import { useTaskStore } from '@/stores/tasks';
import { useBoardsStore } from '@/stores/boards';
import TaskService from '@/services/Task.service';

const dialog = ref(null);

const taskStore = useTaskStore();
const boardsStore = useBoardsStore();
console.log('boards', boardsStore.getBoards);

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
    taskStatus: TaskStatuses.READY,
    board: boardsStore.selectedBoard?.boardUuid,
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
  if (e.target?.returnValue === 'create' || e.target.tagName === 'FORM') {
    if (task.title.length === 0) {
      return;
    }
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
    if (!task.board) {
      await taskStore.appendStandAloneTask(task);
    } else {
      task.taskStatus = TaskStatuses.READY; // TODO is this needed?
      if (boardsStore.getSelectedBoard?.boardUuid === task.board) {
        await boardsStore.appendTaskToSelectedBoard(task);
      } else {
        await TaskService.createTask(task);
      }
    }
    task.description = '';
    task.title = '';
    task.board = boardsStore.selectedBoard?.boardUuid;
    task.startTime = undefined;
    task.deadline = undefined;
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
