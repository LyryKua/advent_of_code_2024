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
function traverseMap(map, [y, x], path, paths) {
  if (map[y][x] === 9) {
    paths.set([...path[0], y, x].join(), path)
    return
  }

  let top = [y - 1, x];
  if (isInside(map, top) && map[top[0]][top[1]] - map[y][x] === 1) {
    traverseMap(map, top, [...path, top], paths);
  }

  let left = [y, x - 1];
  if (isInside(map, left) && map[left[0]][left[1]] - map[y][x] === 1) {
    traverseMap(map, left, [...path, left], paths);
  }

  let bottom = [y + 1, x];
  if (isInside(map, bottom) && map[bottom[0]][bottom[1]] - map[y][x] === 1) {
    traverseMap(map, bottom, [...path, bottom], paths);
  }

  let right = [y, x + 1];
  if (isInside(map, right) && map[right[0]][right[1]] - map[y][x] === 1) {
    traverseMap(map, right, [...path, right], paths);
  }
}

/**
 * @param map {number[][]}
 * @returns {number}
 */
function part1(map) {
  let starts = findNbr(map, 0);
  let paths = new Map()
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
// ..90..9
// ...1.98
// ...2..7
// 6543456
// 765.987
// 876....
// 987....
// `;
// let result = main(example, 1);
// console.log(result);


console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
