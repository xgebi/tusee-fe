import type ISettings from '@/interfaces/ISettings';
import Fetch from '@/utils/Fetch';
import type { IReceivedSettingsItem } from '@/interfaces/ISettingsResponse';

class SettingsRepository {
  public static async getSettings(): Promise<IReceivedSettingsItem[]> {
    const response = await Fetch.get('app-settings');
    if (response.ok) {
      const result = await response.json();
      return result as IReceivedSettingsItem[];
    }
    throw new Error();
  }
}

export default SettingsRepository;
