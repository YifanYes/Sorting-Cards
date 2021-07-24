/* eslint-disable */
import "bootstrap";
import "./style.css";

//Variables
const SECTION = document.querySelector("#mySection");
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const SUITS = ["♠", "♥", "♦", "♣"];

const INPUT = document.querySelector("input");
const DRAW = document.querySelector("#draw");
const BUBBLE = document.querySelector("#bubble");
const SELECTION = document.querySelector("#selection");

window.onload = function() {
  //Pintar el fondo de verde
  SECTION.classList.add("background");
  let listOfCards = [];
  //Evento de Draw
  DRAW.addEventListener("click", event => {
    listOfCards = createCard(event);
  });

  //Evento de bubble sort
  BUBBLE.addEventListener("click", event => {
    bubbleSort(listOfCards);
  });

  //Evento de selection sort
  SELECTION.addEventListener("click", event => {
    selectionSort(listOfCards);
  });
};

//Funcion para generar cartas
function createCard(event) {
  event.preventDefault();

  //Reinicia la seccion donde se pintan las cartas
  SECTION.innerHTML = "";

  //array de objetos carta
  let cards = [];

  //Bucle para iterar sobre el valor del input
  for (let i = 0; i < INPUT.value; i++) {
    cards.push(drawnCard());
  }
  console.log(cards);
  return cards;
}

function drawnCard() {
  //Crea un objeto carta
  let card = {
    suit: SUITS[getRandom(SUITS)],
    value: VALUES[getRandom(VALUES)]
  };

  //Contiene la carta entera
  let drawnCard = document.createElement("div");
  drawnCard.classList.add("poker-card");

  //Crea el icono de arriba
  let firstSuitContainer = document.createElement("div");
  let firstSuit = document.createTextNode(card.suit);
  firstSuitContainer.appendChild(firstSuit);
  firstSuitContainer.classList.add("align-start");
  drawnCard.appendChild(firstSuitContainer);

  //Crea el numero
  let valueContainer = document.createElement("div");
  let value = document.createTextNode(card.value);
  valueContainer.classList.add("card-value");
  valueContainer.appendChild(value);
  drawnCard.appendChild(valueContainer);

  //Crea el icono de abajo
  let secondSuitContainer = document.createElement("div");
  let secondSuit = document.createTextNode(card.suit);
  secondSuitContainer.appendChild(secondSuit);
  secondSuitContainer.classList.add("align-end");
  drawnCard.appendChild(secondSuitContainer);

  //Reemplaza los numeros 11,12,13 por J,Q,K
  if (
    card.value != 1 &&
    card.value != 11 &&
    card.value != 12 &&
    card.value != 13 &&
    card.value != 14
  ) {
    value.innerHTML = card.value;
  }
  if (card.value == 14) {
    value.innerHTML = "A";
  }
  if (card.value == 11) {
    value.innerHTML = "J";
  }
  if (card.value == 12) {
    value.innerHTML = "Q";
  }
  if (card.value == 13) {
    value.innerHTML = "K";
  }

  //Pinta rojo o negro dependiendo del suit
  if (card.suit == "♥" || card.suit == "♦") {
    firstSuitContainer.classList.add("red");
    valueContainer.classList.add("red");
    secondSuitContainer.classList.add("red");
  } else {
    firstSuitContainer.classList.add("black");
    valueContainer.classList.add("black");
    secondSuitContainer.classList.add("black");
  }

  SECTION.appendChild(drawnCard);

  return card;
}

function bubbleSort(listOfCards) {
  let listValue = [];
  for (let i = 0; i < listOfCards.length; i++) {
    listValue.push(listOfCards[i].value);
  }
  console.log(listValue);
  for (var i = 0; i < listValue.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < listValue.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (listValue[j] > listValue[j + 1]) {
        // If the condition is true then swap them
        var temp = listValue[j];
        listValue[j] = listValue[j + 1];
        listValue[j + 1] = temp;
      }
    }
  }
  // Print the sorted array
  console.log(listValue);
}

function selectionSort(listOfCards) {
  let min = 0;
  let counter = 0;
  while (min < listOfCards.length - 1) {
    for (let i = min + 1; i < listOfCards.length; i++) {
      if (listOfCards[min].value > listOfCards[i].value) {
        let aux = listOfCards[min];
        listOfCards[min] = listOfCards[i];
        listOfCards[i] = aux;
        createCard(listOfCards, counter);
        counter++;
      }
    }
    min++;
  }
  return listOfCards;
}

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}
