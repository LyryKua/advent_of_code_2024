import { addVectors, findChar, printMap } from '../lib/index.js';

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
  if (map[newStart[0]][newStart[1]] === '#') return map;

  return map;
}

/**
 * @param map {string[][]}
 * @param directions {Set<number[]>}
 * @returns {number}
 */
export function solvePart2(map, directions) {
  printMap(map)
  for (let direction of directions) {
    let [start] = findChar(map, '@');
    map = moveRobot(map, start, direction);
  }

  return 0;
}
