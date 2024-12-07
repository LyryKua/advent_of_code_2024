import { getInput, parseInput } from '../lib/index.js';

const DAY = 7;
const NAME = `\n\n--- Day ${DAY}: Bridge Repair ---`;

/**
 * @param arr {[number, number[]]}
 * @returns {number}
 */
function part1(arr) {
  return arr.length
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
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

const example = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;
const resultExample = main(example, 1);
console.log(resultExample);

/*
console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
 */
