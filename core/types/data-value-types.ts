export enum DataValueType {
  GUID = 0,
  TEXT = 1,
  INTEGER = 4,
  FLOAT = 5,
  MONEY = 6,
  DATE_TIME = 7,
  DATE = 8,
  TIME = 9,
  LOOKUP = 10,
  ENUM = 11,
  BOOLEAN = 12,
  BLOB = 13,
  IMAGE = 14,
  CUSTOM_OBJECT = 15,
  IMAGELOOKUP = 16,
  COLLECTION = 17,
  COLOR = 18,
  LOCALIZABLE_STRING = 19,
  ENTITY = 20,
  ENTITY_COLLECTION = 21,
  ENTITY_COLUMN_MAPPING_COLLECTION = 22,
  HASH_TEXT = 23,
  SECURE_TEXT = 24,
  FILE = 25,
  MAPPING = 26,
  MEDIUM_TEXT = 28,
  SHORT_TEXT = 27,
  MAXSIZE_TEXT = 29,
  LONG_TEXT = 30,
  FLOAT1 = 31,
  FLOAT2 = 32,
  FLOAT3 = 33,
  FLOAT4 = 34,
  LOCALIZABLE_PARAMETER_VALUES_LIST = 35,
  METADATA_TEXT = 36,
  STAGE_INDICATOR = 37,
  OBJECT_LIST = 38,
  COMPOSITE_OBJECT_LIST = 39,
  FLOAT8 = 40,
  FILE_LOCATOR = 41
}

export const isLookupDataValueType = (dataValueType: DataValueType) => dataValueType === DataValueType.LOOKUP || dataValueType === DataValueType.ENUM;

export const isDateDataValueType = (dataValueType: DataValueType): boolean => dataValueType === DataValueType.DATE ||
  dataValueType === DataValueType.DATE_TIME ||
  dataValueType === DataValueType.TIME;
