import { EntitySchemaQuery } from './db/esq';
import { Guid } from './structures/guid';
import { post } from './http/http';

export interface CanEditRequest {
  schemaName: string
  primaryColumnValue?: Guid
  isNew?: boolean
}

export enum SchemaOperationRightLevel {
  None = 0,
  CanRead = 1,
  CanAppend = 2,
  CanEdit = 4,
  CanDelete = 8
}

export class SchemaOperationRightPromise implements Promise<SchemaOperationRightLevel> {
  public constructor(private promise: Promise<SchemaOperationRightLevel>) {}

  public then<TResult1 = SchemaOperationRightLevel, TResult2 = never>(
    onfulfilled?: ((value: SchemaOperationRightLevel) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined)
    : Promise<SchemaOperationRightLevel | TResult> {
    return this.promise.catch(onrejected);
  }

  public finally(onfinally?: (() => void) | null | undefined): Promise<SchemaOperationRightLevel> {
    return this.promise.finally(onfinally);
  }

  public [Symbol.toStringTag]: string;

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
        resolve((doLevel & level) === doLevel);
      });
    });
  }
}

const schemaOperationCache = {};
export const getSchemaOperationRightLevel = (schemaName: string): SchemaOperationRightPromise => {
  const resolver = async(): Promise<SchemaOperationRightLevel> => {
    const cacheValue = schemaOperationCache[schemaName];
    if (cacheValue !== undefined && cacheValue !== null) {
      return cacheValue;
    }

    const response = await post('rest/RightsService/GetSchemaOperationRightLevel', {
      schemaName
    }, {
      isAbsolute: true
    });

    const result = response.data.GetSchemaOperationRightLevelResult as SchemaOperationRightLevel;

    schemaOperationCache[schemaName] = result;

    return result;
  };

  return new SchemaOperationRightPromise(resolver());
};

export const canEdit = async(request: CanEditRequest, throwOnError = false): Promise<boolean> => {
  const response = await post('rest/RightsService/GetCanEdit', request, {
    isAbsolute: true
  });

  const result = response.data.GetCanEditResult === '';

  if (!result && !throwOnError) {
    throw new Error(response.data.GetCanEditResult);
  }

  return result;
};

export const getContactRoles = async(contactId: Guid | string): Promise<Array<Guid>> => {
  const select = new EntitySchemaQuery({
    rootSchemaName: 'SysUserInRole'
  });

  select.addColumn('SysRole');
  select.filters.addEqualsFilter('SysUser.Contact', contactId);

  const result = await select.query();
  return result.collection.collection.items.map(x => x.$SysRole.value);
};

const canExecuteOperationCache = {};
export const canExecuteOperation = async(operation: string): Promise<boolean> => {
  let result = canExecuteOperationCache[operation];
  if (result !== null && result !== undefined) {
    return result;
  }

  const response = await post('rest/RightsService/GetCanExecuteOperation', {
    operation: operation
  }, {
    isAbsolute: true
  });

  result = response.data.GetCanExecuteOperationResult;
  canExecuteOperationCache[operation] = response.data.GetCanExecuteOperationResult;

  return result;
};
