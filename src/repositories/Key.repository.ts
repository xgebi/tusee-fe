import Fetch from '@/utils/Fetch';
import type { IReceivedKey } from '@/interfaces/IKey';

export class KeyRepository {
  public static async importMultipleKeys(
    keys: IReceivedKey[]
  ): Promise<boolean> {
    const response = await Fetch.delete(`keys/import`, keys);
    if (response.ok) {
      return true;
    }
    throw new Error();
  }
}