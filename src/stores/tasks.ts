import { defineStore } from 'pinia';
import type ITask from '@/interfaces/ITask';
import TaskService from '@/services/Task.service';

export type TaskState = {
  standaloneTasks: ITask[];
  selectedTask?: ITask;
};

export const useTaskStore = defineStore({
  id: 'tasks',
  state: () =>
    ({
      standaloneTasks: [],
      selectedTask: undefined,
    } as TaskState),
  getters: {
    getStandaloneTasks: (state) => state.standaloneTasks,
    getSelectedTask: (state) => state.selectedTask,
  },
  actions: {
    async fetchStandAloneTasks() {
      this.standaloneTasks = await TaskService.getStandAloneTasks();
    },
    selectStandAloneTask(task_uuid: string) {
      this.selectedTask = this.standaloneTasks.filter(
        (task) => task.task_uuid === task_uuid
      )[0];
    },
    appendStandAloneTasks(task: ITask) {
      this.standaloneTasks.push(task);
    },
  },
});
