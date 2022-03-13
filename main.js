"use strict";
const body = document.querySelector("body");
const question = document.querySelector("h2");
const buttonA = document.querySelectorAll("button")[0];
const buttonB = document.querySelectorAll("button")[1];
const buttonC = document.querySelectorAll("button")[2];
const buttonD = document.querySelectorAll("button")[3];

async function main() {
  try {
    let response = await fetch("/quiz.json");
    console.log(response);
    if (response.ok) {
      let datos = await response.json();

      // console.log(datos[0].question);
      // console.log(datos[0].answers[0]);
      //console.log(typeof datos);

      console.log(datos[0].answers[1]);

      question.textContent = datos[0].question;
      buttonA.textContent = datos[0].answers[0];
      buttonB.textContent = datos[0].answers[1];
      buttonC.textContent = datos[0].answers[2];
      buttonD.textContent = datos[0].answers[3];
    } else {
      writeMessage("No funciona");
    }
  } catch (error) {
    console.error(error.message);
  }
}

main();

//COUNTER

let counter = 0;

const marcador = document.createElement("p");
marcador.textContent = counter;
body.append(marcador);

const handleButtonClick = () => {
  marcador.textContent = ++counter;
};

buttonA.addEventListener("click", handleButtonClick);
buttonB.addEventListener("click", handleButtonClick);
buttonC.addEventListener("click", handleButtonClick);
buttonD.addEventListener("click", handleButtonClick);

