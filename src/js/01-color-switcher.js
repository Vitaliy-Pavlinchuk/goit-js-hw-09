function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStoP = document.querySelector('[data-stop]');


let timeIntervalId = 0;

const onChangeColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const onClickStart = () => {
  timeIntervalId = setInterval(onChangeColor, 1000);
  btnStart.disabled = true
  btnStoP.disabled = false

  
};

const onClickStop = () => {
  clearInterval(timeIntervalId);
  btnStart.disabled = false
  btnStoP.disabled = true
  
 
  
};

btnStart.addEventListener('click', onClickStart);
btnStoP.addEventListener('click', onClickStop);
