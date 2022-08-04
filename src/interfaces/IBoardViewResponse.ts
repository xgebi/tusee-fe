import type { IBoard } from '@/interfaces/IBoard';
import type ITask from '@/interfaces/ITask';

interface IBoardViewResponse {
  token: string;
  board: IBoard;
  tasks: ITask[];
}

export default IBoardViewResponse;
