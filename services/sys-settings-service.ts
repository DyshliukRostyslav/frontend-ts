import { Service } from "typedi";

@Service()
export class SysSettingsService {
  private sysSettings: any;

  public constructor() {
    this.sysSettings = window.Terrasoft.SysSettings;
  }

  public querySysSetting(code: string) {
    return new Promise(
      resolve => this.sysSettings.querySysSetting(
        [code], resolve, this, null, true));
  }

  public querySysSettings(codes: Array<string>) {
    return new Promise(resolve => this.sysSettings.querySysSetting(
      codes, resolve, this, null, false));
  }
}
