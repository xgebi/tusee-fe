import type dayjs from 'dayjs';
import Fetch from '@/utils/Fetch';
import type { IReceivedTask, ITask } from '@/interfaces/ITask';
import { useUserStore } from '@/stores/user';

class TaskRepository {
  public static async getStandAloneTasks(): Promise<IReceivedTask[]> {
    const response = await Fetch.get('standalone-tasks');
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.tasks as IReceivedTask[];
    }
    throw new Error();
  }

  public static async getDoneStandAloneTasks(): Promise<IReceivedTask[]> {
    const response = await Fetch.get('done-standalone-tasks');
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.tasks as IReceivedTask[];
    }
    throw new Error();
  }

  public static async fetchTask(task_uuid: string): Promise<IReceivedTask> {
    const response = await Fetch.get(`task/${task_uuid}`);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as IReceivedTask;
    }
    throw new Error();
  }

  public static async getTasksByBoard(boardId: string) {
    console.log('TBD');
  }

  public static async getTasksInTimeRange(
    start: dayjs.Dayjs,
    end: dayjs.Dayjs
  ) {
    console.log('TBD');
  }

  public static async getTask(taskId: string) {
    console.log('TBD');
  }

  public static async createTask(task: IReceivedTask): Promise<IReceivedTask> {
    const response = await Fetch.post('task', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as IReceivedTask;
    }
    throw new Error();
  }

  public static async updateTask(task: IReceivedTask): Promise<IReceivedTask> {
    const response = await Fetch.put('task', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as IReceivedTask;
    }
    throw new Error();
  }

  public static async deleteTask(taskUuid: string): Promise<string> {
    const response = await Fetch.delete(`task/${taskUuid}`);
    if (response.ok) {
      const result = await response.json();
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as string;
    }
    throw new Error();
  }

  public static async importMultipleTasks(
    tasks: IReceivedTask[]
  ): Promise<boolean> {
    const response = await Fetch.post(`task/import`, tasks);
    if (response.ok) {
      return true;
    }
    throw new Error();
  }
}

export default TaskRepository;
