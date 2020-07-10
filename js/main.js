// import { Watch } from './stopWatch2.js';
import * as watch from './temp.js';
let isStart = false;
const toggleBtn = document.getElementById('toggleBtn');
const splitBtn = document.getElementById('splitBtn');
const resetBtn = document.getElementById('resetBtn');
const timer = document.getElementById('timer');
const timeSplit = document.getElementById('timeSplit');
let _startCall;
let logs = [];
// var watch = new Stopwatch(timer, timeSplit);
// const watch = new Watch(timer, timeSplit);
// watch.setDefaultValues(timer, timeSplit)
disableButton()
function disableButton() {
    if (!isStart) {
        splitBtn.disabled = true;
        toggleBtn.classList.add('toggle-btn-style')

    }
}

function start() {
        splitBtn.disabled = false;
        splitBtn.classList.remove('transparent-color');
        splitBtn.classList.add('split-btn-style')
        toggleBtn.classList.remove('toggle-btn-style')
        toggleBtn.classList.add('pink-color')
        toggleBtn.textContent = 'Pause';
        resetBtn.disabled = true;
        let interval = watch.start(timer)
        // console.log(interval);
        // setTimeout(() => {
        //     clearInterval(temp)
        // }, 30)

        // setInterval(watch.update(0,Date.now()), 10);
        return interval;
}

function pause(interval, timer) {
    splitBtn.disabled = true;
    splitBtn.classList.remove('split-btn-style');
    splitBtn.classList.add('transparent-color');
    toggleBtn.classList.remove('pink-color');
    toggleBtn.classList.add('toggle-btn-style');
    toggleBtn.textContent = 'Start';
    resetBtn.disabled = false;
    let log = watch.pause(interval, timer);
    logs = [...logs, log];
    watch.generateLogs(logs);
}

function splitTime(timeSplit, timer) {
    let log = watch.splitTime(timeSplit, timer);
    logs = [...logs, log];
    watch.generateLogs(logs);
}

function resetStopWatch(timer) {
    watch.reset(timer)
}

toggleBtn.addEventListener('click', function () {
    if (isStart) {
        isStart = false;
        pause(_startCall, timer);
    } else {
        isStart = true;
        _startCall = start();
        // console.log(_startCall);
    }
});

splitBtn.addEventListener('click', function () {
    splitTime(timeSplit, timer);
});
resetBtn.addEventListener('click', function () {
    resetStopWatch(timer);
});