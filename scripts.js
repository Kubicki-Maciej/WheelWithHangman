// GAME BUILDING PARAMS

const showCatchwordInConsole = true;
const valuesWheel = [1, 50, 5, "25", "tracisz życie", 100, "bankrut", 5];
let count = 0;
let resultValue = 101;
// const valuesWheel = [1, 50, "bankrut", "bankrut", "bankrut", 100, "bankrut", 5];
// const valuesWheel = [
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
//   "tracisz życie",
// ];

const pieColors = ["#D1B419", "#393186"];

const life = 3;

const catchWordDict = {
  kompozytorzy: [
    "GEATANO DONIZETTI",
    "GIOACCHINO ROSSINI",
    "GIUSEPPE VERDI",
    "IGNACY JAN PADEREWSKI",
    "KRZYSZTOF PENDERECKI",
    "STANISŁAW MONIUSZKO",
    "WOLFGANG AMADEUSZ MOZART",
  ],
  powiedzenia: ["MUZYKA ŁAGODZI OBYCZAJE"],
  tytuły: [
    "MADAMA BUTTERFLY",
    "DZIADEK DO ORZECHÓW",
    "ZEMSTA NIETOPERZA",
    "NOC W WENECJI",
    "TURANDOT",
    "BAJADERA",
    "GREK ZORBA",
    "MY FAIR LADY",
    "CINDERELLA",
  ],
  muzyczne_pojęcia: [
    "PROSCENIUM",
    "ORKIESTRON",
    "MEZZOSOPRAN",
    "PARTYTURA",
    "BATUTA",
    "SOPRAN",
    "TENOR",
    "BARYTON",
  ],
};

const numbersOfBlocksFields = 26;

// building parms
let orderWordIndexStart = [1, 1, 1];
let firstRowLettersField = [];
let secondRowLettersField = [];
let thirdRowLettersField = [];
let fourthRowLettersField = [];
let hidenFirstRowLetters = [];
let hidenSecondRowLetters = [];
let hidenThirdRowLetters = [];
let hidenFourthRowLetters = [];
let listOfRowsWord = [
  Object.keys({ firstRowLettersField })[0],
  Object.keys({ secondRowLettersField })[0],
  Object.keys({ thirdRowLettersField })[0],
];
let wordsPicked = [];
let lettersUsed = [];
let letterInCatchword = [];
let gameObject = {};
// end building params

// functions adding thing in HTML
function addInputField(row, number) {
  let inputField = document.createElement("div");
  inputField.className = "field";
  inputField.id = `${number}_${row}`;

  let container = document.getElementById(`${row}`);
  container.appendChild(inputField);
}
function addLife(number) {
  for (i = 0; i < number; i++) {
    let hearthField = document.createElement("div");
    hearthField.className = `hearth`;
    hearthField.id = `hearth ${i + 1}`;

    let container = document.getElementById("lifeBar");
    container.appendChild(hearthField);
  }
}
// End functions adding thing in HTML

// getters
let categoryNameElement = document.getElementById("categoryName");
let wheel = document.getElementById("wheel");
let spinBtn = document.getElementById("spin-btn");
let finalValue = document.getElementById("final-value");
let confirmButton = document.getElementById("confirmBtn");
let inputElementPlayer = document.getElementById("playerNameInput");
let btnElementPlayer = document.getElementById("btnPlayerReady");
let myButtons = document.getElementById("alphabetButtons");
let winWindow = document.getElementById("winWindow");
let loseWindow = document.getElementById("loseWindow");
let btnNextRound = document.getElementById("nextRound");
let btnCancelGame = document.getElementById("cancelGame");
let btnCancelLoseGame = document.getElementById("cancelLoseGame");
let btnplayAgain = document.getElementById("playAgain");
let popupWindow = document.getElementById("popupWindow");

