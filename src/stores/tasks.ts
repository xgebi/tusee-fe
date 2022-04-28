import { defineStore } from 'pinia';
import type ITask from '@/interfaces/ITask';
import TaskService from '@/services/Task.service';
import _ from 'lodash';

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
    async selectStandAloneTask(task_uuid: string) {
      const localTask = this.standaloneTasks.find(
        (task) => task.task_uuid === task_uuid
      );
      if (localTask) {
        this.selectedTask = localTask;
      } else {
        this.selectedTask = await TaskService.fetchTask(task_uuid);
        console.log(this.selectedTask);
      }
    },
    async appendStandAloneTask(task: ITask) {
      this.standaloneTasks.push(await TaskService.createTask(task));
    },
    async deleteStandAloneTasks(task: ITask) {
      const deletedTask = await TaskService.deleteTask(task);
      _.remove(this.standaloneTasks, (task: ITask) => {
        return task.task_uuid === deletedTask;
      });
    },
    async updateTask(task: ITask) {
      const updatedTask = await TaskService.updateTask(task);
      const foundTask = this.standaloneTasks.findIndex(
        (task) => task.task_uuid === updatedTask.task_uuid
      );
      this.standaloneTasks[foundTask] = updatedTask;
    },
  },
});
