import Fetch from '@/utils/Fetch';
import type IAvailableBoardsResponse from '@/interfaces/IAvailableBoardsResponse';
import type IBoard from '@/interfaces/IBoard';
import { useUserStore } from '@/stores/user';

class BoardsRepository {
  public static async getAvailableBoards() {
    const response = await Fetch.get('boards');
    if (response.ok) {
      const result = (await response.json()) as IAvailableBoardsResponse;
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.boards as IBoard[];
    }
    throw new Error();
  }
}

export default BoardsRepository;
