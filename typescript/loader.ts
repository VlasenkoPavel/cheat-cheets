// import { test, TestCommand } from 'chaika-test-pvl';
// import { times } from 'lodash';
// import { random } from 'faker';
// import { wait } from 'chaika-utils';
// import EventEmitter from 'events';

// class MyTestSuite extends TestCommand {

//     @test()
//     protected async firstTest() {
//         const source = times(30, () => random.number({ min: 30, max: 300 }));
//         const callback = async (num: number): Promise<number> => {
//             await wait(num);

//             return num;
//         }

//         class LoadCommand<T> extends EventEmitter {

//             private source: number[];
//             private callback: (num: number) => Promise<T>;
//             private count: number;
//             private jobs: (Promise<T> | T)[];

//             constructor({ source, callback, count }: { source: number[], callback: (num: number) => Promise<T>, count: number }) {
//                 super();
//                 this.source = source;
//                 this.callback = callback;
//                 this.count = count;
//                 this.jobs = [];
//             }

//             public async execute(): Promise<T[]> {
//                 this.jobs = times(this.count).map((i) => this.executor(i));

//                 for (const job of this.jobs) {
//                     await job;
//                 };

//                 return Promise.all(this.jobs);
//             }

//             private async executor(i: number) {
//                 const result = await this.callback(this.source[i]);

//                 if (this.jobs.length < this.source.length) {
//                     this.jobs[this.jobs.length] = this.executor(this.jobs.length);
//                 }

//                 return result;
//             }

//         }

//         const result = await new LoadCommand({ source, callback, count: 10 }).execute();
//         console.log('result:', result)

//     }

// }

// new MyTestSuite().execute();
