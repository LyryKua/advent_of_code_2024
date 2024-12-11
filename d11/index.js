import { getInput, parseInput } from '../lib/index.js';

const DAY = 11;
const NAME = `\n\n--- Day ${DAY}: Plutonian Pebbles ---`;
const ITERATIONS = 25;

/**
 * @param nbr {number}
 * @returns {number}
 */
function countNbrLen(nbr) {
  return nbr.toString().length
}

/**
 * @param nbr {number}
 * @returns {number[]}
 */
function splitNbr(nbr) {
  let str = nbr.toString()
  return [str.substring(0, str.length / 2), str.substring(str.length / 2)].map(it => parseInt(it))
}

/**
 * @param stones {number[]}
 * @param iterations {number}
 * @returns {number}
 */
function calculateLenAfterIterations(stones, iterations) {
  let newStones = [stones]
  for (let i = 0; i < ITERATIONS; i++) {
    newStones.push([])
    for (let j = 0; j < newStones[i].length; j++) {
      if (newStones[i][j] === 0) {
        newStones[i + 1].push(1)
      } else if (countNbrLen(newStones[i][j]) % 2 === 0) {
        newStones[i + 1].push(...splitNbr(newStones[i][j]))
      } else {
        newStones[i + 1].push(newStones[i][j] * 2024)
      }
    }
  }

  return newStones[ITERATIONS].length;
}

/**
 * @param stones {number[]}
 * @returns {number}
 */
function part1(stones) {
  let nbr = 0
  for (let i = 0; i < stones.length; i++) {
    nbr += calculateLenAfterIterations([stones[i]], ITERATIONS)
  }

  return nbr;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const arr = input.trim().split(' ').map(it => parseInt(it));

  switch (part) {
    case 1:
      return part1(arr);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

// let example = '0'
// let example = '125 17';
// let example = '253000 1 7'
// let example = '512 72 2024 2 0 2 4 2867 6032'
// let example = '4 0 4 8 20 24 4 0 4 8 8 0 9 6'
// let result = main(example, 1);
// console.log(result);

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
