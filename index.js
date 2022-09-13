const stick1 = document.querySelector("#stick1");
const stick2 = document.querySelector("#stick2");
const stick3 = document.querySelector("#stick3");

const disk1 = document.querySelector(".disk1");
const disk2 = document.querySelector(".disk2");
const disk3 = document.querySelector(".disk3");
const disk4 = document.querySelector(".disk4");
const disk5 = document.querySelector(".disk5");
const disk6 = document.querySelector(".disk6");

const steps = document.querySelector(".steps");

const necessaryMoves = []; // ходы, которые необходимо сделать, чтобы решить головоломку

// Привязать функцию начала работы приложения к кнопке "Начать"
document.querySelector(".start").addEventListener("click", (event) => {
  Hanoi(6, "stick1", "stick2", "stick3");
  startMoving();
});


// Получить список селекторов уровней для каждого стержня
const levels = {
  "stick1": [],
  "stick2": [],
  "stick3": [],
};

for (let s = 1; s <= 3; s++) {
  for (let i = 1; i <= 6; i++) {
    levels[`stick${s}`].push(document.querySelector(`#stick${s} > .level${i}`));
  }
}

function Hanoi(n, x, y, z) {
  if (n <= 0)
    return;

  Hanoi(n - 1, x, z, y);
  necessaryMoves.push([x, y]);
  Hanoi(n - 1, z, y, x);
  
  return;
}

function findHighestBusyElement(stick) {
  // Найти самый высокий занятый уровень стержня (с которого будем перекладывать диск)

  for (let level = 5; level >= 0; level--) {
    if (levels[stick][level].hasChildNodes()) {
      return levels[stick][level];
    }
  }

  return levels[stick][0]; // если стержень пуст, вернуть первый уровень
}

function findEmptyElement(stick) {
  // Найти пустой уровень (на который будем перекладывать диск)

  for (let level = 0; level <= 5; level++) {
    if (!levels[stick][level].hasChildNodes()) {
      return levels[stick][level];
    }
  }
}

function moveDisk(from, to) {
  // Переместить самый верхний диск на другой стержень
  const initialPosition = findHighestBusyElement(from);
  const destinationPosition = findEmptyElement(to);

  destinationPosition.appendChild(initialPosition.firstElementChild);
}

function sleep(ms) {
  // Задержка при передвижении дисков (чтоб не перемещалось моментально)
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startMoving() {
  let counter = 0; // счетчик шага
  console.log(necessaryMoves);

  // перемещать диски по шагам из массива
  for (let move = 0; move < necessaryMoves.length; move++) {
    await sleep(move * 150);
    moveDisk(necessaryMoves[move][0], necessaryMoves[move][1]);
    counter++;
    steps.textContent = `Шаги: ${counter}`;
  }
}
