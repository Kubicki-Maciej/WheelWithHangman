// GAME BUILDING PARAMS
const valuesWheel = [10, 50, "bankrut", 500, 50, 100, "tracisz życie", 10];
const pieColors = ["#8b35bc", "#006600"];

// building parms
let orderWordIndexStart = [1, 1, 0, 0];
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
  Object.keys({ fourthRowLettersField })[0],
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

// listeners
btnElementPlayer.addEventListener("click", () => {
  console.log("KLIK");
  player.addPlayerName();
  // and close window

  let popupWindow = document.getElementById("popupWindow");
  popupWindow.classList.add("disablePopup");
});

spinBtn.addEventListener("click", () => {
  game.disableSpinWheel();

  finalValue.innerHTML = `<p>Good Luck!</p>`;
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
      // game.enableConfirmBtn();
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

confirmButton.addEventListener("click", function () {
  game.activateLetterListener();
});

// end listeners

// classes
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
      console.log("zakonczono gre");
    }
  }
  cleanCatchword() {
    this.catchwordCounter = 0;
    this.lettersInCatchword = 0;
    this.catchword = "catchword";
  }
  cleanCategory() {}
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
      console.log("you lose");
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
}

class GameLogic {
  constructor() {
    this.points = 0;
    this.letterUsed = [];
  }

  spinWheel(result) {
    console.log(result);
    /* 
    1 spinujesz wheelem / blokuje spining wheelem
    2 sprawdzany jest wynik 
    3 jezeli jest on pozytywny mozesz wybrac litere
    4 jezeli litera jest to dostajesz punkty z losowania / jezeli nie ma tracisz zycie 
    5 jezeli haslo zostalo odgadniete dostajesz 1000 punktow
    6 odblokowuje spining wheelem
    */
    if (Number.isInteger(result)) {
      console.log(confirmButton.value);
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
    let isLetter = checDkingAllRowsForLetter(letter);
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

  activateLetterListener() {
    console.log("button clicked");
    let pickedLetter = this.letterFromInputElement();
    if (pickedLetter) {
      this.guessLetter(pickedLetter);
      this.disableConfirmBtn();
      this.enableSpinWheel();
    } else {
      showError(`litera ${pickedLetter} została wybrana wczesniej`);
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
    confirmButton.disabled = true;
    confirmButton.classList.add("disabled-btn");
  }
  enableConfirmBtn() {
    confirmButton.disabled = false;
    confirmButton.classList.remove("disabled-btn");
  }
  letterFromInputElement() {
    const inputElement = document.getElementById("singleLetterInput");
    let inputLetter = inputElement.value.toLowerCase();
    if (this.letterUsed.includes(inputLetter)) {
      console.log("do nothing");
      return false;
    } else {
      console.log("dodano litere");
      this.letterUsed.push(inputLetter);
      return inputLetter;
    }
  }
}

// class constructors
const categoryAndCatchword = new CategoryAndCatchword();
const player = new Player(5);
addLife(player.playerLife);
const game = new GameLogic();

// adding first and last row of letters on html
for (i = 0; i < 16; i++) {
  addInputField("firstRowLettersField", i + 1);
  addInputField("fourthRowLettersField", i + 1);
}

for (i = 0; i < 18; i++) {
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

  putAllWords(gameObject.listOfWords);
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
  // dodaje slowa do tabel

  if (listOfRowsWord.length > 5) {
    // losowanie nowego hasla
  } else {
    // console.log(listCatchword);
    const wordsArrayElements = (element, index /*, array */) => {
      let positionOnTable = orderWordIndexStart[listCatchword.length - 1];
      let indexListOfRowsWord = positionOnTable + index;
      // console.log(indexListOfRowsWord);
      // console.log(element);
      putEmptyWord(element, indexListOfRowsWord, index);
    };
    listCatchword.forEach(wordsArrayElements);
    // for (i = 0; i <= listCatchword.length; i++) {
    //   let positionOnTable = orderWordIndexStart[listCatchword.length - 1];
    //   let indexListOfRowsWord = positionOnTable + i;
    //   console.log(indexListOfRowsWord);
    //   console.log(listCatchword[i]);
    //   putEmptyWord(listCatchword[i], indexListOfRowsWord);
    // }
  }
}

function putEmptyWord(catchword, indexStart, index) {
  /*
    Need to split words if catch word length of prase is more then 4 reroll 
*/

  // it's for one word
  let lettersCount = countLettersInWord(catchword);
  let positionNumberStart = positionIndexStartLetter(catchword, index);

  //   adding word to second table
  revealFields(listOfRowsWord[indexStart], lettersCount, positionNumberStart);
  addToTableWord(
    secondRowLettersField,
    retunrRowNumber(index),
    lettersCount,
    catchword,
    positionNumberStart
  );
}

function revealFields(fieldRow, lettersCount, positionNumberStart) {
  for (j = 0; j < lettersCount; j++) {
    let elementField = document.getElementById(
      `${positionNumberStart + j + 1}_${fieldRow}`
    );
    elementField.className = "field open";
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
    return 16;
  } else if (i == 1 || i == 2) {
    return 18;
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
    listOfWords: lowerAllWordsInList(splitedCatchword),
    numberOfWords: splitedCatchword.length,
  };
  // console.log(catchwordObject.listOfWords);

  return catchwordObject;
}

function checkingAllRowsForLetter(letter) {
  let booleanLetterInWords = false;

  for (i = 0; i < gameObject.numberOfWords; i++) {
    // add logic if word in row
    let positionPickedLetter = checkingPickedLetter(
      gameObject.listOfWords[i],
      letter
    );
    if (positionPickedLetter.length) {
      booleanLetterInWords = true;
      addLetterOnPositionRow(
        positionPickedLetter,
        letter,
        orderWordIndexStart[gameObject.numberOfWords - 1] + i,
        positionIndexStartLetter(gameObject.listOfWords[i], i)
      );
    } else {
      // tracisz zycie
      // console.log("No letter in word");
    }
  }

  return booleanLetterInWords;
}

// console.log("list of rows words");

/*

Testing area

*/

startGame("Lubie Placki", "Powiedzenia");

// checkingAllRowsForLetter("l");
// checkingAllRowsForLetter("u");
// checkingAllRowsForLetter("b");
// checkingAllRowsForLetter("i");
// checkingAllRowsForLetter("e");
// checkingAllRowsForLetter("p");
// checkingAllRowsForLetter("a");
// checkingAllRowsForLetter("c");
// checkingAllRowsForLetter("k");
// checkingAllRowsForLetter("s");
// checkingAllRowsForLetter("t");

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
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: false,
      //display labels inside pie chart

      datalabels: {
        // rotation: 60,
        color: "#ffffff",
        // anchor: "center",
        align: "center",
        transform: "45%",
        rotation: function (ctx) {
          // return ctx.dataset.data[ctx.dataIndex].d;
          return rotationValues[ctx.dataIndex].minDegree + 110;
        },
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 15 },
      },
      display: "auto",
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  console.log(angleValue);
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;

      game.disableSpinWheel();
      // value from wheel
      game.spinWheel(i.value);
      // game.enableConfirmBtn();
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 201;
//Start spinning
