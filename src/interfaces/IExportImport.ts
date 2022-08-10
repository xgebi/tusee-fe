import type { IKey } from '@/interfaces/IKey';
import type { IBoard } from '@/interfaces/IBoard';
import type { ITask } from '@/interfaces/ITask';

export interface IExportImport {
  keys: IKey[];
  boards: IBoard[];
  standAloneTasks: ITask[];
}