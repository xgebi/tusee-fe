import type dayjs from 'dayjs';

export interface IEvent {
  eventUuid: string;
  userUuid: string;
  eventName: string;
  description: string;
  startTimedate?: Date;
  endTimedate?: Date;
};

export interface IReceivedEvent {
  event_uuid: string;
  user_uuid: string;
  event_name: string;
  description: string;
  start_timedate: Date;
  end_timedate: Date;
}