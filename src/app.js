const cron = require('node-cron');
const {tasks} = require('./config');
const db = require('./models/index');

db.then(() => {
    const Task = require('./models/task');


    const items = tasks.map(item => new Task(item));

    items.forEach(task => task.stop());

    items.forEach(task => {
        const dateTime = task.toCronTime();
        console.log(dateTime);
        cron.schedule(dateTime, task.start.bind(task), true);
    });
});


