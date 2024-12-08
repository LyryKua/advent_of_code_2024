import { getInput, parseInput } from '../lib/index.js';

const DAY = 7;
const NAME = `\n\n--- Day ${DAY}: Bridge Repair ---`;

/**
 * @param left {number|string[]}
 * @param right {number[]}
 */
function setOperators(left, right) {
  if (right.length === 1) {
    return [
      [...left, right[0]],
    ];
  }
  const [firstRight, ...restRight] = right;
  const newLeftWithPlus = [...left, firstRight, '+'];
  const newLeftWithMult = [...left, firstRight, '*'];

  return [...setOperators(newLeftWithMult, restRight), ...setOperators(newLeftWithPlus, restRight)];
}

/**
 * @param left {number|string[]}
 * @param right {number[]}
 */
function setOperators2(left, right) {
  if (right.length === 1) {
    return [
      [...left, right[0]],
    ];
  }
  const [firstRight, ...restRight] = right;
  const newLeftWithPlus = [...left, firstRight, '+'];
  const newLeftWithMult = [...left, firstRight, '*'];
  const newLeftWithConc = [...left, firstRight, '|'];

  return [
    ...setOperators2(newLeftWithMult, restRight),
    ...setOperators2(newLeftWithPlus, restRight),
    ...setOperators2(newLeftWithConc, restRight)
  ];
}


/**
 * @param arr {[number, number[]]}
 * @returns {number}
 */
function part1(arr) {
  let nbr = 0;
  for (let i = 0; i < arr.length; i++) {
    const [calibrationResult, operands] = arr[i];
    const withOperators = setOperators([], operands);
    for (let k = 0; k < withOperators.length; k++) {
      let result = withOperators[k][0];
      for (let j = 2; j < withOperators[k].length; j += 2) {
        if (withOperators[k][j - 1] === '*') {
          result *= withOperators[k][j];
        } else if (withOperators[k][j - 1] === '+') {
          result += withOperators[k][j];
        }
      }
      if (result === calibrationResult) {
        nbr += calibrationResult;
        break;
      }
    }
  }
  return nbr;
}

/**
 * @param arr {[number, number[]]}
 * @returns {number}
 */
function part2(arr) {
  let nbr = 0;
  for (let i = 0; i < arr.length; i++) {
    const [calibrationResult, operands] = arr[i];
    const withOperators = setOperators2([], operands);
    for (let k = 0; k < withOperators.length; k++) {
      let result = withOperators[k][0];
      for (let j = 2; j < withOperators[k].length; j += 2) {
        if (withOperators[k][j - 1] === '*') {
          result *= withOperators[k][j];
        } else if (withOperators[k][j - 1] === '+') {
          result += withOperators[k][j];
        } else if (withOperators[k][j - 1] === '|') {
          result = parseInt(result.toString() + withOperators[k][j].toString())
        }
      }
      if (result === calibrationResult) {
        nbr += calibrationResult;
        break;
      }
    }
  }
  return nbr;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const arr = parseInput(input)
    .map(row => row.split(': '))
    .map(([calibrationResult, operands]) => [parseInt(calibrationResult), operands.split(' ').map(operand => parseInt(operand))]);

  switch (part) {
    case 1:
      return part1(arr);
    case 2:
      return part2(arr);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });