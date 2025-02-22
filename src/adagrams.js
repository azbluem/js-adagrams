import _ from 'underscore';
import {letters, letterDict} from 'CONSTANTS.js'

export class Adagrams {

static drawLetters = () => {
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

static usesAvailableLetters = (input, lettersInHand) => {
  const hand = new MultiSet(lettersInHand);
  const word = new MultiSet(input);
  return word.isSubSet(hand);
};

static scoreWord = (word) => {
  let score = 0;
  let nonLetterCount = 0;
  word = word.toUpperCase();
  for (const letter of word){
    if (letter>='A' && letter<='Z'){
      score += letterDict[letter];
    } else {
      nonLetterCount++;
    }
  };
  if (word.length-nonLetterCount > 6) {
    score += 8;
  };
  return score;
};

static highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let maxi = 0;
  let returnArray = [];
  for (const word of words) {
    let currentScore = Adagrams.scoreWord(word);
    if (currentScore > maxi) {
      returnArray = [word];
      maxi = currentScore;
    }
    else if (currentScore === maxi) {
      returnArray.push(word);
    };
  };

  const word = AGUtilities.AGString(returnArray);
  return {"score":maxi, "word":word};
};};

class MultiSet {

  constructor(aString) {
    this.mSet = MultiSet.gimmeMSet(aString);
  };

  isSubSet(superSet) {
    for (const letter in this.mSet) {
      if (!(letter in superSet.mSet) ||(superSet.mSet[letter]<this.mSet[letter])) {
        return false;
      }
    };
    return true;
  };

  static gimmeMSet (aString) {
    const returnObject = {}
    for (const letter of aString){
      if (!(letter in returnObject)) {
        returnObject[letter] = 0
      };
      returnObject[letter]++;
    }
    return returnObject;
  };
};

class AGUtilities {
  static AGString = (returnArray) => {
    if (returnArray.length>1) {
      return AGUtilities.pickString(returnArray);
    }
    else {
      return returnArray[0];
    };
  }
  static pickString = (arr) => {
    let word = "XXXXXXXXXXX"
    for (let i=0;i<arr.length;i++) {
      if (arr[i].length===10 && word.length!=10) {
        return arr[i];
      }
      else if (word.length > arr[i].length) {
        word = arr[i];
      };
    };
    return word;
  };};

export default Adagrams
// module.exports =  {Adagrams}
