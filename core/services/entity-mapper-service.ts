export default class EntityMapperService {
  public static map<TEntity>(object: any): TEntity {
    if (!object) {
      return object;
    }

    const entity = object as TEntity;

    const linkedProps = Object.getOwnPropertyNames(object).filter(x => x.includes('.'));
    linkedProps.forEach(prop => {
      this.mapProp(entity, prop.split('.'), object[prop]);
      delete object[prop];
    });

    return entity;
  }

  private static mapProp(object: any, path: Array<string>, value: any): void {
    const column = path[0];

    if (path.length === 1) {
      object[column] = value;
      return;
    }

    if (path.length === 2 && path[1] === 'Id') {
      object[`${column}Id`] = value;
    }

    if (path.length > 1) {
      if (!object.hasOwnProperty(column)) {
        object[column] = {};
      }
      this.mapProp(object[column], path.slice(1), value);
    }
  }
}
