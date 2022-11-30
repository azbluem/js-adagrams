import _, { map } from 'underscore';
import {letters, letterDict} from './CONSTANTS.js'

export const drawLetters = () => {
  // Implement this method for wave 1
  const letterSampleArray = [];
  
  for (const letter in letters) {
    for (let i=0;i<letters[letter];i++) {
      letterSampleArray.push(letter);
    };
  };
  const returnLetters = _.sample(letterSampleArray,10);
  return returnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const hand = MultiSet(lettersInHand);
  const word = MultiSet(input);
  for (const letter in word) {
    if (!(letter in hand)) {
      return false;
    }
    hand[letter] = hand[letter] - word[letter];
    if ((hand[letter]<0)) {
      return false;
    };
  };
  return true;
};

const MultiSet = (aString) => {
  const returnObject = {}
  for (const letter of aString){
    if (!(letter in returnObject)) {
      returnObject[letter] = 0
    };
    returnObject[letter]++;
  };
  return returnObject;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  
  let score = 0;
  let nonLetterCount = 0;
  word = word.toUpperCase();
  for (const letter of word){
    if (letter>='A' && letter<='Z'){
      score += letterDict[letter];
    } else {
      nonLetterCount++;
    }
  }
  
  if (word.length-nonLetterCount > 6) {
    score += 8
  };
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let maxi = 0
  let returnArray = []
  for (const word of words) {
    let currentScore = scoreWord(word)
    if (currentScore > maxi) {
      returnArray = [word];
      maxi = currentScore
    }
    else if (currentScore === maxi) {
      returnArray.push(word)
    }
  };
  let word
  if (returnArray.length>1) {
    word =  longestString(returnArray)
  }
  else {
    word = returnArray[0]
  };
  const retValue = {"score":maxi, "word":word}
  return retValue
};

const longestString = (arr) => {
  let word = "XXXXXXXXXXX"
  for (let i=0;i<arr.length;i++) {
    if (arr[i].length===10 && word.length!=10) {
      return arr[i]
    }
    else if (word.length > arr[i].length) {
      word = arr[i]
    };
  };
  return word;
};
