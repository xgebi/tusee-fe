import type { ITask } from '@/interfaces/ITask';

export interface IBoard {
  boardUuid: string;
  name: string;
  description: string;
  owner: string;
  created?: Date;
  columns: string;
  tasks?: ITask[];
}

export interface IReceivedBoard {
  board_uuid: string;
  name: string;
  description: string;
  owner: string;
  created?: Date;
  columns: string;
}