// listeners
btnElementPlayer.addEventListener("click", () => {
  // console.log("PLAYER READY ,GAME STARTED");
  player.addPlayerName();

  //start game and close window
  let pickedWord = catchWordGenerator.returnRandomCatchWordAndCategory();
  if (showCatchwordInConsole) {
    console.log(pickedWord.catchword);
  }
  startGame(pickedWord.catchword, pickedWord.category);

  popupWindow.classList.add("disablePopup");
});
btnNextRound.addEventListener("click", () => {
  // console.log("nastepna runda");
  game.resetGameFields();
  game.nextCatchword();
  game.removeWinWindow();
});
btnCancelGame.addEventListener("click", () => {
  game.resetGameFields();
  inputElementPlayer.value = "";
  game.restartGame();
  game.removeWinWindow();
  popupWindow.classList.remove("disablePopup");
});
btnCancelLoseGame.addEventListener("click", () => {
  game.resetGameFields();
  inputElementPlayer.value = "";
  game.restartGame();
  game.removeLostWindow();
  popupWindow.classList.remove("disablePopup");
});
// spin LOGIC
btnplayAgain.addEventListener("click", () => {
  game.resetGameFields();
  player.resetGame();
  game.nextCatchword();
  // game.removeWinWindow();
  game.removeLostWindow();
});
spinBtn.addEventListener("click", () => {
  game.disableSpinWheel();

  finalValue.innerHTML = `<p>Powodzenia !</p>`;
  let randomDegree = Math.floor(Math.random() * 360);

  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    }
    if (count > 5 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

/* not used
confirmButton.addEventListener("click", function () {
  game.activateLetterListener();
});
*/
// end listeners

// classes
class RotationHelper {
  constructor() {
    this.listOfValues = [];
    this.lengthList = 0;
    this.degree = 0;
    this.addValues(valuesWheel);
  }
  addValues(listOfRotationValues) {
    this.listOfValues = listOfRotationValues;
    this.lengthList = this.listOfValues.length;
    this.calculateDegree();
  }
  calculateDegree() {
    // liczba itemow dzielona przez 360
    this.degree = Math.round(360 / this.lengthList / 2);
  }
}

class CategoryAndCatchword {
  constructor() {
    this.category = "category";
    this.catchword = "catchword";
    this.catchwordCounter = 0;
    this.lettersInCatchword = 0;
  }

  addCategory(category) {
    this.category = category;
    // console.log(category);
    this.showCategory();
  }
  addCatchword(catchword) {
    this.catchword = catchword;
  }

  countsLettersInCatchWord() {
    let splitedCatchWords = this.catchword.split(" ");
    for (i = 0; i < splitedCatchWords.length; i++) {
      this.lettersInCatchword += splitedCatchWords[i].split("").length;
    }
  }

  showCategory() {
    categoryNameElement.textContent = this.category;
  }
  checkWordsFull() {
    if (this.catchwordCounter == this.lettersInCatchword) {
      game.gameWon();
    }
  }
  cleanCatchword() {
    this.catchwordCounter = 0;
    this.lettersInCatchword = 0;
    this.catchword = "catchword";
  }
  cleanCategory() {}
}

class CatchWordGenerator {
  constructor(catchWordObj) {
    this.catchWordObject = catchWordObj;
    // console.log(catchWordObj);
    this.catchwordList = [];
    this.categoryList = [];
    this.lengthItemInCategorys = [];
    this.allCatchWords = 0;
    this.createCategoryList();
    this.lengthOfAllItemsInCategorys();
    this.returnRandomCatchWordAndCategory();
  }
  createCategoryList() {
    // console.log(this.catchWordObject);
    let category = Object.keys(this.catchWordObject);
    this.categoryList = category;
    // console.log(this.categoryList);
    // this.lengthOfAllItemsInCategorys();
  }
  lengthOfAllItemsInCategorys() {
    // console.log("this-");
    let tempValue = 0;
    for (let w = 0; w < this.categoryList.length; w++) {
      let value = this.catchWordObject[this.categoryList[w]].length;
      tempValue += value;
      this.lengthItemInCategorys.push(value);
    }
    this.allCatchWords = tempValue;

    // console.log(this.allCatchWords);
  }
  get_N_ItemFrom(n) {
    let tempValue = 0;
    for (let i = 0; i < this.lengthItemInCategorys.length; i++) {
      tempValue += this.lengthItemInCategorys[i];
      if (n <= tempValue) {
        // console.log("tempValue");
        // console.log(tempValue);
        return {
          indexCategory: i,
          indexCatword: tempValue - n,
        };
      }
    }
  }
  returnRandomCatchWordAndCategory() {
    let randomNumber = Math.floor(Math.random() * this.allCatchWords);
    let pickedCatchwordIndexAndCategoryIndex =
      this.get_N_ItemFrom(randomNumber);
    let category =
      this.categoryList[pickedCatchwordIndexAndCategoryIndex.indexCategory];
    let catchword =
      this.catchWordObject[category][
        pickedCatchwordIndexAndCategoryIndex.indexCatword
      ];
    // console.log(catchword, category);
    return { catchword: catchword.toLowerCase(), category: category };
  }
}

class Player {
  constructor(playerLife) {
    this.name = "";
    this.playerLife_static = playerLife;
    this.playerLife = playerLife;
    this.points = 0;
    this.updatePoints();
  }

  playerRestart() {
    this.name = "";
    this.playerLife = this.playerLife_static;
    this.points = 0;
    this.playerRestartLife();
  }

  resetGame() {
    this.points = 0;
    this.playerLife = this.playerLife_static;
    this.playerRestartLife();
  }

  addPlayerName() {
    this.name = inputElementPlayer.value;
    let playerNameElement = document.getElementById("userName");
    playerNameElement.textContent = this.name;
  }
  showPlayerName() {}

  playerLoseLife() {
    let hearthContainer = document.getElementById(`hearth ${this.playerLife}`);
    hearthContainer.classList.add("lost");
    this.playerLife -= 1;
    this.checkIfPlayerALive();
  }
  checkIfPlayerALive() {
    if (this.playerLife <= 0) {
      // console.log("you lose");
      game.gameLost();
    }
  }
  updatePoints() {
    let points = document.getElementById("points");
    points.textContent = this.points;
  }
  addPoints(points) {
    this.points += points;
    this.updatePoints();
  }
  playerRestartLife() {
    Array.from(document.querySelectorAll(".hearth")).forEach((element) => {
      element.classList.remove("lost");
    });
  }
}

class GameLogic {
  constructor() {
    this.points = 0;
    this.letterUsed = [];
  }

  resetGameFields() {
    this.letterUsed = [];
    categoryAndCatchword.cleanCatchword();
    Array.from(document.querySelectorAll(".field")).forEach((element) => {
      // console.log(element.textContent);
      element.classList.remove("open");
      element.textContent = "";
    });
  }

  spinWheel(result) {
    // console.log(result);
    /* 
    1 spinujesz wheelem / blokuje spining wheelem
    2 sprawdzany jest wynik 
    3 jezeli jest on pozytywny mozesz wybrac litere
    4 jezeli litera jest to dostajesz punkty z losowania / jezeli nie ma tracisz zycie 
    5 jezeli haslo zostalo odgadniete dostajesz 1000 punktow
    6 odblokowuje spining wheelem
    */
    if (Number.isInteger(result)) {
      // console.log(confirmButton.value);
      this.enableConfirmBtn();
      // this.activateLetterListener();
      this.pointWheel(result);
    } else if (result === "bankrut") {
      this.losePoints();
      this.enableSpinWheel();
    } else if (result === "tracisz życie") {
      this.loseLife();
      this.enableSpinWheel();
    }
  }
  pointWheel(points) {
    this.points = points;
  }
  loseLife() {
    player.playerLoseLife();
  }
  guessLetter(letter) {
    let isLetter = checkingAllRowsForLetter(letter);
    if (isLetter) {
      this.addPointsToPlayer();
      this.clearTempPoints();
    } else {
      this.clearTempPoints();
      this.loseLife();
    }
  }
  losePoints() {
    player.points = 0;
    player.updatePoints();
  }
  clearTempPoints() {
    this.points = 0;
  }
  addPointsToPlayer() {
    player.addPoints(this.points);
    this.points = 0;
  }

  activateLetterListener(letter) {
    let pickedLetter = this.letterFromInputElement(letter);
    if (pickedLetter) {
      this.guessLetter(pickedLetter);
      this.disableConfirmBtn();
      this.enableSpinWheel();
    } else {
      // showError(`litera ${pickedLetter} została wybrana wczesniej`);
    }
  }
  disableSpinWheel() {
    spinBtn.disabled = true;
    spinBtn.classList.add("disabled-btn");
  }
  enableSpinWheel() {
    spinBtn.disabled = false;
    spinBtn.classList.remove("disabled-btn");
  }
  disableConfirmBtn() {
    alphabetButtons.disableButtons();
  }
  enableConfirmBtn() {
    alphabetButtons.enableButtons();
  }
  letterFromInputElement(letter) {
    let inputLetter = letter.toLowerCase();
    if (this.letterUsed.includes(inputLetter)) {
      // console.log("do nothing");
      return false;
    } else {
      // console.log("dodano litere");
      this.letterUsed.push(inputLetter);
      return inputLetter;
    }
  }

  gameLost() {
    // timer ?
    loseWindow.classList.remove("disablePopup");
    /* 
      wyskakuje okno z zdobytymi punktami 
      i z zacznij nowa gre
    */
  }

  removeWinWindow() {
    winWindow.classList.add("disablePopup");
  }

  removeLostWindow() {
    loseWindow.classList.add("disablePopup");
  }

  gameWon() {
    player.addPoints(1000);
    winWindow.classList.remove("disablePopup");
  }
  restartGame() {
    player.playerRestart();
  }
  nextCatchword() {
    //next round
    let pickedWord = catchWordGenerator.returnRandomCatchWordAndCategory();
    if (showCatchwordInConsole) {
      console.log(pickedWord.catchword);
    }
    startGame(pickedWord.catchword, pickedWord.category);
  }
}

class AlphabetButtons {
  constructor() {
    this.alphabet = [
      "a",
      "ą",
      "b",
      "c",
      "ć",
      "d",
      "e",
      "ę",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "ł",
      "m",
      "n",
      "o",
      "ó",
      "p",
      "q",
      "r",
      "s",
      "ś",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ź",
      "ż",
    ];
    this.alphabetObjectsButton = [];

    this.createAlphabetOnPage();
    this.addListenerForAllAlphabet();
    this.disableButtons();
  }
  createButton() {
    button = document.createElement("button");
    button.className = "testTEST";
  }

  createAlphabetOnPage() {
    let letters = document.createElement("ul");
    for (i = 0; i < this.alphabet.length; i++) {
      letters.id = "alphabet";
      let button = document.createElement("button");
      button.className = `letter shadowElement`;
      // button.className.classList("shadowElement");
      button.id = `${this.alphabet[i]}`;
      button.innerHTML = this.alphabet[i];
      this.alphabetObjectsButton.push(button);
      // checkButton();
      myButtons.appendChild(letters);
      letters.appendChild(button);
    }
  }

  addListenerForAllAlphabet() {
    const wrapper = document.getElementById("alphabetButtons");
    wrapper.addEventListener("click", (event) => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      } else {
        // console.log(event.target.id);
        game.activateLetterListener(event.target.id);
      }
    });
  }
  disableButtons() {
    for (i = 0; i < this.alphabetObjectsButton.length; i++) {
      this.alphabetObjectsButton[i].disabled = true;
    }
  }
  enableButtons() {
    for (i = 0; i < this.alphabetObjectsButton.length; i++) {
      this.alphabetObjectsButton[i].disabled = false;
    }
  }
}

