import { DialogButtons } from "../types/dialog";

export const showModalBox = (message: string, handler?: () => void) => {
  //@ts-ignore
  window.Terrasoft.showInformation(message, handler, this);
}

export const showConfirmationModalBox = async (message: string, buttons: Array<DialogButtons>): Promise<DialogButtons>  => {
  return new Promise(resolve => {
    //@ts-ignore
    window.Terrasoft.utils.showConfirmation(message, resolve, buttons);
  });
}