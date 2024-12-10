import {
  findNbr,
  getInput,
  isInside,
  parseInputToMap,
} from '../lib/index.js';

const DAY = 10;
const NAME = `\n\n--- Day ${DAY}: Hoof It ---`;

/**
 * @param map {number[][]}
 * @param current {number[]}
 * @param path {number[][]}
 * @param paths {Map<string,number[][]>}
 */
function traverseMap1(map, [y, x], path, paths) {
  if (map[y][x] === 9) {
    paths.set([...path[0], y, x].join(), path);
    return;
  }

  let top = [y - 1, x];
  if (isInside(map, top) && map[top[0]][top[1]] - map[y][x] === 1) {
    traverseMap1(map, top, [...path, top], paths);
  }

  let left = [y, x - 1];
  if (isInside(map, left) && map[left[0]][left[1]] - map[y][x] === 1) {
    traverseMap1(map, left, [...path, left], paths);
  }

  let bottom = [y + 1, x];
  if (isInside(map, bottom) && map[bottom[0]][bottom[1]] - map[y][x] === 1) {
    traverseMap1(map, bottom, [...path, bottom], paths);
  }

  let right = [y, x + 1];
  if (isInside(map, right) && map[right[0]][right[1]] - map[y][x] === 1) {
    traverseMap1(map, right, [...path, right], paths);
  }
}

/**
 * @param map {number[][]}
 * @param current {number[]}
 * @param path {number[][]}
 * @param paths {Map<string,number[][]>}
 */
function traverseMap2(map, [y, x], path, paths) {
  if (map[y][x] === 9) {
    paths.set([...path.map(p => p.join())].join('|'), path);
    return;
  }

  let top = [y - 1, x];
  if (isInside(map, top) && map[top[0]][top[1]] - map[y][x] === 1) {
    traverseMap2(map, top, [...path, top], paths);
  }

  let left = [y, x - 1];
  if (isInside(map, left) && map[left[0]][left[1]] - map[y][x] === 1) {
    traverseMap2(map, left, [...path, left], paths);
  }

  let bottom = [y + 1, x];
  if (isInside(map, bottom) && map[bottom[0]][bottom[1]] - map[y][x] === 1) {
    traverseMap2(map, bottom, [...path, bottom], paths);
  }

  let right = [y, x + 1];
  if (isInside(map, right) && map[right[0]][right[1]] - map[y][x] === 1) {
    traverseMap2(map, right, [...path, right], paths);
  }
}

/**
 * @param map {number[][]}
 * @param n {number}
 * @returns {number}
 */
function partN(map, n) {
  let starts = findNbr(map, 0);
  let paths = new Map();
  let traverseMap = n === 1 ? traverseMap1 : traverseMap2;
  for (let i = 0; i < starts.length; i++) {
    traverseMap(map, starts[i], [starts[i]], paths);
  }

  return paths.size;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let map = parseInputToMap(input).map(row => row.map(it => it === '.' ? -1 : parseInt(it)));
  return partN(map, part);
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
