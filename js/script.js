"use strict";

const questions = document.querySelector(".preguntas");
const buttonA = document.querySelector(".button:nth-child(1)");
const buttonB = document.querySelector(".button:nth-child(2)");
const buttonC = document.querySelector(".button:nth-child(3)");
const buttonD = document.querySelector(".button:nth-child(4)");
const reset = document.getElementById("reset");

const pantalla1 = document.getElementById("pantalla_inicio");
const pantalla2 = document.getElementById("pantalla_preguntas");
const pantalla3 = document.getElementById("pantalla_final");

let contadorAciertos = 0;
let i = 0;

//   funcion que pinta las preguntas

const printQuestion = (x, arr) => {
  questions.textContent = arr[x].question;
  buttonA.textContent = arr[x].answers[0];
  buttonB.textContent = arr[x].answers[1];
  buttonC.textContent = arr[x].answers[2];
  buttonD.textContent = arr[x].answers[3];
};

//    funcion que llama al archivo json y nos devuelve un array

const call = async () => {
  try {
    const response = await fetch("/quiz.json");

    if (response.ok) {
      const arrQ = await response.json();

      return arrQ;
    } else {
      console.error("hubo un errror en la peticion de datos"); //  usar throw error
    }
  } catch {
    console.error(error, message);
  }
};

//   inicia las preguntas

const start = async () => {
  const arrQ = await call();
  pantalla1.classList.add("hidden");
  pantalla2.classList.remove("hidden");

  printQuestion(i, arrQ);
  buttonA.addEventListener("click", (e) => quest(e.target));
  buttonB.addEventListener("click", (e) => quest(e.target));
  buttonC.addEventListener("click", (e) => quest(e.target));
  buttonD.addEventListener("click", (e) => quest(e.target));
};

// compara las respuestas

const quest = async (but) => {
  const arrQ = await call();

  if (but.textContent === arrQ[i].correct) {
    contadorAciertos++;
  }

  console.log(contadorAciertos);

  i++;

  if (i < arrQ.length) {
    printQuestion(i, arrQ);
  } else {
    pantalla2.classList.add("hidden");
    pantalla3.classList.remove("hidden");
    reset.addEventListener("click", inicio);
  }
};

//    pantalla de inicio

const inicio = () => {
  pantalla3.classList.add("hidden");
  pantalla1.classList.remove("hidden");
  const buttonInicio = document.getElementById("iniciar_preguntas");
  buttonInicio.addEventListener("click", start);
  i = 0;
  contadorAciertos = 0;
};

inicio();
