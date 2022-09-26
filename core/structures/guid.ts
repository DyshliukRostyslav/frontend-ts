import { v4 as uuidv4 } from 'uuid';

export class Guid {
  private readonly value: string;

  public static empty: Guid = new Guid('00000000-0000-0000-0000-000000000000');

  public constructor(str: string) {
    if (!Guid.testGuid(str)) {
      throw new Error('Inappropriate value of guid');
    }
    this.value = str;
  }

  public toString(): string {
    return this.value;
  }

  private static testGuid(str: string): boolean {
    return /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(str);
  }
}

export const guid = (value: string): Guid => new Guid(value);

export const newGuid = (): Guid => new Guid(uuidv4());
