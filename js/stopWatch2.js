export class Watch {
    constructor(timerElem, timeSplitElem) {
        this.offset = 0;
        this.interval;
        this.time = 0;
        this.logs = [];
        this.timerElem = timerElem;
        this.timeSplitElem = timeSplitElem;
    }

    start() {
        console.log(this);
        this.interval = setInterval(this.update.bind(this), 10);
        this.offset = Date.now();
    }
    pause() {
        this.logs.push({
            type: 'Pause',
            time: this.timerElem.textContent
        });
        clearInterval(this.interval);
        this.interval = null;
        this.generateLogs();
    }
    reset() {
        this.time = 0;
        this.timerElem['textContent'] = this.timeFormatter(this.time)
    };

    splitTime() {
        this.logs.push({
            type: 'Split',
            time: this.timerElem.textContent
        });
        this.timeSplitElem.textContent = this.timerElem.textContent;
        this.generateLogs();
    }
    update() {
        console.log(this.offset)
        this.time += this.timeDiff();
        this.timerElem.textContent = this.timeFormatter(this.time)
    }
    timeFormatter(time) {
        let unformattedTime = new Date(time);
    
        let hours = unformattedTime.getHours().toString()
        let minutes = unformattedTime.getMinutes().toString();
        let seconds = unformattedTime.getSeconds().toString();
        let milliseconds = unformattedTime.getMilliseconds().toString();
    
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
    timeDiff() {
        let now = Date.now();
        let timePassed = now - this.offset;
        this.offset = now;
        return timePassed;
    }
    generateLogs() {
        let element = document.getElementById("logContainer");
        element.innerHTML = null;
        element.style.gridTemplateRows = `repeat(${this.logs.length}, auto)`;
        for (const [ind, obj] of this.logs.entries()) {
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
}