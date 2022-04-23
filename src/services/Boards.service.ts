import { useUserStore } from '@/stores/user';
import BoardsRepository from '@/repositories/Boards.repository';
import type IBoard from '@/interfaces/IBoard';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import type IKey from '@/interfaces/IKey';
import KeyService from '@/services/Key.service';
import type ICreateBoardResponse from '@/interfaces/ICreateBoardResponse';

class BoardsService {
  public static async getAvailableBoards() {
    const boards: IBoard[] = await BoardsRepository.getAvailableBoards();
    const resultingTasks: IBoard[] = [];
    for (const board of boards) {
      resultingTasks.push(this.decryptBoard(board));
    }
    return resultingTasks;
  }

  public static async getBoardInformation(boardUuid: string): Promise<IBoard> {
    const board: IBoard = await BoardsRepository.getBoardInformation(boardUuid);
    return this.decryptBoard(board);
  }

  public static async createNewBoard(board: IBoard): Promise<IBoard> {
    const userStore = useUserStore();
    const key: IKey = {
      tusee_user: '',
      key_uuid: '',
      key: KeyService.generateKey(),
    };
    const response: ICreateBoardResponse =
      await BoardsRepository.createNewBoard({
        board: this.encryptBoard(board, key),
        key: KeyService.encryptKey(key, userStore.token.password),
      });
    userStore.addKey(response.key);
    return this.decryptBoard(response.board);
  }

  public static async updateBoard(board: IBoard): Promise<IBoard> {
    const updatedBoard: IBoard = await BoardsRepository.updateBoard(
      this.encryptBoard(board)
    );
    return this.decryptBoard(updatedBoard);
  }

  public static async deleteBoard(boardUuid: string): Promise<string> {
    return BoardsRepository.deleteBoard(boardUuid);
  }

  public static async getBoardTasks() {}

  static decryptBoard(board: IBoard): IBoard {
    const user = useUserStore();
    const key: IKey | undefined = user.token.keys.find(
      (item) => board.boardUuid === item.board
    );
    if (key) {
      return {
        ...board,
        name: AES.decrypt(board.name, key.key).toString(CryptoJS.enc.Utf8),
        description: AES.decrypt(board.description, key.key).toString(
          CryptoJS.enc.Utf8
        ),
        columns: AES.decrypt(board.columns, key.key).toString(
          CryptoJS.enc.Utf8
        ),
      };
    }
    throw new Error('Key was not found');
  }

  static encryptBoard(
    board: IBoard,
    newKey: IKey | undefined = undefined
  ): IBoard {
    let key;
    if (!newKey) {
      const user = useUserStore();
      key = user.token.keys.find((item) => board.boardUuid === item.board);
    } else {
      key = newKey;
    }
    if (key) {
      return {
        ...board,
        name: AES.encrypt(board.name, key.key).toString(),
        description: AES.encrypt(board.description, key.key).toString(),
        columns: AES.encrypt(board.columns, key.key).toString(),
      };
    }
    throw new Error('Key was not found');
  }
}

export default BoardsService;
