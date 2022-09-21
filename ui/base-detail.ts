import { Sandbox } from "../interfaces/sandbox";
import { SetOptions } from "./models/ui";
import { methods } from "./class-utils";
import * as events from "events";


export abstract class BaseDetail {
  protected Ext: any = window.Ext;
  protected sandbox: Sandbox

  protected callBase: (args: any) => any;
  protected getBaseMethod: (scope?: any, args?: any) => any;
  protected get: (key: string) => any;
  protected set: (key: string, value: any, options?: SetOptions) => any;
  protected editCurrentRecord: () => void;

  public methods(): any {
    let classMethods = methods.call(this)
    classMethods.getMethodOwnerClass = function () {
      return BaseDetail;
    };
    return classMethods;
  }
}
