import { Sandbox } from '../interfaces/sandbox';
import { ButtonMenuItemConfig, DetailChangedArgs, OpenLookupConfig, SetOptions } from './models/ui';
import { getLocalizedImage, getLocalizedString, methods } from './class-utils';
import { Guid } from '../structures/guid';
import { Attributes } from '../attributes';

export abstract class BaseDetail {
  public attributes: Attributes;

  protected Ext: any;
  protected Terrasoft: any;
  protected sandbox: Sandbox;
  protected entitySchemaName: string;
  protected $MasterRecordId: string | Guid;
  protected $IsEnabled: boolean;

  protected callBase: (args: any) => any;
  protected getBaseMethod: (scope?: any, args?: any) => Function;
  protected get: (key: string) => any;
  protected set: (key: string, value: any, options?: SetOptions) => any;
  protected editCurrentRecord: () => void;
  protected getToolsVisible: () => boolean;
  protected openLookup: (config: OpenLookupConfig, callback: Function, scope: any) => void;
  protected getButtonMenuItem: (config: ButtonMenuItemConfig) => any;
  protected getButtonMenuSeparator: (config?: ButtonMenuItemConfig) => any;
  protected getIsCardValid: () => boolean;
  protected showBodyMask: () => void;
  protected hideBodyMask: () => void;
  protected reloadGridData: () => void;
  protected getFirstEditPageUId: () => string | Guid | null;
  protected getIsCardNewRecordState: () => boolean;
  protected getIsCardChanged: () => boolean;
  protected openCardByMode: () => void;
  protected fireDetailChanged: (args: DetailChangedArgs) => void;
  protected showInformationDialog: (message: string) => void;
  protected isSingleSelected: () => boolean;
  protected getActiveRow: (primaryColumnValue?: Guid) => any;

  public methods(): any {
    const classMethods = methods.call(this);
    return Object.assign(classMethods, {
      getMethodOwnerClass: () => BaseDetail,
      getLocalizedString: this.getLocalizedString,
      getLocalizedImage: this.getLocalizedImage
    });
  }

  protected getLocalizedString(key: string): string {
    return getLocalizedString.call(this, key);
  }

  protected getLocalizedImage(key: string): any {
    return getLocalizedImage.call(this, key);
  }
}