// class constructors
const categoryAndCatchword = new CategoryAndCatchword();
const player = new Player(life);
addLife(player.playerLife);
const game = new GameLogic();
const alphabetButtons = new AlphabetButtons();
const circleRotationHelper = new RotationHelper();
const catchWordGenerator = new CatchWordGenerator(catchWordDict);

// adding first and last row of letters on html
for (i = 0; i < numbersOfBlocksFields; i++) {
  addInputField("firstRowLettersField", i + 1);
  // addInputField("fourthRowLettersField", i + 1);
}

for (i = 0; i < numbersOfBlocksFields; i++) {
  addInputField("secondRowLettersField", i + 1);
  addInputField("thirdRowLettersField", i + 1);
}

function countLettersInWord(word) {
  return word.split("").length;
}

function startGame(Catchwords, Category) {
  categoryAndCatchword.addCatchword(Catchwords);
  categoryAndCatchword.addCategory(Category);
  categoryAndCatchword.countsLettersInCatchWord();
  gameObject = pickedCachwordObject(Catchwords);

  putAllWords(gameObject.catchword);
}

function lowerAllWordsInList(listWords) {
  let tempListGameObject = [];
  for (i = 0; i < listWords.length; i++) {
    let word = listWords[i];
    tempListGameObject.push(word.toLowerCase());
  }
  return tempListGameObject;
}

