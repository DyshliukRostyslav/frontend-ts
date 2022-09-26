export function requireAsync(schemas: Array<string>): Promise<any> {
  return new Promise(resolve => window.Terrasoft.require(schemas, resolve, this));
}
