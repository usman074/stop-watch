var isStart = false;
var toggleBtn = document.getElementById('toggleBtn');
var splitBtn = document.getElementById('splitBtn');
var resetBtn = document.getElementById('resetBtn');
var timer = document.getElementById('timer');
var timeSplit = document.getElementById('timeSplit');
var watch = new Stopwatch(timer, timeSplit);
disableButton()
function disableButton() {
    if (!isStart) {
        splitBtn.disabled = true;
        toggleBtn.classList.add('toggle-btn-style')

    }
}

function start() {
    isStart = true;
    splitBtn.disabled = false;
    splitBtn.classList.remove('transparent-color');
    splitBtn.classList.add('split-btn-style')
    toggleBtn.classList.remove('toggle-btn-style')
    toggleBtn.classList.add('pink-color')
    toggleBtn.textContent = 'Pause';
    resetBtn.disabled = true;
    watch.start();



}

function pause() {
    isStart = false;
    splitBtn.disabled = true;
    splitBtn.classList.remove('split-btn-style');
    splitBtn.classList.add('transparent-color');
    toggleBtn.classList.remove('pink-color');
    toggleBtn.classList.add('toggle-btn-style');
    toggleBtn.textContent = 'Start';
    resetBtn.disabled = false;
    watch.pause();
}

function splitTime() {
    watch.splitTime();
}

function resetStopWatch() {
    watch.reset()
}

toggleBtn.addEventListener('click', function () {
    isStart ? pause() : start();
});


