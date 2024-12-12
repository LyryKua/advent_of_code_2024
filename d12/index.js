import {
  addVectors,
  getInput,
  isArrayInclude,
  isElemEqual,
  isInside,
  parseInputToMap,
  printMap,
  putChrInMap,
} from '../lib/index.js';

const DAY = 12;
const NAME = `\n\n--- Day ${DAY}: Garden Groups ---`;

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param origin {string}
 * @param visited {number[][]}
 */
function traceMap(map, start, origin, visited) {
  let left = addVectors(start, [0, -1]);
  if (isInside(map, left) && !isArrayInclude(visited, left) && isElemEqual(map, left, origin)) {
    visited.push(left);
    traceMap(map, left, origin, visited);
  }

  let right = addVectors(start, [0, 1]);
  if (isInside(map, right) && !isArrayInclude(visited, right) && isElemEqual(map, right, origin)) {
    visited.push(right);
    traceMap(map, right, origin, visited);
  }

  let top = addVectors(start, [-1, 0]);
  if (isInside(map, left) && !isArrayInclude(visited, top) && isElemEqual(map, top, origin)) {
    visited.push(top);
    traceMap(map, top, origin, visited);
  }

  let bottom = addVectors(start, [1, 0]);
  if (isInside(map, left) && !isArrayInclude(visited, bottom) && isElemEqual(map, bottom, origin)) {
    visited.push(bottom);
    traceMap(map, bottom, origin, visited);
  }
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  return map.length;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let map = parseInputToMap(input);
  let start = [0, 0];
  let origin = map[start[0]][start[1]];
  /** @type {number[][]} */
  let visited = [start];

  traceMap(map, start, origin, visited);
  console.log(visited);
  printMap(map);
  // switch (part) {
  //   case 1:
  //     return part1(map);
  //   case 2:
  //     return part;
  //   default:
  //     throw new Error(`Only 2 parts. There is no part ${part}`);
  // }
}

let example = `
AAAAAAA
BBCDAAA
BBAAAAE
EEECAAA
`;
let result = main(example, 1);
console.log('result:', result);

// console.log(NAME)
// getInput(DAY)
//   .then(input => {
//     const part1Result = main(input, 1)
//     console.log('p1:', part1Result)
//
//     const part2Result = main(input, 2)
//     console.log('p2:', part2Result)
//   })
