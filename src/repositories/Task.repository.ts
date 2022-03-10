import type dayjs from 'dayjs';

class TaskRepository {
  public static async getTasksByBoard(boardId: string) {}

  public static async getTasksInTimeRange(
    start: dayjs.Dayjs,
    end: dayjs.Dayjs
  ) {}

  public static async getTask(taskId: string) {}
}

export default TaskRepository;
