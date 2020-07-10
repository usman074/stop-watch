let _time = 0;
const intervalTime = 10;

export function start(timer) {
    
     return setInterval(update, intervalTime, timer)
    //  console.log(interval)

}

export function pause (interval, timer) {
    // logs.push({
    //     type: 'Pause',
    //     time: timerElem.textContent
    // });
    clearInterval(interval);
    // interval = null;
    // generateLogs();
    return {type: 'Pause', time: timer.textContent};
    // console.log(a)
    // return a;
}

export function splitTime (timeSplit, timer) {
    timeSplit.textContent = timer.textContent;
    return {type: 'Split', time: timer.textContent};
}

export function reset (timerElem) {
    _time = 0;
    timerElem.textContent = timeFormatter(_time)
};

function update(timer) {
    _time += intervalTime;
    timer.textContent = timeFormatter(_time)
}

function timeFormatter(time) {
    const _time = new Date(time);

    let hours = _time.getHours().toString()
    let minutes = _time.getMinutes().toString();
    let seconds = _time.getSeconds().toString();
    let milliseconds = _time.getMilliseconds().toString();

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

export function generateLogs(logs) {
    let element = document.getElementById("logContainer");
    element.innerHTML = null;
    element.style.gridTemplateRows = `repeat(${logs.length}, auto)`;
    for (const [ind, obj] of logs.entries()) {
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