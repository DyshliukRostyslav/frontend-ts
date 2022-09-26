export declare class Guid {
    private readonly value;
    static empty: Guid;
    constructor(str: string);
    toString(): string;
    private static testGuid;
}
export declare const guid: (value: string) => Guid;
export declare const newGuid: () => Guid;
