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
import type IBoard from '@/interfaces/IBoard';
import BoardsService from '@/services/Boards.service';
import { useBoardsStore } from '@/stores/boards';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const result_login = await UserRepository.login(info);
    result_login.keys = this.decryptKeys(info.password, result_login.keys);
    const boardStore = useBoardsStore();
    boardStore.setBoards(
      this.decryptBoards(result_login.boards as IBoard[], result_login.keys)
    );
    return result_login;
  }

  private static decryptKeys(password: string, keys: IKey[]): IKey[] {
    return keys.map((key) => KeyService.decryptKey(key, password));
  }

  private static decryptBoards(boards: IBoard[], keys: IKey[]): IBoard[] {
    return boards.map((board) => BoardsService.decryptBoard(board, keys));
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
