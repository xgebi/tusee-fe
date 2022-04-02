import type ILoginInfo from '../interfaces/ILoginInfo';
import type IUserToken from '../interfaces/IUserToken';
import dayjs from 'dayjs';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import Fetch from '@/utils/Fetch';
import AES from 'crypto-js/aes';

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return new Promise((resolve, reject) => {
      resolve({
        username: info.username,
        password: info.password,
        keys: [],
        automaticLogoutTime: dayjs().add(30, 'minutes'),
        firstLogin: true,
        mfaEnabled: true,
        encryptedToken: 'abc',
      } as IUserToken);
    });
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    const response = await Fetch.post('register', info);
    const { data, errors } = await response.json();
    if (response.ok) {
      return data as IRegistrationResult;
    }
    throw new Error(errors);
  }

  public static async confirmTotp(
    token: string,
    totpCode: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

export default UserRepository;
