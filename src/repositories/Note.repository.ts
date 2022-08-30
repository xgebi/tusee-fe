import type dayjs from 'dayjs';
import Fetch from '@/utils/Fetch';
import type { IReceivedTask, ITask } from '@/interfaces/ITask';
import { useUserStore } from '@/stores/user';
import type { IReceivedNote } from '@/interfaces/INote';

class NoteRepository {
  public static async getNotes(): Promise<IReceivedNote[]> {
    const response = await Fetch.get('notes');
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.notes as IReceivedNote[];
    }
    throw new Error();
  }

  public static async fetchNote(noteUuid: string): Promise<IReceivedNote> {
    const response = await Fetch.get(`note/${noteUuid}`);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.note as IReceivedNote;
    }
    throw new Error();
  }

  public static async createNote(task: IReceivedNote): Promise<IReceivedNote> {
    const response = await Fetch.post('note', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.note as IReceivedNote;
    }
    throw new Error();
  }

  public static async updateNote(task: IReceivedNote): Promise<IReceivedNote> {
    const response = await Fetch.put('note', task);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.note as IReceivedNote;
    }
    throw new Error();
  }

  public static async deleteNote(noteUuid: string): Promise<string> {
    const response = await Fetch.delete(`note/${noteUuid}`);
    if (response.ok) {
      const result = await response.json();
      const userStore = useUserStore();
      userStore.updateToken(result.token);
      return result.note as string;
    }
    throw new Error();
  }
}

export default NoteRepository;
