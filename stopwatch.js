// stopwatch.js
window.onload = function() {
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapsContainer = document.querySelector('.laps');
    let display = document.getElementById('display');

    document.getElementById('start').addEventListener('click', function() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(updateTime, 10);
            running = true;
        }
    });

    document.getElementById('stop').addEventListener('click', function() {
        if (running) {
            clearInterval(tInterval);
            difference = new Date().getTime() - startTime;
            running = false;
        }
    });

    document.getElementById('reset').addEventListener('click', function() {
        clearInterval(tInterval);
        startTime = 0;
        updatedTime = 0;
        difference = 0;
        running = false;
        display.innerHTML = "00:00:00:00";
        lapsContainer.innerHTML = "";
    });

    document.getElementById('lap').addEventListener('click', function() {
        if (running) {
            let lapTime = display.innerHTML;
            let lapDiv = document.createElement('div');
            lapDiv.className = 'lap';
            lapDiv.innerHTML = lapTime;
            lapsContainer.appendChild(lapDiv);
        }
    });

    function updateTime() {
        updatedTime = new Date().getTime() - startTime;

        let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((updatedTime % 1000) / 10);

        display.innerHTML =
            (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
            (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
            (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" +
            (milliseconds > 9 ? milliseconds : "0" + milliseconds);
    }
};
