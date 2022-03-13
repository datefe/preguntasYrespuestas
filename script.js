"use strict";

const questions = document.querySelector("h2");
const buttonA = document.querySelector("button:nth-child(1)");
const buttonB = document.querySelector("button:nth-child(2)");
const buttonC = document.querySelector("button:nth-child(3)");
const buttonD = document.querySelector("button:nth-child(4)");
let contadorAciertos = 0;
let contadorErrores = 0;
let respuesta;
async function arr() {
  try {
    const response = await fetch("/quiz.json");
    if (response.ok) {
      const arrQ = await response.json();

      const printQuestion = (x) => {
        questions.textContent = arrQ[x].question;
        buttonA.textContent = arrQ[x].answers[0];
        buttonB.textContent = arrQ[x].answers[1];
        buttonC.textContent = arrQ[x].answers[2];
        buttonD.textContent = arrQ[x].answers[3];
      };

      let i = 0;
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
      }, 5000);
      console.log(arrQ);
    } else {
      console.error("hubo un errror en la peticion de datos");
    }
  } catch {
    console.error(error, message);
  }
}

arr();
buttonA.addEventListener("click", () => {
  respuesta = buttonA.textContent;
  console.log(respuesta);
});
buttonB.addEventListener("click", () => {
  respuesta = buttonB.textContent;
  console.log(respuesta);
});
buttonC.addEventListener("click", () => {
  respuesta = buttonC.textContent;
  console.log(respuesta);
});
buttonD.addEventListener("click", () => {
  respuesta = buttonD.textContent;
  console.log(respuesta);
});
