import { Sandbox } from "interfaces/sandbox";
import { CardState, SetOptions, SaveConfig } from "./models/ui";
import { methods } from "./class-utils";
import { Guid } from "structures/guid";

export abstract class BasePage {
  protected Ext: any = window.Ext;
  protected sandbox: Sandbox

  protected callBase: (args: any) => any;
  protected getBaseMethod: (scope?: any, args?: any) => Function;
  protected get: (key: string) => any;
  protected addColumnValidator: (column: string, callback: Function) => void;
  protected set: (key: string, value: any, options?: SetOptions) => any;
  protected reloadEntity: () => void
  protected save: (config: SaveConfig) => void
  protected isAddMode: () => boolean
  protected isEditMode: () => boolean
  protected isCopyMode: () => boolean
  protected isNewMode: () => boolean

  protected $PrimaryColumnValue: Guid
  protected $Operation: CardState
  protected $IsModelItemsEnabled: boolean

  public methods(): any {
    let classMethods = methods.call(this)
    classMethods.getMethodOwnerClass = function () {
      return BasePage;
    };
    return Object.assign(classMethods, {
      saveAsync: this.saveAsync
    });
  }

  public saveAsync(isSilent: boolean): Promise<void> {
    return new Promise(resolve => this.save({
      isSilent,
      callback: resolve,
      scope: this
    }));
  }
}