import type { IReceivedKey } from '@/interfaces/IKey';
import type { IBoard } from '@/interfaces/IBoard';

interface ICreateBoardRequest {
  board: IBoard;
  key: IReceivedKey;
}

export default ICreateBoardRequest;
