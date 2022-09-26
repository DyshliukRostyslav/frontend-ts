import { DialogButtons } from '../types/dialog';
export declare const showModalBox: (message: string, handler?: () => void) => void;
export declare const showConfirmationModalBox: (message: string, buttons: Array<DialogButtons>) => Promise<DialogButtons>;
