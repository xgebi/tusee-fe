<template>
  <section>
    <button class="button" @click="openDialog">Create new event</button>
    <dialog @close="createNewTask" ref="dialog">
      <form method="dialog" @submit="createNewTask">
        <div>
          <label for="task-title">Title</label>
          <input id="task-title" v-model="event.eventName" />
        </div>
        <div>
          <label for="task-description">Description</label>
          <textarea id="task-description" v-model="event.description"></textarea>
        </div>
        <div>
          <label for="task-start-time">Start</label>
          <div id="task-start-time">
            <input type="date" v-model="eventDateTimes.startTimeDate" />
            <input type="time" v-model="eventDateTimes.startTimeTime" />
          </div>
        </div>
        <div>
          <label for="task-end-time">End</label>
          <div id="task-end-time">
            <input type="date" v-model="eventDateTimes.endTimeDate" />
            <input type="time" v-model="eventDateTimes.endTimeTime" />
          </div>
        </div>
        <button class="button button--secondary" value="cancel">Cancel</button>
        <button class="button" id="confirmBtn" value="create">Create event</button>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type { IEvent } from '@/interfaces/IEvent';
import { reactive, type Ref, ref } from 'vue';
import TaskStatuses from '@/const/TaskStatuses';
import { useTaskStore } from '@/stores/tasks';
import { useBoardsStore } from '@/stores/boards';
import TaskService from '@/services/Task.service';
import dayjs from 'dayjs';

const dialog = ref(null);

const taskStore = useTaskStore();
const boardsStore = useBoardsStore();
console.log('boards', boardsStore.getBoards);

const props = defineProps<{
  newEvent?: boolean;
  event?: IEvent;
}>();

const emit = defineEmits<{
  (e: 'created', task: IEvent): void;
  (e: 'updated', task: IEvent): void;
}>();

let event: IEvent;
if (props.newEvent && !props.event) {
  event = reactive({
    eventUuid: '',
    userUuid: '',
    eventName: '',
    description: '',
  } as IEvent);
} else {
  event = reactive(props.event as IEvent);
}
const eventDateTimes = reactive({
  endTimeDate: '',
  endTimeTime: '',
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
    if (event.eventName.length === 0) {
      return;
    }
    if (eventDateTimes.startTimeDate) {
      event.startTimedate = eventDateTimes.startTimeTime
        ? new Date(
            `${eventDateTimes.startTimeDate}T${eventDateTimes.startTimeTime}`
          )
        : new Date(`${eventDateTimes.startTimeDate}T00:00:00`);
    } else {
			return;
		}
    if (eventDateTimes.endTimeDate) {
      event.startTime = eventDateTimes.startTimeTime
        ? new Date(
            `${eventDateTimes.startTimeDate}T${eventDateTimes.startTimeTime}`
          )
        : new Date(`${eventDateTimes.startTimeDate}T23:59:59`);
    } else {
			return;
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
