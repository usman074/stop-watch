function Stopwatch(timerElem, timeSplitElem) {
    var offset = 0;
    var interval;
    var time = 0;
    var logs = [];
    function timeDiff() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(time) {
        time = new Date(time);

        var hours = time.getHours().toString()
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

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
        console.log(minutes)
        console.log(seconds)
        console.log(milliseconds)
        return hours + ' : ' + minutes + ' : ' + seconds + ' . ' + milliseconds;
    }

    function update() {

        console.log(offset)
        time += timeDiff();
        timerElem.textContent = timeFormatter(time)
    }

    this.start = () => {
        interval = setInterval(update.bind(this), 10);
        offset = Date.now();
    }

    this.pause = () => {
        logs.push({
            type: 'Pause',
            time: timerElem.textContent
        });
        clearInterval(interval);
        interval = null;
        generateLogs();
    }

    this.splitTime = () => {
        logs.push({
            type: 'Split',
            time: timerElem.textContent
        });
        timeSplitElem.textContent = timerElem.textContent;
    }

    this.reset = () => {
        time = 0;
        timerElem.textContent = timeFormatter(time)
    };

    function generateLogs() {
        let element = document.getElementById("logContainer");
        element.innerHTML = null;
        element.style.gridTemplateRows = `repeat(${logs.length}, auto)`;
        logs.forEach((obj, ind) => {
            console.log(obj)
            console.log(ind)
            var div = document.createElement("div");
            var id = document.createElement("p");
            var logTime = document.createElement("p");
            obj.type === 'Split'? logTime.classList.add('orange-txt'): logTime.classList.add('pink-txt');
            var logType = document.createElement("p");
            var idText = document.createTextNode("#" +(ind+1));
            var logTimeText = document.createTextNode(obj.time);
            var logTypeText = document.createTextNode(obj.type);
            id.appendChild(idText)
            logTime.appendChild(logTimeText)
            logType.appendChild(logTypeText)
            div.appendChild(id)
            div.appendChild(logTime)
            div.appendChild(logType)
            div.classList.add('log-position');
            element.appendChild(div)
        })
    }
}