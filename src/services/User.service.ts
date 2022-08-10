import AES from 'crypto-js/aes';
import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type { IReceivedUserToken, IUserToken } from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import type { IKey } from '@/interfaces/IKey';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';
import { useUserStore } from '@/stores/user';
import KeyService from '@/services/Key.service';
import type { IBoard } from '@/interfaces/IBoard';
import BoardsService from '@/services/Boards.service';
import { useBoardsStore } from '@/stores/boards';
import dayjs from 'dayjs';
import CryptoJS from 'crypto-js';

class UserService {
  static normalizeUserTokenForFe(token: IReceivedUserToken): IUserToken {
    return {
      automaticLogoutTime: dayjs(token.automatic_logout_time),
      displayName: token.display_name,
      email: token.email,
      firstLogin: token.first_login,
      keys: token.keys.map((key) => KeyService.normalizeKeysForFe(key)),
      password: token.password,
      token: token.token,
      totpSecret: token.totp_secret,
      userUuid: token.user_uuid,
      usesTotp: token.uses_totp,
      boards: token.boards.map((board) =>
        BoardsService.normalizeBoardForFe(board)
      ),
    };
  }

  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const resultLogin: IReceivedUserToken = await UserRepository.login(info);
    const loginResult = {
      ...this.normalizeUserTokenForFe(resultLogin),
      password: info.password,
    };
    if (resultLogin.keys.length > 0) {
      loginResult.keys = this.decryptKeys(info.password, loginResult.keys);
    }
    if (loginResult.boards?.length > 0) {
      const boardStore = useBoardsStore();
      boardStore.setBoards(
        this.decryptBoards(loginResult.boards as IBoard[], loginResult.keys)
      );
    }
    loginResult.displayName = this.decryptAdditionalInformation(
      loginResult.displayName,
      loginResult.keys
    );
    return loginResult;
  }

  private static decryptAdditionalInformation(
    toDecrypt: string,
    keys: IKey[]
  ): string {
    const key = keys.filter((key) => !key.board);
    if (key.length > 0) {
      return AES.decrypt(toDecrypt, key[0].key).toString(CryptoJS.enc.Utf8);
    }
    return '';
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
