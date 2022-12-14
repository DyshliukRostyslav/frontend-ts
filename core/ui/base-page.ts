import { Sandbox } from '../interfaces/sandbox';
import {
  CardState,
  SetOptions,
  SaveConfig,
  UpdateDetailConfig,
  ButtonMenuItemConfig,
  OpenLookupConfig,
  ValidateColumnOption
} from './models/ui';
import { getLocalizedImage, getLocalizedString, methods } from './class-utils';
import { Guid } from '../structures/guid';
import { Attributes } from '../attributes';

export abstract class BasePage {
  public attributes: Attributes;

  protected Ext: any;
  protected sandbox: Sandbox;
  protected Terrasoft: any;
  protected $PrimaryColumnValue: Guid;
  protected $Operation: CardState;
  protected $IsModelItemsEnabled: boolean;
  protected $IsEntityInitialized: boolean;
  protected changedValues: any;

  protected callBase: (args: any) => any;
  protected getBaseMethod: (scope?: any, args?: any) => Function;
  protected get: (key: string) => any;
  protected addColumnValidator: (column: string, callback: Function) => void;
  protected set: (key: string, value: any, options?: SetOptions) => any;
  protected reloadEntity: () => void;
  protected save: (config: SaveConfig) => void;
  protected isAddMode: () => boolean;
  protected isEditMode: () => boolean;
  protected isCopyMode: () => boolean;
  protected isNewMode: () => boolean;
  protected loadLookupDisplayValueAsync: (name: string, value: any) => Promise<void>;
  protected showBodyMask: () => void;
  protected hideBodyMask: () => void;
  protected showInformationDialog: (message: string) => void;
  protected getPrimaryColumnValue: () => Guid | string;
  protected updateDetail: (detailConfig: UpdateDetailConfig) => void;
  protected getDetailId: (detailName: string) => string;
  protected getButtonMenuItem: (config: ButtonMenuItemConfig) => any;
  protected getButtonMenuSeparator: (config?: ButtonMenuItemConfig) => any;
  protected publishPropertyValueToSection: (key: string, value: any) => void;
  protected setActiveTab: (name: string) => void;
  protected openLookup: (config: OpenLookupConfig, callback: Function, scope: any) => void;
  protected validateColumn: (columnName: string, options?: ValidateColumnOption) => void;

  public methods(): any {
    const classMethods = methods.call(this);
    return Object.assign(classMethods, {
      saveAsync: this.saveAsync,
      getMethodOwnerClass: () => BasePage,
      getLocalizedString: this.getLocalizedString,
      getLocalizedImage: this.getLocalizedImage
    });
  }

  protected saveAsync(isSilent: boolean): Promise<void> {
    return new Promise(resolve => this.save({
      isSilent,
      callback: resolve,
      scope: this
    }));
  }

  protected getLocalizedString(key: string): string {
    return getLocalizedString.call(this, key);
  }

  protected getLocalizedImage(key: string): any {
    return getLocalizedImage(key).call(this, key);
  }
}
