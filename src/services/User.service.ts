import { v4 as uuidv4 } from 'uuid';
import AES from 'crypto-js/aes';

import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type IUserToken from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return UserRepository.login(info);
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    info.key = AES.encrypt(uuidv4().toString(), info.password).toString();
    info.displayName = AES.encrypt(info.displayName, info.key).toString();
    return UserRepository.register(info);
  }

  public static async confirmTotp(
    token: string,
    totpCode: string
  ): Promise<boolean> {
    return await UserRepository.confirmTotp(token, totpCode);
  }
}

export default UserService;
