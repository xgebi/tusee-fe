import type dayjs from 'dayjs';
import Fetch from '@/utils/Fetch';
import type ITask from '@/interfaces/ITask';

class TaskRepository {
  public static async getStandAloneTasks(): Promise<any> {
    const response = await Fetch.get('standalone-tasks');
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result as any;
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
      return result as ITask;
    }
    throw new Error();
  }
}

export default TaskRepository;
