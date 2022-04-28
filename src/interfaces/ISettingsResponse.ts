interface ISettingsItem {
  settingsName: string;
  displayName: string;
  settingsValueType: string;
  settingsValue: string;
}
interface ISettingsResponse {
  settings: ISettingsItem[];
}

export { type ISettingsResponse, type ISettingsItem };
