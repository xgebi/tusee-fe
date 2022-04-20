import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';
import BoardsRepository from '@/repositories/Boards.repository';
import type IBoard from '@/interfaces/IBoard';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

class BoardsService {
  public static async getAvailableBoards() {
    const boards: IBoard[] = await BoardsRepository.getAvailableBoards();
    const resultingTasks: IBoard[] = [];
    for (const board of boards) {
      resultingTasks.push(this.decryptBoard(board));
    }
    return resultingTasks;
  }

  public static async getBoardTasks() {}

  static decryptBoard(board: IBoard): IBoard {
    const user = useUserStore();
    const key = user.token.keys.filter(
      (item) => board.boardUuid === item.board
    );
    return {
      ...board,
      name: AES.decrypt(board.name, key[0].key).toString(CryptoJS.enc.Utf8),
      description: AES.decrypt(board.description, key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
    };
  }
}

export default BoardsService;
