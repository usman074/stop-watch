let offset = 0;
let interval;
let time = 0;
let logs = [];
let timerElem;
let timeSplitElem;
export function setDefaultValues(timerElem, timeSplitElem) {
    timeSplitElem = timeSplitElem;
    timerElem = timerElem;
    console.log(timerElem)
}

export function start() {
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
}

export function pause () {
    logs.push({
        type: 'Pause',
        time: timerElem.textContent
    });
    clearInterval(interval);
    interval = null;
    generateLogs();
}

export function splitTime () {
    logs.push({
        type: 'Split',
        time: timerElem.textContent
    });
    timeSplitElem.textContent = timerElem.textContent;
}

export function reset () {
    time = 0;
    timerElem.textContent = timeFormatter(time)
};

function update() {
    console.log(offset)
    time += timeDiff();
    timerElem.textContent = timeFormatter(time)
}

function timeFormatter(time) {
    time = new Date(time);

    let hours = time.getHours().toString()
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let milliseconds = time.getMilliseconds().toString();

    if (hours.length < 2) {
        hours = '0' + minutes;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
    }

    return hours + ' : ' + minutes + ' : ' + seconds + ' . ' + milliseconds;
}

function timeDiff() {
    let now = Date.now();
    let timePassed = now - offset;
    offset = now;
    return timePassed;
}

function generateLogs() {
    let element = document.getElementById("logContainer");
    element.innerHTML = null;
    element.style.gridTemplateRows = `repeat(${logs.length}, auto)`;
    for (const [ind, obj] of logs.entries()) {
        console.log(obj)
        console.log(ind)
        let div = document.createElement("div");
        let id = document.createElement("p");
        let logTime = document.createElement("p");
        obj.type === 'Split' ? logTime.classList.add('orange-txt') : logTime.classList.add('pink-txt');
        let logType = document.createElement("p");
        let idText = document.createTextNode("#" + (ind + 1));
        let logTimeText = document.createTextNode(obj.time);
        let logTypeText = document.createTextNode(obj.type);
        id.appendChild(idText)
        logTime.appendChild(logTimeText)
        logType.appendChild(logTypeText)
        div.appendChild(id)
        div.appendChild(logTime)
        div.appendChild(logType)
        div.classList.add('log-position');
        element.appendChild(div)
    }
}