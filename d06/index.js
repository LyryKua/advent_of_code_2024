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
  while (isInside(map, [y, x])) {
    visitedCells.push([y, x]);
    const newX = x + dirX;
    const newY = y + dirY;
    if (isInside(map, [newY, newX]) && map[newY][newX] === '#') {
      [dirY, dirX] = turn90DegreeRight([dirY, dirX]);
    }
    x += dirX;
    y += dirY;
    if (isInside(map, [y, x]) && map[y][x] === '#') {
      x -= dirX;
      y -= dirY;
      [dirY, dirX] = turn90DegreeRight([dirY, dirX]);
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
  while (isInside(map, [y, x])) {
    const newX = x + dirX;
    const newY = y + dirY;
    if (isInside(map, [newY, newX]) && map[newY][newX] === '#') {
      const key = [newY, newX].join();
      const val = obst.get(key);
      obst.set(key, val ? val + 1 : 1);
      if (val > 1) {
        return true;
      }
      [dirY, dirX] = turn90DegreeRight([dirY, dirX]);
    }
    x += dirX;
    y += dirY;
    if (isInside(map, [y, x]) && map[y][x] === '#') {
      x -= dirX;
      y -= dirY;
      [dirY, dirX] = turn90DegreeRight([dirY, dirX]);
    }
  }

  return false;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  const [start] = findChar(map, '^');
  const visitedCells = traverseMap(map, start[1], start[0]);

  return uniq(visitedCells).length;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part2(map) {
  /** @type {Map<string, boolean>} */
  const obst = new Map();
  const [start] = findChar(map, '^');
  const visitedCells = traverseMap(map, start[1], start[0]);

  for (let i = 0; i < visitedCells.length - 1; i++) {
    let dirX = visitedCells[i + 1][1] - visitedCells[i][1];
    let dirY = visitedCells[i + 1][0] - visitedCells[i][0];
    if (
      !isInside(map, [visitedCells[i][0] + dirY, visitedCells[i][1] + dirX])
      || (visitedCells[i][1] + dirX === start[1] && visitedCells[i][0] + dirY === start[0])
    ) {
      continue;
    }
    const originChar = map[visitedCells[i][0] + dirY][visitedCells[i][1] + dirX];
    map[visitedCells[i][0] + dirY][visitedCells[i][1] + dirX] = '#';
    if (doesItLoop(map, start[1], start[0])) {
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