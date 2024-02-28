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

// adding first and last row of letters

for (i = 0; i < 16; i++) {
  addInputField("firstRowLettersField", i + 1);
  addInputField("fourthRowLettersField", i + 1);
}

for (i = 0; i < 18; i++) {
  addInputField("secondRowLettersField", i + 1);
  addInputField("thirdRowLettersField", i + 1);
}

let pickedWord = "Kambodza";
let gameObject = {};

function countLettersInWord(word) {
  return word.split("").length;
}

function startGame(Catchwords) {
  gameObject = pickedCachwordObject(Catchwords);
  putAllWords(gameObject.listOfWords);
}

function putAllWords(listCatchword) {
  // dodaje slowa do tabel

  if (listOfRowsWord.length > 5) {
    // losowanie nowego hasla
  } else {
    console.log(listCatchword);
    const wordsArrayElements = (element, index /*, array */) => {
      let positionOnTable = orderWordIndexStart[listCatchword.length - 1];
      let indexListOfRowsWord = positionOnTable + index;
      console.log(indexListOfRowsWord);
      console.log(element);
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
  if (positions.length > 0) {
    console.log(
      `The letter "${letterPicked}" is in the word "${word}" at positions: ${positions.join(
        ", "
      )}.`
    );
  } else {
    console.log(`The letter "${letterPicked}" is not in the word "${word}".`);
  }
  return positions;
}

function addLetterOnPositionRow(positions, letter, i, positionWordStart) {
  // dla jednego slowa i jednej rzedu
  let rowName = listOfRowsWord[i];

  for (i = 0; i < positions.length; i++) {
    let container = document.getElementById(
      `${positions[i] + 1 + positionWordStart}_${rowName}`
    );
    console.log("jest litera a");
    container.textContent = letter;
  }
}

function pickedCachwordObject(catchword) {
  let splitedCatchword = catchword.split(" ");

  let catchwordObject = {
    listOfWords: splitedCatchword,
    numberOfWords: splitedCatchword.length,
  };

  return catchwordObject;
}

function checkingAllRowsForLetter(letter) {
  /* POKAZUJE MI DOBRZE */

  for (i = 0; i < gameObject.numberOfWords; i++) {
    // add logic if word in row
    let positionPickedLetter = checkingPickedLetter(
      gameObject.listOfWords[i],
      letter
    );

    if (positionPickedLetter.length) {
      addLetterOnPositionRow(
        positionPickedLetter,
        letter,
        i,
        positionIndexStartLetter(gameObject.listOfWords[i], i)
      );
    } else {
      // tracisz zycie
      console.log("No letter in word");
    }
  }
}

// console.log("list of rows words");
console.log(listOfRowsWord);

// putEmptyWord("kambodza", 1, 0);

startGame("lubie róże górze garmadużedeee");
checkingAllRowsForLetter("a");
checkingAllRowsForLetter("G");
checkingAllRowsForLetter("r");
checkingAllRowsForLetter("e");

class Player {
  constructor(name, playerLife) {
    this.name = name;
    this.playerLife = playerLife;
  }

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
}

const player = new Player("maciej", 5);
addLife(5);

// in new game start creating new life ()

// function picked

// 1 word => second row || 2 words => second third || 3 words => first second third

/*

Wheel logic

*/

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// how big and how many wheels are and values on wheel
const valuesWheel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function createDegreeValues(dataValues) {
  let values = [];
  let minDegree = 0;
  let pieceDegree = 360 / dataValues.length;
  console.log(pieceDegree);
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
      console.log(dataValues.length - i + dataValuesDivided - 1);
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

console.log(reverseLabelValues(valuesWheel));
console.log("test");
const rotationValuesTest = createDegreeValues(valuesWheel);
console.log(rotationValuesTest);
console.log("test");

let rotationValues = createDegreeValues(valuesWheel);

function getLables(data) {
  let labels = [];

  for (i = 0; data.length > i; i++) {
    labels.push(i + 1);
  }
  return labels;
}
//background color for each piece
var pieColors = ["#8b35bc", "#006600"];
//Create chart
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
        data: createData(valuesWheel),
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
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
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
      spinBtn.disabled = false;
      break;
    }
  }
};
//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * 360);
  console.log(randomDegree);
  // randomDegree = 100;
  // let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      // console.log(count);
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    }
    if (count > 5 && myChart.options.rotation == randomDegree) {
      console.log("myChart.options.rotation");
      console.log(myChart.options.rotation);

      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
