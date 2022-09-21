import { Guid } from "../structures/guid";

export type CanEditRequest = {
  schemaName: string
  primaryColumnValue: Guid
  isNew: boolean
};

export enum SchemaOperationRightLevel {
  None = 0,
  CanRead = 1,
  CanAppend = 2,
  CanEdit = 4,
  CanDelete = 8
}

export class SchemaOperationRightPromise implements Promise<SchemaOperationRightLevel> {
  constructor(private promise: Promise<SchemaOperationRightLevel>) {}
  
  then<TResult1 = SchemaOperationRightLevel, TResult2 = never>(onfulfilled?: ((value: SchemaOperationRightLevel) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled);
  }
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<SchemaOperationRightLevel | TResult> {
    return this.promise.catch(onrejected);
  }
  finally(onfinally?: (() => void) | null | undefined): Promise<SchemaOperationRightLevel> {
    return this.promise.finally(onfinally);
  }
  [Symbol.toStringTag]: string;

  public canRead(): Promise<boolean> {
    return this.canDo(SchemaOperationRightLevel.CanRead);
  }

  public canAppend(): Promise<boolean> {
    return this.canDo(SchemaOperationRightLevel.CanAppend);
  }

  public canEdit(): Promise<boolean> {
    return this.canDo(SchemaOperationRightLevel.CanEdit);
  }

  public canDelete(): Promise<boolean> {
    return this.canDo(SchemaOperationRightLevel.CanDelete);
  }

  private canDo(doLevel: SchemaOperationRightLevel): Promise<boolean> {
    return new Promise(resolve => {
      this.promise.then((level: SchemaOperationRightLevel) => {
        resolve(((doLevel & level) === doLevel));
      });
    });
  }
}
