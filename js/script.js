"use strict";

const respuestas = document.querySelectorAll(".box");

const pantalla1 = document.getElementById("pantalla_inicio");
const pantalla2 = document.getElementById("pantalla_preguntas");
const pantalla3 = document.getElementById("pantalla_final");
const pantallaError = document.getElementById("pantalla_error");

let contadorAciertos = 0;
let i = 0;

//   funcion que pinta las preguntas

const printQuestion = (x, arr) => {
  const questions = document.querySelector(".preguntas");
  questions.textContent = arr[x].question;
  let j = 0;
  for (const q of respuestas) {
    q.textContent = arr[x].answers[j];
    j++;
  }
};

// funcion para el error

const err = (e) => {
  pantalla1.classList.add("hidden");
  pantalla2.classList.add("hidden");
  pantalla3.classList.add("hidden");
  pantallaError.classList.remove("hidden");
  document.getElementById("error").textContent = e;
  document.getElementById("button_error").addEventListener("click", inicio);
};

//    funcion que llama al archivo json y nos devuelve un array

const call = async () => {
  try {
    const response = await fetch("/quiz.json");

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("There was an error. Click reset button");
    }
  } catch (e) {
    console.error(e);
    err(e);
  }
};

//   inicia las preguntas

const start = async () => {
  const arrQ = await call();
  if (arrQ) {
    pantalla1.classList.add("hidden");
    pantalla2.classList.remove("hidden");
    contadorAciertos = 0;
    document.getElementById("contador_correctas").textContent =
      contadorAciertos;

    document.querySelector(".pantalla2>header>h2").textContent = `${i + 1}/${
      arrQ.length
    }`;

    printQuestion(i, arrQ);

    for (const q of respuestas) {
      q.addEventListener("click", prueba);
    }
    document.getElementById("volver_inicio").addEventListener("click", inicio);
  }
};
const prueba = (e) => quest(e.target);

const end = () => {
  document.getElementById(
    "aciertos_final"
  ).textContent = `Numero de aciertos:  ${contadorAciertos}`;
  const reset = document.getElementById("reset");
  pantalla2.classList.add("hidden");
  pantalla3.classList.remove("hidden");
  reset.addEventListener("click", inicio);
};

// compara las respuestas

const quest = async (but) => {
  for (const q of respuestas) {
    q.removeEventListener("click", prueba);
  }

  but.classList.add("pregunta_seleccionada");
  const arrQ = await call();

  setTimeout(() => {
    if (i < arrQ.length) {
      printQuestion(i, arrQ);
    } else {
      i = 0;

      end();
    }
    but.classList.remove("pregunta_correcta");
    but.classList.remove("pregunta_erronea");
    console.log(contadorAciertos);
    document.querySelector(".pantalla2>header>h2").textContent = `${i + 1}/${
      arrQ.length
    }`;

    for (const q of respuestas) {
      q.addEventListener("click", prueba);
    }
  }, 1600);

  setTimeout(() => {
    if (but.textContent === arrQ[i].correct) {
      contadorAciertos++;
      document.getElementById(
        "contador_correctas"
      ).textContent = `✅ ${contadorAciertos}`;
      but.classList.remove("pregunta_seleccionada");
      but.classList.add("pregunta_correcta");
    } else {
      but.classList.remove("pregunta_seleccionada");
      but.classList.add("pregunta_erronea");
    }
    i++;
  }, 1000);
};

//    pantalla de inicio

const inicio = () => {
  pantalla3.classList.add("hidden");
  pantallaError.classList.add("hidden");
  pantalla1.classList.remove("hidden");
  const buttonInicio = document.getElementById("iniciar_preguntas");
  buttonInicio.addEventListener("click", start);
  i = 0;
};

inicio();
