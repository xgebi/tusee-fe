import type { IReceivedBoard } from '@/interfaces/IBoard';

interface IAvailableBoardsResponse {
  token: string;
  boards: IReceivedBoard[];
}

export default IAvailableBoardsResponse;
