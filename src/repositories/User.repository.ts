import type ILoginInfo from '../interfaces/ILoginInfo';
import type IUserToken from '../interfaces/IUserToken';
import dayjs from 'dayjs';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import Fetch from '@/utils/Fetch';
import AES from 'crypto-js/aes';

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const response = await Fetch.post('login', info);
    if (response.ok) {
      const result = await response.json();
      return result as IUserToken;
    }
    throw new Error();
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    const response = await Fetch.post('register', info);
    if (response.ok) {
      const result = await response.json();
      return result as IRegistrationResult;
    }
    throw new Error();
  }

  public static async confirmTotp(
    token: string,
    totpCode: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public static async skipTotp(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

export default UserRepository;
