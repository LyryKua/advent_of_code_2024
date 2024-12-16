import { addVectors, findChar, isArraysEqual } from '../lib/index.js';

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
 * @returns {boolean}
 */
function canMoveV(map, start, direction) {
  let nextStart = addVectors(start, direction);
  let nextStartChr = map[nextStart[0]][nextStart[1]];
  if (nextStartChr === '#') return false;
  if (nextStartChr === '.') return true;

  let first, other;
  first = canMoveV(map, addVectors(start, direction), direction);
  if (nextStartChr === '[')
    other = canMoveV(map, addVectors(start, [direction[0], direction[1] + 1]), direction);
  else
    other = canMoveV(map, addVectors(start, [direction[0], direction[1] - 1]), direction);
  return (first && other);
}

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param direction {number[]}
 * @returns {string[][]}
 */
function moveV(map, start, direction) {
  let nextStart = addVectors(start, direction);
  let nextStartChr = map[nextStart[0]][nextStart[1]];
  if (nextStartChr === '[') {
    moveV(map, nextStart, direction);
    moveV(map, addVectors(start, [direction[0], direction[1] + 1]), direction);
  } else if (nextStartChr === ']') {
    moveV(map, nextStart, direction);
    moveV(map, addVectors(start, [direction[0], direction[1] - 1]), direction);
  }
  if (map[nextStart[0]][nextStart[1]] === '.') {
    map[nextStart[0]][nextStart[1]] = map[start[0]][start[1]];
    map[start[0]][start[1]] = '.';
  }
}


/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param direction {number[]}
 * @returns {string[][]}
 */
function moveH(map, start, direction) {
  let nextStart = addVectors(start, direction);
  let nextStartChr = map[nextStart[0]][nextStart[1]];
  if (nextStartChr === '[' || nextStartChr === ']') {
    moveH(map, nextStart, direction);
  }
  if (map[nextStart[0]][nextStart[1]] === '.') {
    map[nextStart[0]][nextStart[1]] = map[start[0]][start[1]];
    map[start[0]][start[1]] = '.';
  }
}

/**
 * @param map {string[][]}
 * @param directions {Set<number[]>}
 * @returns {number}
 */
export function solvePart2(map, directions) {
  for (let direction of directions) {
    let [start] = findChar(map, '@');
    if (isArraysEqual(direction, [1, 0]) || isArraysEqual(direction, [-1, 0])) {
      if (canMoveV(map, start, direction)) {
        moveV(map, start, direction);
      }
    } else {
      moveH(map, start, direction);
    }
  }

  return countBoxes(map);
}
