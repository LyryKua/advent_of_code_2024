import { addVectors, createMap, getInput, isArrayInclude } from '../lib/index.js';

const DAY = 18;
const NAME = `\n\n--- Day ${DAY}: RAM Run ---`;

const HEIGHT = 71;
const WIDTH = 71;
const NBR_BYTES = 1024;
const START = [0, 0];
const END = [HEIGHT - 1, WIDTH - 1];

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
  let visited = [START];
  let distances = createMap(HEIGHT, WIDTH, Infinity);
  distances[START[0]][START[1]] = 0;
  while (queue.length > 0) {
    let current = queue.shift();
    let neighbors = [
      addVectors(current, [0, -1]),
      addVectors(current, [1, 0]),
      addVectors(current, [0, 1]),
      addVectors(current, [-1, 0]),
    ];
    for (let neighbor of neighbors) {
      if (!isArrayInclude(visited, neighbor) && neighbor[0] >= 0 && neighbor[0] < HEIGHT && neighbor[1] >= 0 && neighbor[1] < WIDTH && !isArrayInclude(bytes, neighbor)) {
        queue.push(neighbor);
        visited.push(neighbor);
        if (distances[neighbor[0]][neighbor[1]] > distances[current[0]][current[1]] + 1) {
          map.set(neighbor.join(), current);
        }
        distances[neighbor[0]][neighbor[1]] = Math.min(distances[neighbor[0]][neighbor[1]], distances[current[0]][current[1]] + 1);
      }
    }
  }
  return getPath(map, END);
}

/**
 * @param bytes {number[][]}
 * @returns {string}
 */
function part2(bytes) {
  let from = 0;
  let to = bytes.length;
  let lastByte = bytes[NBR_BYTES - 1];
  while (from <= to) {
    let middle = Math.floor((from + to) / 2);
    let b = bytes.slice(0, middle)
    let path = part1(b);
    if (path.length === 1) {
      to = middle - 1;
      lastByte = bytes[middle - 1]
    } else {
      from = middle + 1;
    }
  }
  return lastByte.reverse().join();
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number|string}
 */
function main(input, part) {
  let bytes = input.trim().split('\n').map(m => m.split(',').map(Number).reverse());
  switch (part) {
    case 1: {
      let b = bytes.slice(0, NBR_BYTES);
      let path = part1(b);
      return path.length - 1;
    }
    case 2:
      return part2(bytes);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