function putAllWords(listCatchword) {
  let positionOnTable = orderWordIndexStart[1]; // this determinate row
  let indexListOfRowsWord = positionOnTable;

  putEmptyWord(listCatchword, indexListOfRowsWord, 1);
}

function putEmptyWord(catchword, indexStart, index) {
  /*
    Need to split words if catch word length of prase is more then 4 reroll 
*/

  // it's for one word
  let lettersCount = countLettersInWord(catchword);
  let positionNumberStart = positionIndexStartLetter(catchword, index);
  let splitedCatchword = catchword.split("");
  //   adding word to second table
  revealFields(
    listOfRowsWord[indexStart],
    lettersCount,
    positionNumberStart,
    splitedCatchword
  );
  addToTableWord(
    secondRowLettersField,
    retunrRowNumber(index),
    lettersCount,
    catchword,
    positionNumberStart
  );
}

function revealFields(
  fieldRow,
  lettersCount,
  positionNumberStart,
  splitedcatchword
) {
  // console.log(splitedcatchword);
  for (j = 0; j < lettersCount; j++) {
    if (splitedcatchword[j] == " ") {
    } else {
      let elementField = document.getElementById(
        `${positionNumberStart + j + 1}_${fieldRow}`
      );
      elementField.className = "field open";
    }
  }
}

