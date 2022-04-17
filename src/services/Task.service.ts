import TaskRepository from '@/repositories/Task.repository';
import type ITask from '@/interfaces/ITask';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';

class TaskService {
  public static async getStandAloneTasks(): Promise<ITask[]> {
    const tasks: ITask[] = await TaskRepository.getStandAloneTasks();
    const resultingTasks: ITask[] = [];
    for (const task of tasks) {
      resultingTasks.push(this.decryptTask(task));
    }
    return resultingTasks;
  }

  public static async createTask(task: ITask): Promise<ITask> {
    const response_task: ITask = await TaskRepository.createTask(
      this.encryptTask(task)
    );
    return this.decryptTask(response_task);
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
    };
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
    };
  }
}
export default TaskService;
