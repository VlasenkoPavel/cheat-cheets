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



// protected illegalStatusError(
//     message: string = `Illegal operation for activity budget with status ${this.status}`
// ): never {
//     throw new Error(message);
// }

// return illegalStatusError();
