import { Class, Instance } from './types';

/** multiple inheritance emulation */
function getNameMixin<T extends Class<Named>>(Base: T): Class<Instance<T> & { getName(): string }>  {
    return (class extends Base {
        public getName(): string {
            return this.firstName;
        }
    }) as unknown as Class<Instance<T> & { getName(): string }>;
}

function getFullNameMixin<T extends Class<Named>>(Base: T): Class<Instance<T> & { getFullName(): string }> {
    return (class extends Base {
        public getFullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }
    }) as unknown as Class<Instance<T> & { getFullName(): string }>;
}

class Named {
    protected firstName: string;
    protected lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Bar extends getNameMixin(getFullNameMixin(Named)) {

    constructor(name: string, lastName: string) {
        super(name, lastName);
    }

}

const bar = new Bar('MyName', 'MyLastName');
bar.getName(); // -> MyName
bar.getFullName(); // -> MyName MyLastName
//**************************
