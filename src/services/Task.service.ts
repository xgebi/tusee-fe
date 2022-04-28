import TaskRepository from '@/repositories/Task.repository';
import type ITask from '@/interfaces/ITask';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';

class TaskService {
  public static async getStandAloneTasks(): Promise<ITask[]> {
    const tasks: ITask[] = await TaskRepository.getStandAloneTasks();
    const resultingTasks: ITask[] = [];
    for (const task of tasks) {
      resultingTasks.push(this.decryptTask(task));
    }
    resultingTasks.sort((a, b) => {
      const aDayjs = dayjs(a.created);
      const bDayjs = dayjs(b.created);

      if (bDayjs.isBefore(aDayjs)) {
        return 1;
      }
      if (aDayjs.isBefore(bDayjs)) {
        return -1;
      }
      return 0;
    });
    return resultingTasks;
  }

  public static async getDoneStandAloneTasks(): Promise<ITask[]> {
    const tasks: ITask[] = await TaskRepository.getDoneStandAloneTasks();
    const resultingTasks: ITask[] = [];
    for (const task of tasks) {
      resultingTasks.push(this.decryptTask(task));
    }
    return resultingTasks;
  }

  public static async fetchTask(task_uuid: string): Promise<ITask> {
    const task: ITask = await TaskRepository.fetchTask(task_uuid);
    const decrypted = this.decryptTask(task);
    return decrypted;
  }

  public static async createTask(task: ITask): Promise<ITask> {
    const response_task: ITask = await TaskRepository.createTask(
      this.encryptTask(task)
    );
    return this.decryptTask(response_task);
  }

  public static async updateTask(task: ITask): Promise<ITask> {
    const response_task: ITask = await TaskRepository.updateTask(
      this.encryptTask(task)
    );
    return this.decryptTask(response_task);
  }

  public static async deleteTask(task: ITask): Promise<string> {
    const response_task: string = await TaskRepository.deleteTask(task);
    return response_task;
  }

  static encryptTask(task: ITask): ITask {
    const user = useUserStore();
    let key;
    if (task.board) {
      key = user.token.keys.filter((item) => task.board === item.board);
    } else {
      key = user.token.keys.filter((item) => !item.board);
    }
    const result = {
      ...task,
      title: AES.encrypt(task.title, key[0].key).toString(),
      description: AES.encrypt(task.description, key[0].key).toString(),
      task_status: AES.encrypt(task.task_status, key[0].key).toString(),
    };
    console.log(result);
    return result;
  }

  static decryptTask(task: ITask): ITask {
    const user = useUserStore();
    let key;
    if (task.board) {
      key = user.token.keys.filter((item) => task.board === item.board);
    } else {
      key = user.token.keys.filter((item) => !item.board);
    }
    return {
      ...task,
      title: AES.decrypt(task.title, key[0].key).toString(CryptoJS.enc.Utf8),
      description: AES.decrypt(task.description, key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
      task_status: AES.decrypt(task.task_status, key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
    };
  }
}
export default TaskService;
