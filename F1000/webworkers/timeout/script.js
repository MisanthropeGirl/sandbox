class DateTime {
  constructor() {
    this.init();
    
    const myWorker = new Worker('worker.js');
    myWorker.onmessage = (e) => {
      this.setTime();
    }
    myWorker.postMessage(1000);
  }

  get datetime() {
    return document.querySelector('.js-datetime');
  }

  init() {
    this.setTime();
  }

  setTime(now = moment()) {
    this.datetime.setAttribute('datetime', now.format('Y-MM-DDTHH:mm:ss'));
    this.datetime.innerText = now.format('HH:mm:ss');
  }
}

new DateTime();