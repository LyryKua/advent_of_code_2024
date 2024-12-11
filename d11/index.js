import { getInput } from '../lib/index.js';

const DAY = 11;
const NAME = `\n\n--- Day ${DAY}: Plutonian Pebbles ---`;

/**
 * @param nbr {number}
 * @returns {number}
 */
function countNbrLen(nbr) {
  return nbr.toString().length;
}

/**
 * @param nbr {number}
 * @returns {number[]}
 */
function splitNbr(nbr) {
  let str = nbr.toString();
  return [str.substring(0, str.length / 2), str.substring(str.length / 2)].map(it => parseInt(it));
}

/**
 * @param stone {number}
 * @param map {Map<number, number>}
 * @param iterations {number}
 * @returns {number}
 */
function calcLen(stone, map, iterations) {
  let savedLen = map.get(stone);
  if (savedLen === undefined) {
    if (stone === 0) {
      savedLen = 1;
    } else if (countNbrLen(stone) % 2 === 0) {
      savedLen = 2;
    } else {
      savedLen = 1;
    }
    map.set(stone, savedLen);
  }
  if (iterations === 1) {
    return savedLen;
  }
  let len = 0;
  if (savedLen === 1) {
    len += calcLen(stone === 0 ? 1 : stone * 2024, map, iterations - 1);
  } else {
    let split = splitNbr(stone);
    len += calcLen(split[0], map, iterations - 1);
    len += calcLen(split[1], map, iterations - 1);
  }
  return len;
}

/**
 * @param stones {number[]}
 * @param iterations {number}
 * @returns {number}
 */
function part(stones, iterations) {
  /** @type {Map<number, number>} */
  let map = new Map();
  let newStones = stones;
  let newLen = 0;
  for (let i = 0; i < newStones.length; i++) {
    newLen += calcLen(newStones[i], map, iterations);
  }

  return newLen;
}

/**
 * @param input {string}
 * @param n {number}
 * @returns {number}
 */
function main(input, n) {
  const arr = input.trim().split(' ').map(it => parseInt(it));
  return part(arr, n === 1 ? 25 : 75);
}

// let example = '0';
// let example = '125 17';
// let example = '253000 1 7'
// let example = '512 72 2024 2 0 2 4 2867 6032'
// let example = '4 0 4 8 20 24 4 0 4 8 8 0 9 6'
// let result = main(example, 1);
// console.log(result);

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });