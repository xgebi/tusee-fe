import { useUserStore } from '@/stores/user';
import BoardsRepository from '@/repositories/Boards.repository';
import type { IBoard, IReceivedBoard } from '@/interfaces/IBoard';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import type { IKey } from '@/interfaces/IKey';
import KeyService from '@/services/Key.service';
import type ICreateBoardResponse from '@/interfaces/ICreateBoardResponse';
import type { IBoardViewResponse, INormalizedBoardViewResponse } from '@/interfaces/IBoardViewResponse';
import TaskService from '@/services/Task.service';

class BoardsService {
  public static async getAvailableBoards() {
    const boards: IReceivedBoard[] = await BoardsRepository.getAvailableBoards();
    const normalizedBoards: IBoard[] = boards.map((board) => this.normalizeBoardForFe(board));
    const resultingTasks: IBoard[] = [];
    const userStore = useUserStore();
    for (const board of normalizedBoards) {
      resultingTasks.push(this.decryptBoard(board, userStore.token.keys));
    }
    return resultingTasks;
  }

  public static async getBoardInformation(boardUuid: string): Promise<IBoard> {
    const receivedBoard: IReceivedBoard =
      await BoardsRepository.getBoardInformation(boardUuid);
    const board = this.normalizeBoardForFe(receivedBoard);
    const userStore = useUserStore();
    return this.decryptBoard(board, userStore.token.keys);
  }

  public static async getBoardView(
    boardUuid: string
  ): Promise<INormalizedBoardViewResponse> {
    const response: IBoardViewResponse = await BoardsRepository.getBoardView(
      boardUuid
    );
    const userStore = useUserStore();
    return {
      token: '',
      board: this.decryptBoard(
        this.normalizeBoardForFe(response.board),
        userStore.token.keys
      ),
      tasks: response.tasks.map((task) =>
        TaskService.decryptTask(TaskService.normalizeTaskForFe(task))
      ),
    };
  }

  public static async createNewBoard(board: IBoard): Promise<IBoard> {
    const userStore = useUserStore();
    const key: IKey = {
      tuseeUser: '',
      keyUuid: '',
      key: KeyService.generateKey(),
    };
    const encryptedKey = KeyService.encryptKey(key, userStore.token.password);
    const normalizedKey = KeyService.normalizeKeysForBe(encryptedKey);
    const response: ICreateBoardResponse =
      await BoardsRepository.createNewBoard({
        board: this.encryptBoard(board, key),
        key: normalizedKey,
      });
    userStore.addKey(
      KeyService.decryptKey(response.key, userStore.token.password)
    );
    return this.decryptBoard(this.normalizeBoardForFe(response.board), userStore.token.keys);
  }

  public static async updateBoard(board: IBoard): Promise<IBoard> {
    const receivedUpdatedBoard: IReceivedBoard =
      await BoardsRepository.updateBoard(
        this.normalizeBoardForBe(this.encryptBoard(board))
      );
    const normalizedUpdatedBoard =
      this.normalizeBoardForFe(receivedUpdatedBoard);
    const userStore = useUserStore();
    return this.decryptBoard(normalizedUpdatedBoard, userStore.token.keys);
  }

  public static async deleteBoard(boardUuid: string): Promise<string> {
    const result = await BoardsRepository.deleteBoard(boardUuid);
    const userStore = useUserStore();
    userStore.removeKey(result);
    return result;
  }

  public static importMultipleBoards(boards: IBoard[]): Promise<boolean> {
    const processedBoards = boards.map((task) =>
      this.normalizeBoardForBe(this.encryptBoard(task))
    );
    return BoardsRepository.importMultipleBoards(processedBoards);
  }

  static decryptBoard(
    board: IBoard,
    keys: IKey[] | undefined = undefined
  ): IBoard {
    let key: IKey | undefined;
    if (!keys) {
      const user = useUserStore();
      key = user.token.keys.find((item) => board.boardUuid === item.board);
    } else {
      key = keys.find((item) => board.boardUuid === item.board);
    }
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

  public static normalizeBoardForFe(board: IReceivedBoard): IBoard {
    return {
      boardUuid: board.board_uuid,
      columns: board.columns,
      created: board.created,
      description: board.description,
      name: board.name,
      owner: board.owner,
    };
  }

  public static normalizeBoardForBe(board: IBoard): IReceivedBoard {
    return {
      board_uuid: board.boardUuid,
      columns: board.columns,
      created: board.created,
      description: board.description,
      name: board.name,
      owner: board.owner,
    };
  }
}

export default BoardsService;
