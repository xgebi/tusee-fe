export interface INote {
  noteUuid: string;
  userUuid: string;
  title: string;
  note: string;
  updated?: Date;
  created?: Date;
}

export interface IReceivedNote {
  note_uuid: string;
  user_uuid: string;
  title: string;
  note: string;
  updated?: Date;
  created?: Date;
}