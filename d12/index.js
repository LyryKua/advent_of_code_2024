import {
  addVectors,
  getAllPossibleCoordinates,
  getInput,
  isArrayInclude,
  isElemEqual,
  isInside,
  parseInputToMap,
} from '../lib/index.js';

const DAY = 12;
const NAME = `\n\n--- Day ${DAY}: Garden Groups ---`;

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param originPosition {number[]}
 * @param unvisited {Set<string>}
 * @param hash {Map<string, {coordinates: number[][], extremePoints: number[][]}>}
 */
function traceMap(map, start, originPosition, unvisited, hash) {
  let origin = map[originPosition[0]][originPosition[1]];
  let visited = hash.get(originPosition.join());

  let left = addVectors(start, [0, -1]);
  if (isInside(map, left) && !isArrayInclude(visited.coordinates, left) && isElemEqual(map, left, origin)) {
    unvisited.delete(left.join());
    visited.coordinates.push(left);
    traceMap(map, left, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, left)) {
    visited.extremePoints.push(left);
  }

  let right = addVectors(start, [0, 1]);
  if (isInside(map, right) && !isArrayInclude(visited.coordinates, right) && isElemEqual(map, right, origin)) {
    unvisited.delete(right.join());
    visited.coordinates.push(right);
    traceMap(map, right, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, right)) {
    visited.extremePoints.push(right);
  }

  let top = addVectors(start, [-1, 0]);
  if (isInside(map, top) && !isArrayInclude(visited.coordinates, top) && isElemEqual(map, top, origin)) {
    unvisited.delete(top.join());
    visited.coordinates.push(top);
    traceMap(map, top, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, top)) {
    visited.extremePoints.push(top);
  }

  let bottom = addVectors(start, [1, 0]);
  if (isInside(map, bottom) && !isArrayInclude(visited.coordinates, bottom) && isElemEqual(map, bottom, origin)) {
    unvisited.delete(bottom.join());
    visited.coordinates.push(bottom);
    traceMap(map, bottom, originPosition, unvisited, hash);
  } else if (!isArrayInclude(visited.coordinates, bottom)) {
    visited.extremePoints.push(bottom);
  }
}

/**
 * @param arr {number[][]}
 * @return {number}
 */
