// index signature
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html

export const enum Month {
    Jan = 'January'
}

export type MonthFoundsDTO = {
    [key in keyof typeof Month]: number;
}

export abstract class QueryBuilder<EntityModel, FO> {
    constructor(arg: FO) {};
    abstract execute(): Promise<EntityModel[]>;
}

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Class<T = any> = { new (...arg: any[]): T } & Function;
export type Identifiable<T = any> = { id: T };
export type Collection<T> =  T[] | Set<T> | Map<any, T> | { values(): IterableIterator<T> };
export declare type Instance<T extends Function> = T extends Class<infer U> ? U : T['prototype'];

export const enum EventTechnicalStatus {
    active = 'active',
    deleted = 'deleted',
    special = 'special'
}

export type VersionedIdentity = {
    id: string;
    version: number;
}

export type DatesAsString<T extends object> = {
    [key in keyof T]: T[key] extends (Date) ? string
    : T[key] extends (Date | undefined) ? string | undefined
    : T[key] extends (Date | undefined | null) ? string | undefined | null
    : T[key] extends (Optional<Date>) ? Optional<string>
    : T[key] extends (Nullable<Date>) ? Nullable<string>
    : T[key]
};

type MethodKeys<T> = ({[P in keyof T]: T[P] extends Function ? P : never })[keyof T];
type ObjKeys<T> = ({[P in keyof T]: T[P] extends object ? P : never })[keyof T];
type ArrKeys<T> = ({[P in keyof T]: T[P] extends (infer U)[] ? P : never })[keyof T];
type NestedObjKeys<T, U extends Object> = ({[P in keyof T]: T[P] extends U ? P : never })[keyof T];
type SimpleDocumentKeys<T> = ({
    [P in keyof T]: T[P] extends Optional<(number|number[]|string|string[]|boolean|boolean[]|Date|Date[])|null> ? P : never
})[keyof T];

export type ObjectKeys<T extends object> = Pick<T, ObjKeys<T>>;
export type ArrayKeys<T extends object> = Pick<T, ArrKeys<T>>;
export type SimpleKeys<T extends object> = Pick<T, SimpleDocumentKeys<T>>;
export type Attributes<T extends object> = Omit<T, MethodKeys<T>>;
export type NestedObjectKeys<T, U extends Object> = Omit<T, NestedObjKeys<T, U>>;
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

export type RequireAtLeastOne<T, P extends keyof T = keyof T> = Pick<T, Exclude<keyof T, P>>
    & { [K in P]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<P, K>>> }[P];

export type RequireOnlyOne<T, P extends keyof T = keyof T> = Pick<T, Exclude<keyof T, P>>
    & { [K in P]-?: Required<Pick<T, K>> & Partial<Record<Exclude<P, K>, undefined>> }[P];

export type StringArrayAsString<T extends Object> = { [key in keyof T]: T[key] extends string[] | undefined ? string : T[key] };

interface Entity {
    getIdentity(): string | { id: string };
}

export type Identity<T extends object> = T extends Entity ? ReturnType<T['getIdentity']>
    : T extends Identifiable ? T['id'] | ({ id: T['id'] } & Partial<Attributes<T>>)
    : Partial<Attributes<T>>;

export type DefaultIdentity<T> = T extends Entity ? ReturnType<T['getIdentity']> : T extends Identifiable ? T['id'] : Partial<T>;

export const enum JsType {
    Undefined =	"undefined",
    Object = "object",
    Boolean = "boolean",
    Number = "number",
    String = "string",
    Symbol = "symbol",
    Function = "function",
    BigInt = "bigint",
}

export interface MapConstructor {
    new(): Map<any, any>;
    new<K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
    readonly prototype: Map<any, any>;
}

export type Options = {
    [K in "noImplicitAny" | "strictNullChecks" | "strictFunctionTypes"]?: boolean;
};

export type PartialOptions = {
    [K in "noImplicitAny" | "strictNullChecks" | "strictFunctionTypes"]?: boolean;
};
// same as
//   type Options = {
//       noImplicitAny?: boolean,
//       strictNullChecks?: boolean,
//       strictFunctionTypes?: boolean
//   };

type NewKeyType = 'test-name';
// That’s why TypeScript 4.1
export type MappedTypeWithNewKeys<T> = {
    [K in keyof T as NewKeyType]: T[K]
}

export type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

// Remove the 'kind' property
export type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};

type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T;
function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
  throw "not implemented";
}
// All of these return the type 'number[]':
deepFlatten([1, 2, 3]);
deepFlatten([[1], [2, 3]]);
deepFlatten([[1], [[2]], [[[3]]]]);

// protected illegalStatusError(
//     message: string = `Illegal operation for activity budget with status ${this.status}`
// ): never {
//     throw new Error(message);
// }

// return illegalStatusError();

//  4.2
export declare function doStuff(...args: [...names: string[], shouldCapitalize: boolean]): void;


export abstract class SuperClass {
    abstract someMethod(): void;
    badda() {}
}

export type AbstractConstructor<T> = abstract new (...args: any[]) => T

export function withStyles<T extends AbstractConstructor<object>>(Ctor: T) {
    abstract class StyledClass extends Ctor {
        getStyles() {
            // ...
        }
    }
    return StyledClass;
}

export class SubClass extends withStyles(SuperClass) {
    someMethod() {
        this.someMethod()
    }
}
