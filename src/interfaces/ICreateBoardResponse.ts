import type { IKey } from '@/interfaces/IKey';
import type { IReceivedBoard } from '@/interfaces/IBoard';

interface ICreateBoardRequest {
  token: string;
  board: IReceivedBoard;
  key: IKey;
}

export default ICreateBoardRequest;