function positionIndexStartLetter(word, i) {
  let lettersCount = countLettersInWord(word);
  let rowNumber = retunrRowNumber(i);
  let positionIndexStart = Math.round((rowNumber - lettersCount) / 2);
  return positionIndexStart;
}

function retunrRowNumber(i) {
  if (i == 0 || i == 3) {
    return numbersOfBlocksFields;
  } else if (i == 1 || i == 2) {
    return numbersOfBlocksFields;
  }
}

function addToTableWord(
  table,
  tableLength,
  lettersCount,
  catchword,
  positionNumberStart
) {
  let splitedWord = catchword.split("");
  let w = 0;
  for (i = 0; i < tableLength; i++) {
    if (i > positionNumberStart - 1 && i < positionNumberStart + lettersCount) {
      table.push(splitedWord[w]);
      w++;
    } else {
      table.push("_");
    }
  }
}

function cleanTable() {
  firstRowLettersField = [];
  secondRowLettersField = [];
  thirdRowLettersField = [];
  fourthRowLettersField = [];
}

/*  OLD FUNCTION*/
function returnRowName(row) {
  let [rowName] = Object.keys({ row });

  return rowName;
}

function checkingPickedLetter(word, letterPicked) {
  // dla jednego slowa
  let positions = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letterPicked) {
      positions.push(i);
    }
  }
  // testing structure
  if (positions.length > 0) {
  } else {
  }
  return positions;
}

function addLetterOnPositionRow(positions, letter, i, positionWordStart) {
  // for all letters in row
  categoryAndCatchword.catchwordCounter += positions.length;
  let rowName = listOfRowsWord[i];

  for (i = 0; i < positions.length; i++) {
    let container = document.getElementById(
      `${positions[i] + 1 + positionWordStart}_${rowName}`
    );

    container.textContent = letter;
  }
  categoryAndCatchword.checkWordsFull();
}

function pickedCachwordObject(catchword) {
  let splitedCatchword = catchword.split(" ");
  let catchwordObject = {
    catchword: catchword,
    listOfWords: lowerAllWordsInList(splitedCatchword),
    numberOfWords: splitedCatchword.length,
  };
  // console.log(catchwordObject.listOfWords);

  return catchwordObject;
}

