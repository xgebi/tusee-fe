export interface ISettingsItem {
  settingsName: string;
  displayName: string;
  settingsValueType: string;
  settingsValue: string;
}

export interface IReceivedSettingsItem {
  settings_name: string;
  display_name: string;
  settings_value_type: string;
  settings_value: string;
}

export interface ISettingsResponse {
  settings: ISettingsItem[];
}

export interface IReceivedSettingsResponse {
  settings: ISettingsItem[];
}
