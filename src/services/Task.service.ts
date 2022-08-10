import TaskRepository from '@/repositories/Task.repository';
import type { IReceivedTask, ITask } from '@/interfaces/ITask';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';

class TaskService {
  public static async getStandAloneTasks(): Promise<ITask[]> {
    const tasks: IReceivedTask[] = await TaskRepository.getStandAloneTasks();
    const resultingTasks: ITask[] = [];
    for (const task of tasks) {
      const normTask = this.normalizeTaskForFe(task);
      resultingTasks.push(this.decryptTask(normTask));
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
    const tasks: IReceivedTask[] = await TaskRepository.getDoneStandAloneTasks();
    const resultingTasks: ITask[] = [];
    for (const task of tasks) {
      const normTask = this.normalizeTaskForFe(task);
      resultingTasks.push(this.decryptTask(normTask));
    }
    return resultingTasks;
  }

  public static async fetchTask(task_uuid: string): Promise<ITask> {
    const task: IReceivedTask = await TaskRepository.fetchTask(task_uuid);
    const normTask = this.normalizeTaskForFe(task);
    return this.decryptTask(normTask);
  }

  public static async createTask(task: ITask): Promise<ITask> {
    const encryptedTask = this.encryptTask(task);
    const requestTask = this.normalizeTaskForBe(encryptedTask);
    const responseTask: IReceivedTask = await TaskRepository.createTask(
      requestTask
    );
    const normedResponse = this.normalizeTaskForFe(responseTask);
    return this.decryptTask(normedResponse);
  }

  public static async updateTask(task: ITask): Promise<ITask> {
    const response_task: IReceivedTask = await TaskRepository.updateTask(
      this.normalizeTaskForBe(this.encryptTask(task))
    );
    return this.decryptTask(this.normalizeTaskForFe(response_task));
  }

  public static async deleteTask(task: ITask): Promise<string> {
    return await TaskRepository.deleteTask(task.taskUuid as string);
  }

  public static importMultipleTasks(tasks: ITask[]): Promise<boolean> {
    const processedTasks = tasks.map((task) =>
      this.normalizeTaskForBe(this.encryptTask(task)));
    return TaskRepository.importMultipleTasks(processedTasks);
  }

  static encryptTask(task: ITask): ITask {
    const user = useUserStore();
    let key;
    if (task.board) {
      key = user.token.keys.filter((item) => task.board === item.board);
    } else {
      key = user.token.keys.filter((item) => !item.board);
    }
    return {
      ...task,
      title: AES.encrypt(task.title, key[0].key).toString(),
      description: AES.encrypt(task.description, key[0].key).toString(),
      taskStatus: AES.encrypt(task.taskStatus, key[0].key).toString(),
    };
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
      title: AES.decrypt(task.title.toString(), key[0].key).toString(CryptoJS.enc.Utf8),
      description: AES.decrypt(task.description.toString(), key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
      taskStatus: AES.decrypt(task.taskStatus.toString(), key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
    };
  }

  static normalizeTaskForFe(task: IReceivedTask): ITask {
    return {
      board: task.board,
      created: task.created,
      creator: task.creator,
      deadline: task.deadline,
      description: task.description,
      active: task.active,
      startTime: task.start_time,
      taskStatus: task.task_status,
      taskUuid: task.task_uuid,
      title: task.title,
      updated: task.updated,
    };
  }

  static normalizeTaskForBe(task: ITask): IReceivedTask {
    return {
      board: task.board,
      created: task.created,
      creator: task.creator,
      deadline: task.deadline,
      description: task.description,
      active: task.active,
      start_time: task.startTime,
      task_status: task.taskStatus,
      task_uuid: task.taskUuid,
      title: task.title,
      updated: task.updated,
    };
  }
}
export default TaskService;
