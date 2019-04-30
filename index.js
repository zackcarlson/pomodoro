class Pomodoro {
  constructor() {
    this.breakMins = 5;
    this.workMins = 25;
    this.minutes = 25; 
    this.seconds = 1500;
    this.timer = this.timer.bind(this);
    this.clock = null;
    this.workTimer = true;
    this.breakTimer = false;
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.updateHtml = this.updateHtml.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
    this.updateInterval = this.updateInterval.bind(this);
  }

  timer() {
    if (this.seconds === 0) {
      this.workTimer = !this.workTimer;
      this.breakTimer = !this.breakTimer;
      this.updateInterval();
    }
   
    this.seconds--;
    this.updateHtml();
  }

  startTimer() {
    clearInterval(this.clock);
    this.clock = setInterval(this.timer, 1000);
    let progressBar = document.getElementById('progress-overlay');
    progressBar.style.animation = ``;
    progressBar.style.animation = `countdown ${this.seconds}s linear infinite forwards`;
  }

  pauseTimer() {
    clearInterval(this.clock);
    let progressBar = document.getElementById('progress-overlay');
    progressBar.style.animationPlayState = 'paused';
  }

  restartTimer() {
    clearInterval(this.clock);
    this.seconds = this.minutes * 60;
    this.updateHtml();
  }

  updateHtml() {
    let timer = document.querySelector('#timer');
    let mins = Math.floor(this.seconds/60);
    let secs = this.seconds % 60;
    timer.textContent = `${mins}:${secs < 10 ? '0' + secs : secs}`;

    if (this.workTimer) {
      timer.style.color = "#fd5c63";
    } else {
      timer.style.color = "#8bf0ba";
    }
  }

  updateInterval() {
    this.workMins = document.getElementById('work-timer').value;
    this.breakMins = document.getElementById('break-timer').value;
    let updateMins;

    if (this.workTimer) {
      updateMins = this.workMins;
    } else {
      updateMins = this.breakMins;
    }

    this.minutes = parseInt(updateMins);
    this.seconds = parseInt(updateMins * 60);
    this.updateHtml();
  }
}

let pomodoro = new Pomodoro();

const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const restartBtn = document.querySelector('#restart');
const saveIntervals = document.querySelector('#save-intervals');

startBtn.addEventListener('click', () => {
  pomodoro.startTimer();
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
});

pauseBtn.addEventListener('click', () => {
  pomodoro.pauseTimer();
  startBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
});

restartBtn.addEventListener('click', () => {
  pomodoro.restartTimer();
  startBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
});

saveIntervals.addEventListener('click', () => {
  pomodoro.updateInterval();
});

setInterval(pomodoro.updateHtml, 50);