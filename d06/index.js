import { findChar, getInput, isInside, parseInputToMap, printMap, turn90DegreeRight } from '../lib/index.js';

const DAY = 6;
const NAME = `\n\n--- Day ${DAY}: Guard Gallivant ---`;

/**
 * @param arr {[number,number][]}
 * @returns {[number, number][]}
 */
function uniq(arr) {
  /** @type {Map<string, [number, number]>} */
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i].join();
    if (map.has(key)) {
      continue;
    }
    map.set(key, arr[i]);
  }
  return [...map.values()];
}

/**
 * @param map {string[][]}
 * @param x {number}
 * @param y {number}
 * @returns {[number,number][]}
 */
function traverseMap(map, x, y) {
  let dirX = 0;
  let dirY = -1;
  /** @type {[number, number][]} */
  const visitedCells = [];
  while (isInside(map, x, y)) {
    visitedCells.push([y, x]);
    const newX = x + dirX;
    const newY = y + dirY;
    if (isInside(map, newX, newY) && map[newY][newX] === '#') {
      [dirX, dirY] = turn90DegreeRight(dirX, dirY);
    }
    x += dirX;
    y += dirY;
    if (isInside(map, x, y) && map[y][x] === '#') {
      x -= dirX;
      y -= dirY;
      [dirX, dirY] = turn90DegreeRight(dirX, dirY);
    }
  }

  return visitedCells;
}

/**
 * @param map {string[][]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function doesItLoop(map, x, y) {
  let dirX = 0;
  let dirY = -1;
  const obst = new Map();
  while (isInside(map, x, y)) {
    const newX = x + dirX;
    const newY = y + dirY;
    if (isInside(map, newX, newY) && map[newY][newX] === '#') {
      const key = [newY, newX].join();
      const val = obst.get(key);
      obst.set(key, val ? val + 1 : 1);
      if (val > 1) {
        return true;
      }
      [dirX, dirY] = turn90DegreeRight(dirX, dirY);
    }
    x += dirX;
    y += dirY;
    if (isInside(map, x, y) && map[y][x] === '#') {
      x -= dirX;
      y -= dirY;
      [dirX, dirY] = turn90DegreeRight(dirX, dirY);
    }
  }

  return false;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  const start = findChar(map, '^');
  const visitedCells = traverseMap(map, start.x, start.y);

  return uniq(visitedCells).length;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part2(map) {
  /** @type {Map<string, boolean>} */
  const obst = new Map();
  const start = findChar(map, '^');
  const visitedCells = traverseMap(map, start.x, start.y);

  for (let i = 0; i < visitedCells.length - 1; i++) {
    let dirX = visitedCells[i + 1][1] - visitedCells[i][1];
    let dirY = visitedCells[i + 1][0] - visitedCells[i][0];
    if (
      !isInside(map, visitedCells[i][1] + dirX, visitedCells[i][0] + dirY)
      || (visitedCells[i][1] + dirX === start.x && visitedCells[i][0] + dirY === start.y)
    ) {
      continue;
    }
    const originChar = map[visitedCells[i][0] + dirY][visitedCells[i][1] + dirX];
    map[visitedCells[i][0] + dirY][visitedCells[i][1] + dirX] = '#';
    if (doesItLoop(map, start.x, start.y)) {
      obst.set([visitedCells[i][0] + dirY, visitedCells[i][1] + dirX].join(), true);
    }
    map[visitedCells[i][0] + dirY][visitedCells[i][1] + dirX] = originChar;
  }

  return obst.size;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const map = parseInputToMap(input);
  switch (part) {
    case 1:
      return part1(map);
    case 2:
      return part2(map);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })