import type ISettings from '@/interfaces/ISettings';
import SettingsRepository from '@/repositories/Settings.repository';

class SettingsService {
  public static async getSettings(): Promise<ISettings> {
    return await SettingsRepository.getSettings();
  }
}

export default SettingsService;
