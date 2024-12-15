import { findChar, getInput, parseInputToMap } from '../lib/index.js';

const DAY = 15;
const NAME = `\n\n--- Day ${DAY}: Warehouse Woes ---`;

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param directions {number[][]}
 * @returns {number}
 */
function part1(map, start, directions) {
  return map.length + directions.length;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let [mapInput, directionsInput] = input.trim().split('\n\n');
  let map = parseInputToMap(mapInput);
  let [start] = findChar(map, '@');
  let directions = directionsInput.trim().split('').map(it => {
    if (it === '>') return [0, 1];
    if (it === '<') return [0, -1];
    if (it === '^') return [-1, 0];
    if (it === 'v') return [1, 0];
    return [0, 0];
  });

  switch (part) {
    case 1:
      return part1(map, start, directions);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
########
#......#
#...@..#
#......#
#......#
#......#
#......#
#......#
#......#
#......#
#......#
#......#
########

vvv
`;
let result = main(example, 1);
console.log(result);

// console.log(NAME)
// getInput(DAY)
//   .then(input => {
//     const part1Result = main(input, 1)
//     console.log('p1:', part1Result)
//
//     const part2Result = main(input, 2)
//     console.log('p2:', part2Result)
//   })
