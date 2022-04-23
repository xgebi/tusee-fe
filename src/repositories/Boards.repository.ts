import Fetch from '@/utils/Fetch';
import type IAvailableBoardsResponse from '@/interfaces/IAvailableBoardsResponse';
import type IBoard from '@/interfaces/IBoard';
import { useUserStore } from '@/stores/user';
import type IBoardResponse from '@/interfaces/IBoardResponse';
import type IBoardDeletedResponse from '@/interfaces/IBoardDeletedResponse';
import type ICreateBoardRequest from '@/interfaces/ICreateBoardRequest';
import type ICreateBoardResponse from '@/interfaces/ICreateBoardResponse';

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

  public static async getBoardInformation(boardUuid: string) {
    const response = await Fetch.get(`board/${boardUuid}`);
    if (response.ok) {
      const result = (await response.json()) as IBoardResponse;
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.board as IBoard;
    }
    throw new Error();
  }

  public static async createNewBoard(
    cbr: ICreateBoardRequest
  ): Promise<ICreateBoardResponse> {
    const response = await Fetch.post(`board`, cbr);
    if (response.ok) {
      const result = (await response.json()) as ICreateBoardResponse;
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result as ICreateBoardResponse;
    }
    throw new Error();
  }

  public static async updateBoard(board: IBoard) {
    const response = await Fetch.put(`board`, board);
    if (response.ok) {
      const result = (await response.json()) as IBoardResponse;
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.board as IBoard;
    }
    throw new Error();
  }

  public static async deleteBoard(boardUuid: string): Promise<string> {
    const response = await Fetch.delete(`board`, { boardUuid: boardUuid });
    if (response.ok) {
      const result = (await response.json()) as IBoardDeletedResponse;
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.board;
    }
    throw new Error();
  }
}

export default BoardsRepository;
