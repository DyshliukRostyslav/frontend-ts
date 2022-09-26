import { DialogButtons } from '../types/dialog';

export const showModalBox = (message: string, handler?: () => void): void => {
  window.Terrasoft.showInformation(message, handler, this);
};

export const showConfirmationModalBox = (message: string, buttons: Array<DialogButtons>)
: Promise<DialogButtons> => new Promise(resolve => {
  window.Terrasoft.utils.showConfirmation(message, resolve, buttons);
});
