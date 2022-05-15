import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let selectedTime = null;
let interval = null;

const checkData = selected => {
  if (selected > new Date()) {
    toggleBtn(false);
    selectedTime = selected;
    return;
  }
  Notify.failure('Please choose a date in the future');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkData(selectedDates[0]);
  },
};

flatpickr(input, options);

const toggleBtn = flag => {
  if (flag) {
    startBtn.setAttribute('disabled', flag);
    return;
  }
  startBtn.removeAttribute('disabled');
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const timerStart = () => {
  const time = new Date();
  if (time >= selectedTime) {
    clearInterval(interval);
    return;
  }

  const res = convertMs(selectedTime - time);
  days.innerHTML = res.days;
  hours.innerHTML = res.hours;
  minutes.innerHTML = res.minutes;
  seconds.innerHTML = res.seconds;
};

const omClickStart = () => {
  toggleBtn(true);
  timerStart();
  interval = setInterval(timerStart, 1000);
  Notify.success('Timer started');
};

startBtn.addEventListener('click', omClickStart);
