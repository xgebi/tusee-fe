import type dayjs from 'dayjs';

interface IUserToken {
  username: string;
  keys: string[];
  expiryTime: dayjs.Dayjs;
}

export default IUserToken;