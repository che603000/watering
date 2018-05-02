const mongoose = require('mongoose');
const Log = mongoose.model('log');
const {EVENT_START, EVENT_STOP} = require('../const');


class Task {

    isWorking() {
        const _date = new Date();
        _date.setHours(this.hours);
        _date.setMinutes(this.minutes);
        const timeStart = date.getTime();
        const timeEnd = new Date(timeStart + this.minutes * 60000);
        const deltaMinutes = timeEnd - timeStart / 60000;
        return deltaMinutes < this.minutes;
    }

    get hours() {
        return +this.startTime.split(":")[0]
    }

    get minutes() {
        return +this.startTime.split(":")[1]
    }

    constructor(data) {
        this.setProps(data)
    }

    setProps(data) {
        Object.keys(data).forEach(key => {
            if (data[key])
                this[key] = data[key];
        })
    }

    toJSON() {
        const {name, active, area, startTime, time} = this;
        return {active, name, area, startTime, time};
    }

    toCronTime() {
        return `${this.hours} ${this.minutes} * * *`;

    }

    start() {
        this._keyTimeout = setTimeout(this.stop.bind(this), +this.time * 1000 * 60);
        console.log("start => ", this.name, new Date());
        Log.create({event: EVENT_START, ...this.toJSON()})
    }

    stop() {
        this._keyTimeout && clearTimeout(this._keyTimeout);
        console.log("stop => ", this.name, new Date());
        debugger;
        Log.create({event: EVENT_STOP, ...this.toJSON()})
        this._keyTimeout = null;
    }
}

module.exports = Task;