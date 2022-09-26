import { Sandbox } from '../interfaces/sandbox';
import { OpenCardInChainConfig, OpenMiniPageConfig, SetOptions, ValuePair } from './models/ui';
import { getLocalizedImage, getLocalizedString, methods } from './class-utils';
import { Attributes } from '../attributes';
import { Guid } from '../structures/guid';

export abstract class BaseSection {
  public attributes: Attributes;

  protected Ext: any;
  protected Terrasoft: any;
  protected sandbox: Sandbox;
  protected AddRecordButtonTag: Guid | undefined;
  protected entitySchemaName: string;

  protected callBase: (args: any) => any;
  protected getBaseMethod: (scope?: any, args?: any) => Function;
  protected get: (key: string) => any;
  protected set: (key: string, value: any, options?: SetOptions) => any;
  protected showBodyMask: () => void;
  protected hideBodyMask: () => void;
  protected reloadGridData: () => void;
  protected checkEditPagesCount: () => boolean;
  protected getEditPageSchemaName: (typeUId: Guid) => string | undefined;
  protected hasAddMiniPage: (typeUId: Guid) => boolean;
  protected openAddMiniPage: (config: OpenMiniPageConfig) => void;
  protected openMiniPage: (config: OpenMiniPageConfig) => void;
  protected getAddMiniPageDefaultValues: (typeColumnValue?: Guid) => Array<ValuePair>;
  protected openCardInChain: (config: OpenCardInChainConfig) => void;
  protected getEditPagesCollectionByName: (entitySchemaName: string) => any;
  protected getPagesItems: () => Array<any>;

  public methods(): any {
    const classMethods = methods.call(this);
    return Object.assign(classMethods, {
      getMethodOwnerClass: () => BaseSection,
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
