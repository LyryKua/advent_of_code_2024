import { getInput, parseInputToMap } from '../lib/index.js';
import { solvePart1 } from "./part1.js";
import { solvePart2 } from "./part2.js";

const DAY = 15;
const NAME = `\n\n--- Day ${DAY}: Warehouse Woes ---`;

/**
 * @param input {string}
 * @returns {number[][]}
 */
function parseDirections(input) {
  return input.trim().split('').map(it => {
    if (it === '>') return [0, 1];
    if (it === '<') return [0, -1];
    if (it === '^') return [-1, 0];
    if (it === 'v') return [1, 0];
    return [0, 0];
  });
}

/**
 * @param input {string}
 * @returns {[string[][], Set<number[]>]}
 */
function parseInputPart1(input) {
  let [mapInput, directionsInput] = input.trim().split('\n\n');

  let map = parseInputToMap(mapInput);
  let directions = parseDirections(directionsInput);

  return [map, directions];
}

/**
 * @param input {string}
 * @returns {[string[][], number[][]]}
 */
function parseInputPart2(input) {
  let [mapInput, directionsInput] = input.trim().split('\n\n');

  let map = mapInput.trim().split(('\n')).map(row => {
    let newRow = row.replaceAll('#', '##');
    newRow = newRow.replaceAll('O', '[]');
    newRow = newRow.replaceAll('.', '..');
    newRow = newRow.replaceAll('@', '@.');
    return newRow.split('');
  });
  let directions = parseDirections(directionsInput);

  return [map, directions];
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  switch (part) {
    case 1:
      return solvePart1(...parseInputPart1(input));
    case 2:
      return solvePart2(...parseInputPart2(input));
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
