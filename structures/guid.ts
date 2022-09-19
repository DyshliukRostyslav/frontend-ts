export class Guid {
  private value: string;

  public constructor(str: string) {
    if (!this.testGuid(str)) {
      throw new Error("Inappropriate value of guid");
    }
    this.value = str;
  }

  public toString(): string {
    return this.value;
  }

  private testGuid(str: string): boolean {
    return /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(str);
  }
}

export const guid = (value: string): Guid => {
  return new Guid(value);
}
