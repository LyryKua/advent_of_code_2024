import { addVectors, createMap, getInput, getNeighbors, isArrayInclude, isInside, printMap } from '../lib/index.js';

const DAY = 18;
const NAME = `\n\n--- Day ${DAY}: RAM Run ---`;

const HEIGHT = 7;
const WIDTH = 7;
const NBR_BYTES = 12;
const START = [0, 0];
const END = [HEIGHT - 1, WIDTH - 1];

/**
 * @param walls {number[][]}
 * @param paths {number[][]}
 */
function printGrid(walls, paths) {
  for (let i = 0; i < HEIGHT; i++) {
    let line = [];
    for (let j = 0; j < WIDTH; j++) {
      if (isArrayInclude(walls, [i, j])) {
        line.push('#');
      } else if (isArrayInclude(paths, [i, j])) {
        line.push('O');
      } else {
        line.push('.');
      }
    }
    console.log(line.join(''));
  }
  console.log();
}

/**
 * @param map {Map<string, number[]>}
 * @param end {number[]}
 * @returns {number[][]}
 */
function getPath(map, end) {
  let current = end.join();
  let path = [end];
  while (map.has(current)) {
    let it = map.get(current);
    path.push(it);
    current = it.join();
  }
  return path.reverse();
}

/**
 * @param bytes {number[][]}
 * @returns {number[][]}
 */
function part1(bytes) {
  let map = new Map();
  let queue = [START];
  let visited = [];
  let distances = createMap(HEIGHT, WIDTH, Infinity);
  distances[START[0]][START[1]] = 0;
  while (queue.length > 0) {
    let current = queue.shift();
    visited.push(current);
    let left = addVectors(current, [0, -1]);
    if (!isArrayInclude(visited, left) && left[0] >= 0 && left[0] < HEIGHT && left[1] >= 0 && left[1] < WIDTH && !isArrayInclude(bytes, left)) {
      queue.push(left);
      if (distances[left[0]][left[1]] > distances[current[0]][current[1]] + 1) {
        map.set(left.join(), current);
      }
      distances[left[0]][left[1]] = Math.min(distances[left[0]][left[1]], distances[current[0]][current[1]] + 1);
    }
    let bottom = addVectors(current, [1, 0]);
    if (!isArrayInclude(visited, bottom) && bottom[0] >= 0 && bottom[0] < HEIGHT && bottom[1] >= 0 && bottom[1] < WIDTH && !isArrayInclude(bytes, bottom)) {
      queue.push(bottom);
      if (distances[bottom[0]][bottom[1]] > distances[current[0]][current[1]] + 1) {
        map.set(bottom.join(), current);
      }
      distances[bottom[0]][bottom[1]] = Math.min(distances[bottom[0]][bottom[1]], distances[current[0]][current[1]] + 1);
    }
    let right = addVectors(current, [0, 1]);
    if (!isArrayInclude(visited, right) && right[0] >= 0 && right[0] < HEIGHT && right[1] >= 0 && right[1] < WIDTH && !isArrayInclude(bytes, right)) {
      queue.push(right);
      if (distances[right[0]][right[1]] > distances[current[0]][current[1]] + 1) {
        map.set(right.join(), current);
      }
      distances[right[0]][right[1]] = Math.min(distances[right[0]][right[1]], distances[current[0]][current[1]] + 1);
    }
    let top = addVectors(current, [-1, 0]);
    if (!isArrayInclude(visited, top) && top[0] >= 0 && top[0] < HEIGHT && top[1] >= 0 && top[1] < WIDTH && !isArrayInclude(bytes, top)) {
      queue.push(top);
      if (distances[top[0]][top[1]] > distances[current[0]][current[1]] + 1) {
        map.set(top.join(), current);
      }
      distances[top[0]][top[1]] = Math.min(distances[top[0]][top[1]], distances[current[0]][current[1]] + 1);
    }
  }
  return getPath(map, END);
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let bytes = input.trim().split('\n').map(m => m.split(',').map(Number).reverse());
  switch (part) {
    case 1: {
      let b = bytes.slice(0, NBR_BYTES);
      let path = part1(b);
      printGrid(b, path);
      return path.length - 1;
    }
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
let result = main(example, 1);
console.log(result);

// console.log(NAME);
// getInput(DAY)
//   .then(input => {
//     const part1Result = main(input, 1);
//     console.log('p1:', part1Result);
//
//     const part2Result = main(input, 2);
//     console.log('p2:', part2Result);
//   });
