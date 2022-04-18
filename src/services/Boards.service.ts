import { useUserStore } from '@/stores/user';

class BoardsService {
  public static async getBoardsInfo() {
    const userStore = useUserStore();
  }

  public static async getBoardTasks() {}
}

export default BoardsService;
