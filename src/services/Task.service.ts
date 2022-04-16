import TaskRepository from '@/repositories/Task.repository';
import type ITask from '@/interfaces/ITask';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';

class TaskService {
  public static async getStandAloneTasks(): Promise<any> {
    return await TaskRepository.getStandAloneTasks();
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
    task.title = AES.encrypt(task.title, key[0].key).toString();
    task.description = AES.encrypt(task.description, key[0].key).toString();
    return task;
  }

  static decryptTask(task: ITask): ITask {
    const user = useUserStore();
    let key;
    if (task.board) {
      key = user.token.keys.filter((item) => task.board === item.board);
    } else {
      key = user.token.keys.filter((item) => !item.board);
    }
    task.title = AES.decrypt(task.title, key[0].key).toString();
    task.description = AES.decrypt(task.description, key[0].key).toString();
    return task;
  }
}
export default TaskService;
