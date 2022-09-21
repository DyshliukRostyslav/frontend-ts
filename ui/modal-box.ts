import { DialogButtons } from "../types/dialog";

export const showModalBox = (message: string, handler?: () => void) => {
  window.Terrasoft.showInformation(message, handler, this);
}

export const showConfirmationModalBox = async (message: string, buttons: Array<DialogButtons>): Promise<DialogButtons>  => {
  return new Promise(resolve => {
    window.Terrasoft.utils.showConfirmation(message, resolve, buttons);
  });
}