https://learn.javascript.ru/native-prototypes  //prototypes
console.clear(); // очистка консоли

//spread
//   http://www.magisters.org/community/4/60

//Разбивает массив на индивидуальные значения.
const a = [1, 2];
const b = returnTwo(a[0], a[1]); // [2, 1]
const c = returnTwo(...a); // [2, 1]

//Объединение массивов
//передача в аргументы
let nums = [1, 2, 3];
let abcs = ['a', 'b', 'c'];
let alphanum = [ ...nums, ...abs ]; // [1, 2, 3, 'a', 'b', 'c']
function doSomthing(arg1, arg2, arg3) {};
doSomthing(...nums);

//Если название свойства объекта, которому присваиваются данные,
//одинаково с названием переменной, можно использовать короткую запись:
const x = 4;
const y = 2;
const o = { x, y, z: x * y }; // { x: 4, y: 2, z: 8 }

//Деструктуризация позволяет связать свойства объекта с одноименными переменными:
const address = {
  city: "Санкт-Петербург",
  zip: 190000
};

const { city, zip } = address;
log(city); // 'Санкт-Петербург'
log(zip); // 190000

//В момент деструктуризации мы можем присвоить переменным свои названия (псевдонимы или алиасы):
let options = {
    title: "Меню",
    width: 100,
    height: 200
  };

let { width: w, height: h, title } = options;

alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200


//нет в стандарте 2015
let options = {
    title: "Меню",
    width: 100,
    height: 200
  };
let { title, ...size } = options;

//копироание свойств в новый объект, круглый скобки обязательны
const rateColor = (color, rating) =>
 ({
 ...color,
 rating
 })

//создание нового массива с добавленными данными
let list = [
 { title: "Rad Red"},
 { title: "Lawn"},
 { title: "Party Pink"}
]

const addColor = (title, list) => [...list, {title}]

//замена атрибута
const editName = (oldName, name, arr) => arr.map(item => (item.name === oldName) ? ({...item,name}) : item);

//В коде ниже options содержит подобъект и подмассив. В деструктуризации ниже сохраняется та же структура:
 'use strict';

let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Пончик", "Пирожное"]
}

let { title="Меню", size: {width, height}, items: [item1, item2] } = options;

// Меню 100 200 Пончик Пирожное
alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
alert(item1);  // Пончик
alert(item2);  // Пирожное



//Деструктуризацию можно использовать более удобным и читаемым способом:
var person = { name: 'Влад', age: 24 };
displayPerson(person);

function displayPerson({ name, age }) {
  console.log(name, age); // выведет Влад 24
}

//можно указать при деструктуризации значения по-умолчанию для переменных:
var person = { name: 'Влад', age: 24 };
displayPerson(person);

function displayPerson({name = "Без имени", age = 0}) {
  console.log(name, age); // выведет Влад 24
}

let { name, age, address: { city, zip }} = person; // такая запись не создаст объект address, но разложит его на указанные переменные

//Деструктуризация массивов
const nums = [1, 2, 3, 4, 5];
const [first, second,,,fifth] = nums;

let [firstName, lastName, ...rest] = "Юлий Цезарь Император Рима".split(" ");
alert(firstName); // Юлий
alert(lastName);  // Цезарь
alert(rest);      // Император,Рима (массив из 2х элементов)
//Значением rest будет массив из оставшихся элементов массива.




//Перестановка значений переменных
//Как поменять местами значения переменных без третей (временной или промежуточной) переменной:
let a = 1, b = 2;
// Старый способ
var temp = a, a = b, b = temp;
// Новый способ
[b, a] = [a, b];

//Подпись метода
const nums = [1, 2, 3, 4];
doSomething(nums);

function doSomething([first, second, ...others]){
  log(first);   //logs 1
  log(second);  //logs 2
  log(others);  //logs [3, 4]
}

//Деструктуризация вложенных массивов
const nums = [1, 2, [30, 40, [500, 600]]];
const [one,,[thirty,,[,sixhundert]]] = nums;

//Ошибки паттернов
const [x] = [2, 3]    // x = 2
const [x] = {'0': 4}  // x = 4
const [x, y, z] = [1, 2]  // throw

//Опровержение в паттерне
// Весь паттерн опровержен
let [x, y, z] = [1, 2]  // x = 1, y = 2, z = undefined

// Только 'z' опровержена
let [x, y, ?z] = [1, 2]  // z = 1, y = 2, z = undefined


//for of итерирует по значениям (for in по ключам). Моде итерировать set и map.


//object
let name = 'ivan';
let surname = 'ivanov';

let person = {
    name,
    surname
}

let prop = 'name';
console.log( person[prop] );   // 'ivan'

let person = {
    [prop]: 'Bill',
    [prop.toUpperCase()]: 'Bill',
    ['get' + prop]() {
        return this[prop];   //добавит объекту метод getName();
    },

    get name() {
        return this.name;  //новый синтаксис вместо Object.defineProperty
    },

    set name(arg) {
        this.name = arg;
    }

}

function createCar(name, value) {
    return {
        [name]: value
    }
};
console.log( createCar(brand, ford) );   // { brand: ford, BRAND: ford }  c методом getName();

//Object.defineProperty Object.defineProperties  options get set for attributes
//arrow func
(x,y) => { return x*y };
let add = (x,y) => { return x*y };   //стрелку нельзя переносить на новую строку
let add = x => x*y;   //1 аргумент можно без()б одно выражение без {}  и return;
let getPerson = name => ({name: name});   // в таком случае нужно оборачивать литерал в () иначе ошибка;

(function(){})(); // IIFE объвление с немедленным вызовом
(()=>{})();
// this всегда указывает на контекст вызова;


//Предположим, что нужно преобразовать объект schools в массив schools:
const schools = {
 "Yorktown": 10,
 "Washington & Lee": 2,
 "Wakefield": 5
}

const schoolArray = Object.keys(schools).map(key => ({
  name: key,
  wins: schools[key]
  })
)

protected asyncFlow(...fns: Function[]): any {
	const _wrapFlowAsync = (fn: Function) => (arg: any) => new Promise((res, rej) => res(arg))
    .then(async () => fn(await arg));

	const wrappedFns = fns.map(fn => _wrapFlowAsync(fn.bind(this)));

	return fp.flow(wrappedFns)
}
https://www.reddit.com/r/javascript/comments/71n1lx/using_lodash_flow_or_compose_with_asynchronous/
