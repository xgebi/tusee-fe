import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { useUserStore } from '@/stores/user';
import type { INote, IReceivedNote, ITransmittedNote } from '@/interfaces/INote';
import NoteRepository from '@/repositories/Note.repository';
import { Temporal } from 'temporal-polyfill';

class NoteService {
  public static async getNotes(): Promise<INote[]> {
    const notes: IReceivedNote[] = await NoteRepository.getNotes();
    const resultingNotes: INote[] = [];
    for (const note of notes) {
      const normNote = this.normalizeNoteForFe(note);
      resultingNotes.push(this.decryptNote(normNote));
    }
    return resultingNotes;
  }

  public static async fetchNote(noteUuid: string): Promise<INote> {
    const note: IReceivedNote = await NoteRepository.fetchNote(noteUuid);
    const normNote = this.normalizeNoteForFe(note);
    return this.decryptNote(normNote);
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
      updated: note.updated
        ? Temporal.Instant.fromEpochMilliseconds(
            Number(note.updated)
          ).toZonedDateTimeISO('Europe/Prague')
        : undefined,
      created: note.created
        ? Temporal.Instant.fromEpochMilliseconds(
            Number(note.created)
          ).toZonedDateTimeISO('Europe/Prague')
        : undefined,
    };
  }

  static normalizeNoteForBe(note: INote): ITransmittedNote {
    return {
      note: note.note,
      note_uuid: note.noteUuid,
      title: note.title,
      user_uuid: note.userUuid,
      updated: note.updated?.toString(),
      created: note.created?.toString(),
    };
  }
}
export default NoteService;
