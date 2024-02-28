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
