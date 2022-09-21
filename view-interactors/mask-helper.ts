import { Mask } from "../structures/mask";
import { Service } from "typedi";

@Service()
export class MaskHelper {
  private _bodyMaskId?: string = undefined;
  private _uniqueMaskId?: string = undefined;
  private _defaultMaskCssSelector = "body";

  public showBodyMask(config?: Mask): void {
    if (this._uniqueMaskId) {
      return;
    }
    this._uniqueMaskId = config?.uniqueMaskId;
    const maskId = window.Terrasoft.Mask.show(config);
    this._bodyMaskId = maskId || this._bodyMaskId;
  }

  public hideBodyMask(config?: Mask): void {
    if (this._uniqueMaskId && !(config && config.uniqueMaskId === this._uniqueMaskId)) {
      return;
    }
    this._uniqueMaskId = undefined;
    let maskSelector = this._defaultMaskCssSelector;
    if (config) {
      if (config.maskId) {
        window.Terrasoft.Mask.hide(config.maskId);
      }
      maskSelector = config?.selector;
    } else if (!this._bodyMaskId) {
      window.Terrasoft.Mask.hide(this._bodyMaskId);
    }
    window.Terrasoft.Mask.clearMasks(maskSelector);
  }

  public updateBodyMaskCaption(
    maskId: string, caption: string
  ): void {
    window.Terrasoft.Mask.updateCaption(
      maskId,
      caption
    );
  }
}
