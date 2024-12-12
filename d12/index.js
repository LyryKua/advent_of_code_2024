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
 * @param originPosition {number[]}
 * @param hash {Map<string, {coordinates: number[][], area: number, perimeter: number}>}
 */
function traceMap(map, start, originPosition, hash) {
  let origin = map[originPosition[0]][originPosition[1]];
  let visited = hash.get(originPosition.join());

  let left = addVectors(start, [0, -1]);
  if (isInside(map, left) && !isArrayInclude(visited.coordinates, left) && isElemEqual(map, left, origin)) {
    visited.coordinates.push(left);
    visited.area += 1;
    traceMap(map, left, originPosition, hash);
  } else {
    visited.perimeter += isArrayInclude(visited.coordinates, left) ? 0 : 1;
  }

  let right = addVectors(start, [0, 1]);
  if (isInside(map, right) && !isArrayInclude(visited.coordinates, right) && isElemEqual(map, right, origin)) {
    visited.coordinates.push(right);
    visited.area += 1;
    traceMap(map, right, originPosition, hash);
  } else {
    visited.perimeter += isArrayInclude(visited.coordinates, right) ? 0 : 1;
  }

  let top = addVectors(start, [-1, 0]);
  if (isInside(map, left) && !isArrayInclude(visited.coordinates, top) && isElemEqual(map, top, origin)) {
    visited.coordinates.push(top);
    visited.area += 1;
    traceMap(map, top, originPosition, hash);
  } else {
    visited.perimeter += isArrayInclude(visited.coordinates, top) ? 0 : 1;
  }

  let bottom = addVectors(start, [1, 0]);
  if (isInside(map, left) && !isArrayInclude(visited.coordinates, bottom) && isElemEqual(map, bottom, origin)) {
    visited.coordinates.push(bottom);
    visited.area += 1;
    traceMap(map, bottom, originPosition, hash);
  } else {
    visited.perimeter += isArrayInclude(visited.coordinates, bottom) ? 0 : 1;
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
  let start = [1, 2];
  let origin = [...start];
  /** @type {Map<string, {coordinates: number[][], area: number, perimeter: number}>} */
  let visited = new Map();
  visited.set(start.join(), { coordinates: [start], area: 1, perimeter: 0 });

  traceMap(map, start, origin, visited);
  console.log(visited.get(origin.join()));
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
AAAA
BBCD
BBCC
EEEC
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
