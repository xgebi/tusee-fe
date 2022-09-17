import type { Temporal } from 'temporal-polyfill';

export interface INote {
  noteUuid: string;
  userUuid: string;
  title: string;
  note: string;
  updated?: Temporal.ZonedDateTime;
  created?: Temporal.ZonedDateTime;
}

export interface IReceivedNote {
  note_uuid: string;
  user_uuid: string;
  title: string;
  note: string;
  updated?: number;
  created?: number;
}

export interface ITransmittedNote {
  note_uuid: string;
  user_uuid: string;
  title: string;
  note: string;
  updated?: string;
  created?: string;
}