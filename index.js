class Pomodoro {
  constructor() {
    this.minutes = 25; 
    this.seconds = 1500;
    this.timer = this.timer.bind(this);
    this.clock = null;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateHtml = this.updateHtml.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }

  timer() {
    this.seconds--;
    this.updateHtml();
  }

  startTimer() {
    clearInterval(this.clock);
    this.clock = setInterval(this.timer, 1000);
  }

  stopTimer() {
    clearInterval(this.clock);
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
  }
}

let pomodoro = new Pomodoro();

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const restartBtn = document.querySelector('#restart');

startBtn.addEventListener('click', () => {
  pomodoro.startTimer();
});

stopBtn.addEventListener('click', () => {
  pomodoro.stopTimer();
});

restartBtn.addEventListener('click', () => {
  pomodoro.restartTimer();
});
