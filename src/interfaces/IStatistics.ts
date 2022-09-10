import type dayjs from 'dayjs';

export interface IStatistics {
  statUuid: string;
  statName: string;
  statValue: string;
  statType: string;
  note: string;
  recordedAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
}

export interface IReceivedStatistics {
  stat_uuid: string;
  stat_name: string;
  stat_value: string;
  stat_type: string;
  note: string;
  recorded_at: dayjs.Dayjs;
  updated_at: dayjs.Dayjs;
}