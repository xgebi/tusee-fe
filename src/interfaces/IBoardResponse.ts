import type { IReceivedBoard } from '@/interfaces/IBoard';

interface IBoardResponse {
  token: string;
  board: IReceivedBoard;
}

export default IBoardResponse;
