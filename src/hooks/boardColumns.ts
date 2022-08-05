import type TaskStatuses from '@/const/TaskStatuses';
import type IColumn from '@/interfaces/IColumn';

export default function useBoardColumns() {
  const parsedColumns: IColumn[] = [];

  function columnsSetup(columns: string) {
    parsedColumns.splice(0, parsedColumns.length);
    console.log('columns', columns);
    for (const column of columns.split(',')) {
      const columnItems: string[] = column.split(':');
      parsedColumns.push({
        name: columnItems[1],
        type: columnItems[0] as TaskStatuses,
      });
    }
  }

  return {
    parsedColumns,
    columnsSetup,
  };
}
