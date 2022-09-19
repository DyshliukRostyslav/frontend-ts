// @ts-ignore
export async function requireAsync(schemas: Array<string>): Promise<any> {
  // @ts-ignore
  return new Promise(resolve => window.Terrasoft.require(schemas, resolve, this));
}
