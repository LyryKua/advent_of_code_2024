import { addVectors, findChar, isArrayInclude, isArraysEqual, printMap } from '../lib/index.js';

/**
 * @param map {string[][]}
 * @returns {number}
 */
function countBoxes(map) {
  let boxes = findChar(map, '[');
  let nbr = 0;
  for (let i = 0; i < boxes.length; i++) {
    nbr += boxes[i][0] * 100 + boxes[i][1];
  }

  return nbr;
}

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param direction {number[]}
 * @returns {string[][]}
 */
function moveBox(map, start, direction) {
  let startChr = map[start[0]][start[1]];
  let left = startChr === '[' ? [...start] : addVectors(start, [0, -1]);
  let leftChr = map[left[0]][left[1]];
  let right = startChr === '[' ? addVectors(start, [0, 1]) : [...start];
  let rightChr = map[right[0]][right[1]];
  let newLeft = addVectors(left, direction);
  let newRight = addVectors(right, direction);

  if (isArraysEqual(direction, [0, -1])) {
    if (map[newLeft[0]][newLeft[1]] === ']') moveBox(map, newLeft, direction);

    if (map[newLeft[0]][newLeft[1]] === '.') {
      map[newLeft[0]][newLeft[1]] = '[';
      map[newRight[0]][newRight[1]] = ']';
      map[right[0]][right[1]] = '.';
    }
  } else if (isArraysEqual(direction, [0, 1])) {
    if (map[newRight[0]][newRight[1]] === '[') moveBox(map, newRight, direction);

    if (map[newRight[0]][newRight[1]] === '.') {
      map[newLeft[0]][newLeft[1]] = '[';
      map[newRight[0]][newRight[1]] = ']';
      map[left[0]][left[1]] = '.';
    }
  } else {
    if (map[newLeft[0]][newLeft[1]] === '[' || map[newLeft[0]][newLeft[1]] === ']') moveBox(map, newLeft, direction);
    if (map[newRight[0]][newRight[1]] === '[' || map[newRight[0]][newRight[1]] === ']') moveBox(map, newRight, direction);

    if (map[newLeft[0]][newLeft[1]] === '.' && map[newRight[0]][newRight[1]] === '.') {
      map[newLeft[0]][newLeft[1]] = leftChr;
      map[newRight[0]][newRight[1]] = rightChr;
      map[left[0]][left[1]] = '.';
      map[right[0]][right[1]] = '.';
    }

  }
  return map;
}


/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param direction {number[]}
 * @returns {string[][]}
 */
function moveRobot(map, start, direction) {
  let startChr = map[start[0]][start[1]];
  let newStart = addVectors(start, direction);
  if (map[newStart[0]][newStart[1]] === '[' || map[newStart[0]][newStart[1]] === ']') {
    moveBox(map, newStart, direction);
  }
  if (map[newStart[0]][newStart[1]] === '.') {
    map[newStart[0]][newStart[1]] = startChr;
    map[start[0]][start[1]] = '.';
  }

  return map;
}

/**
 * @param map {string[][]}
 * @param directions {Set<number[]>}
 * @returns {number}
 */
export function solvePart2(map, directions) {
  // printMap(map);
  for (let direction of directions) {
    let [start] = findChar(map, '@');
    map = moveRobot(map, start, direction);
  }
  // printMap(map);

  return countBoxes(map);
}
