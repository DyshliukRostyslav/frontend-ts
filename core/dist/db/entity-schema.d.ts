import { Guid } from '../structures/guid';
export declare const getEntitySchema: (schemaName: string) => Promise<any>;
export declare const isLookupColumn: (column: string, schema: any) => boolean;
export declare const isValidColumnPath: (schemaUId: string | Guid, columnPath: string) => Promise<boolean>;
