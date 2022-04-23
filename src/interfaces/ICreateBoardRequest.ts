import type IKey from '@/interfaces/IKey';
import type IBoard from '@/interfaces/IBoard';

interface ICreateBoardRequest {
  board: IBoard;
  key: IKey;
}

export default ICreateBoardRequest;
