import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type IUserToken from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import type IKey from '@/interfaces/IKey';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';
import { useUserStore } from '@/stores/user';
import KeyService from '@/services/Key.service';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const result_login = await UserRepository.login(info);
    this.decryptKeys(info.password, result_login.keys);
    return result_login;
  }

  private static decryptKeys(password: string, keys: IKey[]) {
    for (const key of keys) {
      key.key = AES.decrypt(key.key, password).toString(CryptoJS.enc.Utf8);
    }
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    const rawKey = KeyService.generateKey();
    info.key = AES.encrypt(rawKey, info.password).toString();
    info.displayName = AES.encrypt(info.displayName, rawKey).toString();
    return await UserRepository.register(info);
  }

  public static async confirmTotp(totpCode: string): Promise<IKey[]> {
    const result = await UserRepository.confirmTotp({
      totpCode,
    });
    const user = useUserStore();
    user.updateToken(result.token);
    this.decryptKeys(user.token.password, result.keys);
    return result.keys;
  }

  public static async setupTotp(totpCode: string): Promise<ITotpSetupResponse> {
    const result = await UserRepository.setupTotp({
      skip: false,
      totpCode: totpCode,
    });
    const user = useUserStore();
    user.updateToken(result.token);
    this.decryptKeys(user.token.password, result.keys);
    return result;
  }

  public static async skipTotp(): Promise<ITotpSetupResponse> {
    const result = await UserRepository.setupTotp({
      skip: true,
      totpCode: '',
    });
    const user = useUserStore();
    user.updateToken(result.token);
    this.decryptKeys(user.token.password, result.keys);
    return result;
  }
}

export default UserService;
