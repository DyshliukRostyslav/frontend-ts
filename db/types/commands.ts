interface SelectColumn {
  alias?: string
}

interface WhereCondition<TColumnType> {
  equals?: TColumnType
  notEquals?: TColumnType
  in?: Array<TColumnType>
  notIn?: Array<TColumnType>
  gt?: number
  gte?: number
  lt?: number
  lte?: number
  contains?: TColumnType
  startsWith?: TColumnType
  endsWith?: TColumnType
}

interface GroupWhere<TWhere> {
  OR?: Array<TWhere> | Array<GroupWhere<TWhere>>
  AND?: Array<TWhere> | Array<GroupWhere<TWhere>>
}

type Order = "asc" | "desc";
