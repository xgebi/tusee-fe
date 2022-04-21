import type IBoard from '@/interfaces/IBoard';

interface IBoardResponse {
  token: string;
  board: IBoard;
}

export default IBoardResponse;
