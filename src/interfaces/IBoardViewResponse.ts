import type { IBoard, IReceivedBoard } from '@/interfaces/IBoard';
import type { ITask, IReceivedTask } from '@/interfaces/ITask';

export interface INormalizedBoardViewResponse {
  token: string;
  board: IBoard;
  tasks: ITask[];
}

export interface IBoardViewResponse {
  token: string;
  board: IReceivedBoard;
  tasks: IReceivedTask[];
}
