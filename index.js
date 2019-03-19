class Pomodoro {
  constructor() {
    this.minutes = 25; 
    this.seconds = 1500;
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateHtml = this.updateHtml.bind(this);
  }

  timer() {
    this.seconds--;
    this.updateHtml();
  }

  startTimer() {
    setInterval(this.timer, 1000);
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

startBtn.addEventListener('click', () => {
  pomodoro.startTimer();
});
