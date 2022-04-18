import type dayjs from 'dayjs';
import Fetch from '@/utils/Fetch';
import type ITask from '@/interfaces/ITask';
import { useUserStore } from '@/stores/user';

class TaskRepository {
  public static async getStandAloneTasks(): Promise<ITask[]> {
    const response = await Fetch.get('standalone-tasks');
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.tasks as ITask[];
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

  public static async createTask(task: ITask): Promise<ITask> {
    const response = await Fetch.post('task', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as ITask;
    }
    throw new Error();
  }

  public static async updateTask(task: ITask): Promise<ITask> {
    const response = await Fetch.put('task', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as ITask;
    }
    throw new Error();
  }

  public static async deleteTask(task: ITask): Promise<string> {
    const response = await Fetch.delete('task', {
      task_uuid: task['task_uuid'],
    });
    if (response.ok) {
      const result = await response.json();
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.task as string;
    }
    throw new Error();
  }
}

export default TaskRepository;
