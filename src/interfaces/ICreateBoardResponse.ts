import type IKey from '@/interfaces/IKey';
import type IBoard from '@/interfaces/IBoard';

interface ICreateBoardRequest {
  token: string;
  board: IBoard;
  key: IKey;
}

export default ICreateBoardRequest;
