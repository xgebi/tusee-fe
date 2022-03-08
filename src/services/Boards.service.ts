import { useUserStore } from '@/stores/user';

class BoardsService {
  public static async getBoardsInfo() {
    const userStore = useUserStore();
    console.log(userStore.token);
  }

  public static async getBoardTasks() {}
}

export default BoardsService;