function checkingAllRowsForLetter(letter) {
  let booleanLetterInWords = false;

  // add logic if word in row
  let positionPickedLetter = checkingPickedLetter(gameObject.catchword, letter);
  if (positionPickedLetter.length) {
    booleanLetterInWords = true;
    addLetterOnPositionRow(
      positionPickedLetter,
      letter,
      orderWordIndexStart[gameObject.numberOfWords - 1] + 0,
      positionIndexStartLetter(gameObject.catchword, 0)
    );
  } else {
    // tracisz zycie
    // console.log("No letter in word");
  }

  return booleanLetterInWords;
}

// console.log("list of rows words");

/*

Testing area

*/

// checkingAllRowsForLetter("l");
// checkingAllRowsForLetter("u");
// checkingAllRowsForLetter("b");
// checkingAllRowsForLetter("i");
// checkingAllRowsForLetter("e");
// checkingAllRowsForLetter("p");
// checkingAllRowsForLetter("a");
// checkingAllRowsForLetter("c");
// checkingAllRowsForLetter("");
// checkingAllRowsForLetter("s");
function checkIfValueIsGreaterThenFullCircle(value) {
  if (value + 90 > 360) {
    return value + 90 - 360;
  }
  return value + 90;
}

function showError(message) {
  const errorDiv = document.getElementById("errorMessage");
  errorDiv.textContent = message;
  let timeoutId;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    errorDiv.textContent = "";
  }, 2000);
}

/*

Wheel 

*/

/*

 Wheel Functions 

*/

function getLables(data) {
  let labels = [];

  for (i = 0; data.length > i; i++) {
    labels.push(i + 1);
  }
  return labels;
}
function createDegreeValues(dataValues) {
  let values = [];
  let minDegree = 0;
  let pieceDegree = 360 / dataValues.length;
  // console.log(pieceDegree);
  for (i = 0; dataValues.length > i; i++) {
    if (i == 0) {
      values.push({
        minDegree: minDegree,
        maxDegree: minDegree + pieceDegree,
        value: dataValues[i],
      });
    } else {
      values.push({
        minDegree: minDegree + 1,
        maxDegree: minDegree + pieceDegree,
        value: dataValues[i],
      });
    }
    minDegree = pieceDegree + minDegree;
  }
  return values;
}
function reverseLabelValues(dataValues) {
  const formatedValues = [];

  const dataValuesDivided = dataValues.length / 4;

  for (i = 0; dataValues.length > i; i++) {
    if (i == 0) {
      const tempList = [];

      for (j = 0; dataValuesDivided > j; j++) {
        tempList.push(dataValues[j]);
      }
      tempList.reverse().forEach((element) => {
        formatedValues.push(element);
      });
      formatedValues.concat(tempList);
    }
    if (i >= dataValuesDivided) {
      // console.log(dataValues.length - i + dataValuesDivided - 1);
      formatedValues.push(
        dataValues[dataValues.length - i + dataValuesDivided - 1]
      );
    }
  }

  return formatedValues;
}
function createData(dataValues) {
  const data = [];
  for (i = 0; dataValues.length > i; i++) {
    data.push(1);
  }
  return data;
}

let rotationValues = createDegreeValues(valuesWheel);

// console.log(rotationValues);
let dataSetToChart = createData(valuesWheel);

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    // labels: getLables(rotationValues),
    labels: reverseLabelValues(valuesWheel),
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: dataSetToChart,
      },
    ],
  },
  options: {
    //Responsive chart
    elements: {
      arc: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderColor: "black",
      },
    },
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: false,
      datalabels: {
        borderColor: "black",
        // rotation: 60,
        color: "#ffffff",
        align: "center",
        transform: "45%",

        // rotation: "45",

        rotation: function (ctx) {
          return (
            rotationValues[ctx.dataIndex].minDegree +
            ctx.chart.options.rotation +
            90 +
            circleRotationHelper.degree
            // 290
          );
        },
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20, family: "Peralta" },
      },
      display: "auto",
    },
  },
});

myChart.defaults.elements.arc.borderColor = "#36A2EB";
// myChart.defaults.borderColor = ;

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  let wValue = checkIfValueIsGreaterThenFullCircle(angleValue);

  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (wValue >= i.minDegree && wValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Wynik: ${i.value}</p>`;

      game.disableSpinWheel();
      // value from wheel
      game.spinWheel(i.value);
      break;
    }
  }
};
