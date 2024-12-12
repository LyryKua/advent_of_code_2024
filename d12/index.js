import {
  addVectors, getAllPossibleCoordinates,
  getInput,
  isArrayInclude, isArraysEqual,
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
 * @param unvisited {Set<string>}
 * @param hash {Map<string, {coordinates: number[][], area: number, extremePoints: number[][]}>}
 */
function traceMap(map, start, originPosition, unvisited, hash) {
  let origin = map[originPosition[0]][originPosition[1]];
  let visited = hash.get(originPosition.join());

  let left = addVectors(start, [0, -1]);
  if (isInside(map, left) && !isArrayInclude(visited.coordinates, left) && isElemEqual(map, left, origin)) {
    unvisited.delete(left.join());
    visited.coordinates.push(left);
    visited.area += 1;
    traceMap(map, left, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, left)) {
    visited.extremePoints.push(left);
  }

  let right = addVectors(start, [0, 1]);
  if (isInside(map, right) && !isArrayInclude(visited.coordinates, right) && isElemEqual(map, right, origin)) {
    unvisited.delete(right.join());
    visited.coordinates.push(right);
    visited.area += 1;
    traceMap(map, right, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, right)) {
    visited.extremePoints.push(right);
  }

  let top = addVectors(start, [-1, 0]);
  if (isInside(map, top) && !isArrayInclude(visited.coordinates, top) && isElemEqual(map, top, origin)) {
    unvisited.delete(top.join());
    visited.coordinates.push(top);
    visited.area += 1;
    traceMap(map, top, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, top)) {
    visited.extremePoints.push(top);
  }

  let bottom = addVectors(start, [1, 0]);
  if (isInside(map, bottom) && !isArrayInclude(visited.coordinates, bottom) && isElemEqual(map, bottom, origin)) {
    unvisited.delete(bottom.join());
    visited.coordinates.push(bottom);
    visited.area += 1;
    traceMap(map, bottom, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, bottom)) {
    visited.extremePoints.push(bottom);
  }
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  let unvisited = getAllPossibleCoordinates(map);
  /** @type {Map<string, {coordinates: number[][], area: number, extremePoints: number[][]}>} */
  let visited = new Map();
  while (unvisited.size) {
    let start = unvisited.values().next().value.split(',').map(Number);
    unvisited.delete(start.join());
    let origin = [...start];
    visited.set(start.join(), { coordinates: [start], area: 1, extremePoints: [] });
    traceMap(map, start, origin, unvisited, visited);
  }

  let price = 0;
  for (let it of visited.values()) {
    price += it.area * it.extremePoints.length;
  }

  return price;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let map = parseInputToMap(input);

  switch (part) {
    case 1:
      return part1(map);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

// let example = `
// AAAA
// BBCD
// BBCC
// EEEC
// `;
// let example = `
// RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE
// `;
// let example = `
// OOOOO
// OXOXO
// OOOOO
// OXOXO
// OOOOO
// `;
// let result = main(example, 1);
// console.log('result:', result);

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
