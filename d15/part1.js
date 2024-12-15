import { addVectors, findChar } from '../lib/index.js';

/**
 * @param map {string[][]}
 * @param start {number[]}
 * @param direction {number[]}
 * @returns {string[][]}
 */
function moveRobot(map, start, direction) {
  let startChr = map[start[0]][start[1]];
  let newStart = addVectors(start, direction);
  if (map[newStart[0]][newStart[1]] === 'O') moveRobot(map, newStart, direction);
  if (map[newStart[0]][newStart[1]] === '.') {
    map[newStart[0]][newStart[1]] = startChr;
    map[start[0]][start[1]] = '.';
  }

  return map;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function countBoxes(map) {
  let boxes = findChar(map, 'O');
  let nbr = 0;
  for (let i = 0; i < boxes.length; i++) {
    nbr += boxes[i][0] * 100 + boxes[i][1];
  }

  return nbr;
}

/**
 * @param map {string[][]}
 * @param directions {Set<number[]>}
 * @returns {number}
 */
export function solvePart1(map, directions) {

  for (let direction of directions) {
    let [start] = findChar(map, '@');
    map = moveRobot(map, start, direction);
  }

  return countBoxes(map);
}
