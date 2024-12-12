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
 * @returns {number[]}
 */
function blink(stone) {
  if (stone === 0) {
    return [1];
  } else if (countNbrLen(stone) % 2 === 0) {
    return splitNbr(stone);
  } else {
    return [stone * 2024];
  }
}

/**
 * @param stones {number[]}
 * @param iterations {number}
 * @param map {Map<string, number>}
 * @returns {number}
 */
function calcLen(stones, iterations, map) {
  if (iterations === 0) {
    return stones.length;
  }

  let calculatedLen = 0;
  for (let i = 0; i < stones.length; i++) {
    let newStones = blink(stones[i]);
    let key = `${stones[i]}:${iterations}`;
    let savedLen = map.get(key);
    if (savedLen === undefined) {
      let tmp = calcLen(newStones, iterations - 1, map);
      calculatedLen += tmp;
      map.set(key, tmp);
    } else {
      calculatedLen += savedLen;
    }
  }

  return calculatedLen;
}

/**
 * @param stones {number[]}
 * @param iterations {number}
 * @returns {number}
 */
function part(stones, iterations) {
  /** @type {Map<string, number>} */
  let map = new Map();
  let newLen = 0;
  for (let i = 0; i < stones.length; i++) {
    newLen += calcLen([stones[i]], iterations, map);
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

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });