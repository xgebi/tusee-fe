import { v4 as uuidv4 } from 'uuid';
import AES from 'crypto-js/aes';

import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type IUserToken from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import type IKey from '@/interfaces/IKey';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return await UserRepository.login(info);
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    info.key = AES.encrypt(uuidv4().toString(), info.password).toString();
    info.displayName = AES.encrypt(info.displayName, info.key).toString();
    return await UserRepository.register(info);
  }

  public static async confirmTotp(totpCode: string): Promise<IKey[]> {
    return await UserRepository.confirmTotp({
      totpCode,
    });
  }

  public static async setupTotp(totpCode: string): Promise<ITotpSetupResponse> {
    return await UserRepository.setupTotp({
      skip: false,
      totpCode: totpCode,
    });
  }

  public static async skipTotp(): Promise<ITotpSetupResponse> {
    return await UserRepository.setupTotp({
      skip: true,
      totpCode: '',
    });
  }
}

export default UserService;
