interface Insert<TEntity> {
  data: TEntity
}

interface Update<TEntity, TWhere> {
  data: TEntity
  where?: TWhere | GroupWhere<TWhere>
}

interface Select<TSelect, TWhere, TOrder> {
  select?: TSelect
  where?: TWhere | GroupWhere<TWhere>
  cache?: string
  orderBy?: TOrder
  skip?: number
  take?: number
  softDelete?: boolean
}

interface Delete<TWhere> {
  where?: TWhere | GroupWhere<TWhere>
}

interface Aggregate<TSelect, TWhere> {
  count?: TSelect
  sum?: TSelect
  avg?: TSelect
  min?: TSelect
  max?: TSelect
  where?: TWhere
}
