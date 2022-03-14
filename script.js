"use strict";

const questions = document.querySelector("h2");
const buttonA = document.querySelector("button:nth-child(1)");
const buttonB = document.querySelector("button:nth-child(2)");
const buttonC = document.querySelector("button:nth-child(3)");
const buttonD = document.querySelector("button:nth-child(4)");
let contadorAciertos = 0;
let contadorErrores = 0;
let respuesta;
let i = 0;

const arr = async () => {
  try {
    const response = await fetch("/quiz.json");
    if (response.ok) {
      const arrQ = await response.json();

      questions.textContent = arrQ[0].question;
      buttonA.textContent = arrQ[0].answers[0];
      buttonB.textContent = arrQ[0].answers[1];
      buttonC.textContent = arrQ[0].answers[2];
      buttonD.textContent = arrQ[0].answers[3];

      return arrQ;
    } else {
      console.error("hubo un errror en la peticion de datos");
    }
  } catch {
    console.error(error, message);
  }
};
arr();
const quest = async () => {
  const arrq = await arr();

  if (respuesta === arrq[i].correct) {
    contadorAciertos++;
  }
  console.log(contadorAciertos);
  i++;
  const printQuestion = (x) => {
    questions.textContent = arrq[x].question;
    buttonA.textContent = arrq[x].answers[0];
    buttonB.textContent = arrq[x].answers[1];
    buttonC.textContent = arrq[x].answers[2];
    buttonD.textContent = arrq[x].answers[3];
  };
  printQuestion(i);
};

buttonA.addEventListener("click", () => {
  respuesta = buttonA.textContent;

  quest();
});
buttonB.addEventListener("click", () => {
  respuesta = buttonB.textContent;
  quest();
});
buttonC.addEventListener("click", () => {
  respuesta = buttonC.textContent;
  quest();
});
buttonD.addEventListener("click", () => {
  respuesta = buttonD.textContent;
  quest();
});

/* let i = 0;
printQuestion(i);

setInterval(() => {
  if (respuesta === arrQ[i].correct) {
    contadorAciertos++;
  } else {
    contadorErrores++;
  }
  console.log(contadorAciertos, contadorErrores);
  i++;
  printQuestion(i);
}, 5000); */

/* const printQuestion = (x) => {
  questions.textContent = arrQ[x].question;
  buttonA.textContent = arrQ[x].answers[0];
  buttonB.textContent = arrQ[x].answers[1];
  buttonC.textContent = arrQ[x].answers[2];
  buttonD.textContent = arrQ[x].answers[3];
}; */