function countVertices(arr) {
  /** @type {Set<string>} */
  let set = new Set();

  for (let i = 0; i < arr.length; i++) {
    let left = addVectors(arr[i], [0, -1]);
    let right = addVectors(arr[i], [0, 1]);
    let top = addVectors(arr[i], [-1, 0]);
    let bottom = addVectors(arr[i], [1, 0]);
    let rightTop = addVectors(arr[i], [-1, 1]);
    let rightBottom = addVectors(arr[i], [1, 1]);
    let leftTop = addVectors(arr[i], [-1, -1]);
    let leftBottom = addVectors(arr[i], [1, -1]);

    /*
     *  .#
     *  ..
     */
    if (!isArrayInclude(arr, left) && !isArrayInclude(arr, leftBottom) && !isArrayInclude(arr, bottom)) {
      set.add(JSON.stringify([left, arr[i], bottom, leftBottom]));
    }
    /*
     *  #.
     *  ..
     */
    if (!isArrayInclude(arr, right) && !isArrayInclude(arr, rightBottom) && !isArrayInclude(arr, bottom)) {
      set.add(JSON.stringify([arr[i], right, bottom, rightBottom]));
    }
    /*
     *  ..
     *  .#
     */
    if (!isArrayInclude(arr, top) && !isArrayInclude(arr, leftTop) && !isArrayInclude(arr, left)) {
      set.add(JSON.stringify([leftTop, top, left, arr[i]]));
    }
    /*
     *  ..
     *  #.
     */
    if (!isArrayInclude(arr, top) && !isArrayInclude(arr, rightTop) && !isArrayInclude(arr, right)) {
      set.add(JSON.stringify([top, rightTop, arr[i], right]));
    }

    /*
     *  .#
     *  XX
     *
     *  X#
     *  X.
     *
     *  X#
     *  .X
     */
    if (
      !isArrayInclude(arr, left) && isArrayInclude(arr, leftBottom) && isArrayInclude(arr, bottom)
      || isArrayInclude(arr, left) && isArrayInclude(arr, leftBottom) && !isArrayInclude(arr, bottom)
      || isArrayInclude(arr, left) && !isArrayInclude(arr, leftBottom) && isArrayInclude(arr, bottom)
    ) {
      set.add(JSON.stringify([left, arr[i], leftBottom, bottom]));
    }
    /*
     *  #.
     *  XX
     *
     *  #X
     *  X.
     *
     *  #X
     *  .X
     */
    if (
      !isArrayInclude(arr, right) && isArrayInclude(arr, rightBottom) && isArrayInclude(arr, bottom)
      || isArrayInclude(arr, right) && !isArrayInclude(arr, rightBottom) && isArrayInclude(arr, bottom)
      || isArrayInclude(arr, right) && isArrayInclude(arr, rightBottom) && !isArrayInclude(arr, bottom)
    ) {
      set.add(JSON.stringify([arr[i], right, bottom, rightBottom]));
    }
    /*
     *  X.
     *  X#
     *
     *  .X
     *  X#
     *
     *  XX
     *  .#
     */
    if (
      !isArrayInclude(arr, top) && isArrayInclude(arr, leftTop) && isArrayInclude(arr, left)
      || isArrayInclude(arr, top) && !isArrayInclude(arr, leftTop) && isArrayInclude(arr, left)
      || isArrayInclude(arr, top) && isArrayInclude(arr, leftTop) && !isArrayInclude(arr, left)
    ) {
      set.add(JSON.stringify([leftTop, top, left, arr[i]]));
    }
    /*
     *  X.
     *  #X
     *
     *  .X
     *  #X
     *
     *  XX
     *  #.
     */
    if (
      isArrayInclude(arr, top) && !isArrayInclude(arr, rightTop) && isArrayInclude(arr, right)
      || !isArrayInclude(arr, top) && isArrayInclude(arr, rightTop) && isArrayInclude(arr, right)
      || isArrayInclude(arr, top) && isArrayInclude(arr, rightTop) && !isArrayInclude(arr, right)
    ) {
      set.add(JSON.stringify([top, rightTop, arr[i], right]));
    }

    /*
     *  #.
     *  .X
     */
    if (!isArrayInclude(arr, right) && isArrayInclude(arr, rightBottom) && !isArrayInclude(arr, bottom)) {
      set.add(JSON.stringify([arr[i], right, bottom, rightBottom]));
    }
    /*
     *  X.
     *  .#
     */
    if (!isArrayInclude(arr, top) && isArrayInclude(arr, leftTop) && !isArrayInclude(arr, left)) {
      set.add(JSON.stringify([leftTop, top, rightTop, arr[i]]));
    }
    /*
     *  .X
     *  #.
     */
    if (!isArrayInclude(arr, top) && isArrayInclude(arr, rightTop) && !isArrayInclude(arr, right)) {
      set.add(JSON.stringify([top, rightTop, arr[i], rightTop]));
    }
    /*
     *  .#
     *  X.
     */
    if (!isArrayInclude(arr, left) && isArrayInclude(arr, leftBottom) && !isArrayInclude(arr, bottom)) {
      set.add(JSON.stringify([left, arr[i], leftBottom, bottom]));
    }
  }

  return set.size;
}

/**
 * @param map {string[][]}
 * @param part {number}
 * @returns {number}
 */
function solve(map, part) {
  let unvisited = getAllPossibleCoordinates(map);
  /** @type {Map<string, {coordinates: number[][], extremePoints: number[][]}>} */
  let visited = new Map();
  while (unvisited.size) {
    let start = unvisited.values().next().value.split(',').map(Number);
    unvisited.delete(start.join());
    let origin = [...start];
    visited.set(start.join(), { coordinates: [start], extremePoints: [] });
    traceMap(map, start, origin, unvisited, visited);
  }

  let price = 0;
  for (let it of visited.values()) {
    let perimeter = part === 1 ? it.extremePoints.length : countVertices(it.coordinates);
    price += it.coordinates.length * perimeter;
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

  return solve(map, part);
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
