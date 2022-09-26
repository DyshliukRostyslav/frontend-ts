import { requireAsync } from '../require';
import { Guid } from '../structures/guid';
import { post } from '../http/http';

const entitySchemasCache = {};

export const getEntitySchema = async(schemaName: string): Promise<any> =>
  entitySchemasCache[schemaName] ?? (entitySchemasCache[schemaName] = await requireAsync([schemaName]));

export const isLookupColumn = (column: string, schema: any): boolean => {
  if (column && column !== 'Id' && column.endsWith('Id')) {
    const primaryColumnName = column.substring(0, column.length - 2);
    if (schema.columns.hasOwnProperty(primaryColumnName)) {
      return true;
    }
  }
  return false;
};

export const isValidColumnPath = async(schemaUId: string | Guid, columnPath: string): Promise<boolean> => {
  const response = await post('DataService/json/SyncReply/SchemaDesignerRequest', {
    getSchemaColumnInformation: {
      entitySchemaUId: schemaUId,
      schemaColumnPath: columnPath
    }
  }, {
    isAbsolute: true
  });
  return response.success && response.data.success;
};
