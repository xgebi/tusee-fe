import type { IKey, IReceivedKey } from '@/interfaces/IKey';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

class KeyService {
  public static normalizeKeysForFe(key: IReceivedKey): IKey {
    return { board: key.board, key: key.key, keyUuid: key.key_uuid, tuseeUser: key.tusee_user };
  }
  public static generateKey(length = 20): string {
    const keys = {
      upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCase: 'abcdefghijklmnopqrstuvwxyz',
      number: '0123456789',
      symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };
    const getKey = [
      function upperCase() {
        return keys.upperCase[
          Math.floor(Math.random() * keys.upperCase.length)
        ];
      },
      function lowerCase() {
        return keys.lowerCase[
          Math.floor(Math.random() * keys.lowerCase.length)
        ];
      },
      function number() {
        return keys.number[Math.floor(Math.random() * keys.number.length)];
      },
      function symbol() {
        return keys.symbol[Math.floor(Math.random() * keys.symbol.length)];
      },
    ];

    let password = '';
    while (length > password.length) {
      password += getKey[Math.floor(Math.random() * getKey.length)]();
    }

    return password;
  }

  public static encryptKey(key: IKey, password: string): IKey {
    return {
      ...key,
      key: AES.encrypt(key.key, password).toString(),
    };
  }

  public static decryptKey(key: IKey, password: string): IKey {
    return {
      ...key,
      key: AES.decrypt(key.key, password).toString(CryptoJS.enc.Utf8),
    };
  }
}

export default KeyService;
