import { Guid } from './structures/guid';
export interface CanEditRequest {
    schemaName: string;
    primaryColumnValue?: Guid;
    isNew?: boolean;
}
export declare enum SchemaOperationRightLevel {
    None = 0,
    CanRead = 1,
    CanAppend = 2,
    CanEdit = 4,
    CanDelete = 8
}
export declare class SchemaOperationRightPromise implements Promise<SchemaOperationRightLevel> {
    private promise;
    constructor(promise: Promise<SchemaOperationRightLevel>);
    then<TResult1 = SchemaOperationRightLevel, TResult2 = never>(onfulfilled?: ((value: SchemaOperationRightLevel) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<SchemaOperationRightLevel | TResult>;
    finally(onfinally?: (() => void) | null | undefined): Promise<SchemaOperationRightLevel>;
    [Symbol.toStringTag]: string;
    canRead(): Promise<boolean>;
    canAppend(): Promise<boolean>;
    canEdit(): Promise<boolean>;
    canDelete(): Promise<boolean>;
    private canDo;
}
export declare const getSchemaOperationRightLevel: (schemaName: string) => SchemaOperationRightPromise;
export declare const canEdit: (request: CanEditRequest, throwOnError?: boolean) => Promise<boolean>;
export declare const getContactRoles: (contactId: Guid | string) => Promise<Array<Guid>>;
export declare const canExecuteOperation: (operation: string) => Promise<boolean>;
