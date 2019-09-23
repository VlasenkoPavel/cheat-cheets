type serializedTime = {
    hours: string,
    minutes: string,
    seconds: string,
    ampm?: string
}


const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = (message: String) => console.log(message);

const compose = <T>(...fns:((arg: T) => T)[]) => (arg: T) => fns.reduce((composed, f) => f(composed), arg);

const serializeClockTime = (date: Date) => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
});

const civilianHours = (clockTime: serializedTime) => ({
    ...clockTime,
    hours: (parseInt(clockTime.hours) > 12) ? (String(parseInt(clockTime.hours) - 12)) : clockTime.hours
});

const appendAMPM = (clockTime: serializedTime) => ({
    ...clockTime,
    ampm: parseInt(clockTime.hours) >= 12 ? "PM" : "AM"
});

const display = (target: Function) => (time: serializedTime) => target(time);

const formatClock = (format: String) => (time: serializedTime) =>
    format.replace("hh", String(time.hours))
          .replace("mm", String(time.minutes))
          .replace("ss", String(time.seconds))
          .replace("tt", String(time.ampm));

const prependZero = (key: string) => (clockTime: serializedTime) => ({
    ...clockTime,
    [key]: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
});

const convertToCivilianTime = (clockTime: serializedTime) =>
    compose<serializedTime>(
        appendAMPM,
        civilianHours
    )(clockTime);

const doubleDigits = (civilianTime: serializedTime) =>
    compose<serializedTime>(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

startTicking();