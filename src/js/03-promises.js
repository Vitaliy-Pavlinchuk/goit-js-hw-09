import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const refs = {
  form: document.querySelector('.form'),
};

const onSubmitForm = e => {
  e.preventDefault();

  const delay = Number.parseInt(e.currentTarget.elements.delay.value);
  const step = Number.parseInt(e.currentTarget.elements.step.value);
  const amount = Number.parseInt(e.currentTarget.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + step * i;
    createPromise(i, currentDelay)
      .then(object => {
        Notify.success(`✅Fulfilled promise ${object.position} in ${object.delay}ms}`);
      })
      .catch(object => {
        Notify.failure(`❌Rejected promise ${object.position} in ${object.delay}ms`);
      });
  }
};

refs.form.addEventListener('submit', onSubmitForm);
