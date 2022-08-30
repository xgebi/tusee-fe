import TaskRepository from '@/repositories/Task.repository';
import type { IReceivedTask, ITask } from '@/interfaces/ITask';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';
import type { INote, IReceivedNote } from '@/interfaces/INote';
import NoteRepository from '@/repositories/Note.repository';

class NoteService {
  public static async getNotes(): Promise<INote[]> {
    const notes: IReceivedNote[] = await NoteRepository.getNotes();
    const resultingNotes: INote[] = [];
    for (const note of notes) {
      const normNote = this.normalizeNoteForFe(note);
      resultingNotes.push(this.decryptNote(normNote));
    }
    resultingNotes.sort((a, b) => {
      const aDayjs = dayjs(a.updated);
      const bDayjs = dayjs(b.updated);

      if (bDayjs.isBefore(aDayjs)) {
        return 1;
      }
      if (aDayjs.isBefore(bDayjs)) {
        return -1;
      }
      return 0;
    });
    return resultingNotes;
  }

  public static async fetchNote(noteUuid: string): Promise<INote> {
    const note: IReceivedNote = await NoteRepository.fetchNote(noteUuid);
    const normNote = this.normalizeNoteForFe(note);
    const deN = this.decryptNote(normNote);
    console.log(deN);
    return deN;
  }

  public static async createNote(task: INote): Promise<INote> {
    const encryptedNote = this.encryptNote(task);
    const requestNote = this.normalizeNoteForBe(encryptedNote);
    const responseNote: IReceivedNote = await NoteRepository.createNote(
      requestNote
    );
    const normedResponse = this.normalizeNoteForFe(responseNote);
    return this.decryptNote(normedResponse);
  }

  public static async updateNote(note: INote): Promise<INote> {
    const responseNote: IReceivedNote = await NoteRepository.updateNote(
      this.normalizeNoteForBe(this.encryptNote(note))
    );
    return this.decryptNote(this.normalizeNoteForFe(responseNote));
  }

  public static async deleteNote(note: INote): Promise<string> {
    return await NoteRepository.deleteNote(note.noteUuid as string);
  }

  static encryptNote(note: INote): INote {
    const user = useUserStore();
    const key = user.token.keys.filter((item) => !item.board);
    return {
      ...note,
      title: AES.encrypt(note.title, key[0].key).toString(),
      note: AES.encrypt(note.note, key[0].key).toString(),
    };
  }

  static decryptNote(note: INote): INote {
    const user = useUserStore();
    const key = user.token.keys.filter((item) => !item.board);
    return {
      ...note,
      title: AES.decrypt(note.title.toString(), key[0].key).toString(CryptoJS.enc.Utf8),
      note: note.note
        ? AES.decrypt(note.note.toString(), key[0].key).toString(
            CryptoJS.enc.Utf8
          )
        : '',
    };
  }

  static normalizeNoteForFe(note: IReceivedNote): INote {
    return {
      note: note.note,
      noteUuid: note.note_uuid,
      title: note.title,
      userUuid: note.user_uuid,
      updated: note.updated,
      created: note.created,
    };
  }

  static normalizeNoteForBe(note: INote): IReceivedNote {
    return {
      note: note.note,
      note_uuid: note.userUuid,
      title: note.title,
      user_uuid: note.userUuid,
      updated: note.updated,
      created: note.created,
    };
  }
}
export default NoteService;
