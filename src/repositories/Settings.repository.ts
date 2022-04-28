import type ISettings from '@/interfaces/ISettings';
import Fetch from '@/utils/Fetch';
import type {
  ISettingsItem,
  ISettingsResponse,
} from '@/interfaces/ISettingsResponse';

class SettingsRepository {
  public static async getSettings(): Promise<ISettingsItem[]> {
    const response = await Fetch.get('app-settings');
    if (response.ok) {
      const result = await response.json();
      return result as ISettingsItem[];
    }
    throw new Error();
  }
}

export default SettingsRepository;
