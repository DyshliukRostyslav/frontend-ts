import { CanEditRequest, SchemaOperationRightPromise } from "../types/rights";
import { Service } from "typedi";
import { requireAsync } from "../require";

@Service({ global: true })
export class RightsService {
  private rightsUtilities: any;

  public constructor() {
    requireAsync(["RightUtilities"])
      .then((rightsUtilities) => this.rightsUtilities = rightsUtilities);
  }

  public canEdit(request: CanEditRequest): Promise<boolean> {
    return new Promise(resolve => this.rightsUtilities.checkCanEdit(
      request, response => resolve(response === ""), this));
  }

  public canExecuteOperation(operation: string): Promise<boolean> {
    return new Promise(
      resolve => this.rightsUtilities.checkCanExecuteOperation({
        operation
      }, resolve, this));
  }

  public getSchemaOperationRightLevel(schemaName: string): SchemaOperationRightPromise {
    return new SchemaOperationRightPromise(new Promise(
      resolve => this.rightsUtilities.getSchemaOperationRightLevel(schemaName, resolve, this)));
  }
}
