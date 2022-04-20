import type IBoard from '@/interfaces/IBoard';

interface IAvailableBoardsResponse {
  token: string;
  boards: IBoard[];
}

export default IAvailableBoardsResponse;
