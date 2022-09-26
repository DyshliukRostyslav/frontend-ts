interface SelectColumn {
  alias?: string
}

type InequalityType<TColumnType> = TColumnType extends Date | number ? TColumnType : never

interface WhereCondition<TColumnType> {
  equals?: TColumnType | null
  notEquals?: TColumnType | null
  in?: Array<TColumnType>
  notIn?: Array<TColumnType>
  gt?: InequalityType<TColumnType>
  gte?: InequalityType<TColumnType>
  lt?: InequalityType<TColumnType>
  lte?: InequalityType<TColumnType>
  contains?: TColumnType
  startsWith?: TColumnType
  endsWith?: TColumnType
}

interface GroupWhere<TWhere> {
  OR?: Array<TWhere> | Array<GroupWhere<TWhere>>
  AND?: Array<TWhere> | Array<GroupWhere<TWhere>>
}

type Order = "asc" | "desc";

interface WhereExistsCondition<TRelatedTable, TPrimaryTable, TRelatedWhere> {
  exists?: ExistsCondition<TRelatedTable, TPrimaryTable, TRelatedWhere>
  notExists?: ExistsCondition<TRelatedTable, TPrimaryTable, TRelatedWhere>
}

interface ExistsCondition<TRelatedTable, TPrimaryTable, TRelatedWhere> {
  on: keyof TRelatedTable
  equals?: keyof TPrimaryTable
  where?: TRelatedWhere
}
