"use strict";

const questions = document.querySelector("h2");
const main = document.querySelector("main");
const buttonA = document.querySelector("button:nth-child(1)");
const buttonB = document.querySelector("button:nth-child(2)");
const buttonC = document.querySelector("button:nth-child(3)");
const buttonD = document.querySelector("button:nth-child(4)");
let contadorAciertos = 0;
let i = 0;

const printQuestion = (x, arr) => {
  questions.textContent = arr[x].question;
  buttonA.textContent = arr[x].answers[0];
  buttonB.textContent = arr[x].answers[1];
  buttonC.textContent = arr[x].answers[2];
  buttonD.textContent = arr[x].answers[3];
};

const arr = async () => {
  try {
    const response = await fetch("/quiz.json");

    if (response.ok) {
      const arrQ = await response.json();

      printQuestion(i, arrQ);
      return arrQ;
    } else {
      console.error("hubo un errror en la peticion de datos");
    }
  } catch {
    console.error(error, message);
  }
};

arr();

const quest = async (but) => {
  const arrQ = await arr();

  if (but.textContent === arrQ[i].correct) {
    contadorAciertos++;
  }
  console.log(contadorAciertos);
  i++;
  if (i < arrQ.length) {
    printQuestion(i, arrQ);
  } else {
    main.textContent = `numero de aciertos: ${contadorAciertos}`;
  }
};

buttonA.addEventListener("click", (e) => quest(e.target));
buttonB.addEventListener("click", (e) => quest(e.target));
buttonC.addEventListener("click", (e) => quest(e.target));
buttonD.addEventListener("click", (e) => quest(e.target));
