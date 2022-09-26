import { Mask } from '../structures/mask';
export declare class MaskHelper {
    private _bodyMaskId?;
    private _uniqueMaskId?;
    private _defaultMaskCssSelector;
    showBodyMask(config?: Mask): void;
    hideBodyMask(config?: Mask): void;
    updateBodyMaskCaption(maskId: string, caption: string): void;
}
