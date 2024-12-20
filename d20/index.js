import {
  addVectors,
  createMap,
  findChar,
  getInput,
  isArrayInclude,
  isArraysEqual,
  parseInputToMap, turn90DegreeLeft, turn90DegreeRight,
} from '../lib/index.js';

const DAY = 20;
const NAME = `\n\n--- Day ${DAY}: Race Condition ---`;

/**
 * @param maze {string[][]}
 * @param path {number[]}
 */
function printMaze(maze, path) {
  for (let i = 0; i < maze.length; i++) {
    let line = [];
    for (let j = 0; j < maze[0].length; j++) {
      if (isArrayInclude(path, [i, j]) && maze[i][j] !== 'S' && maze[i][j] !== 'E') {
        line.push('O');
      } else {
        line.push(maze[i][j]);
      }
    }
    console.log(line.join(''));
  }
}

/**
 * @param path {number[][]}
 */
function findShortCut(path) {
  let allShortCuts = new Map();
  for (let i = 0; i < path.length - 1; i++) {
    let n = [
      addVectors(path[i], [0, 2]),
      addVectors(path[i], [2, 0]),
      addVectors(path[i], [0, -2]),
      addVectors(path[i], [-2, 0]),
    ];
    for (let j = 0; j < n.length; j++) {
      let index = path.findIndex(p => isArraysEqual(p, n[j]));
      if (index > i) {
        allShortCuts.set(n[j].join(), index - i - 1);
      }
    }
  }
  return allShortCuts;
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
 * @param maze {string[][]}
 * @param start {number[]}
 * @param end {number[]}
 * @returns {number[][]}
 */
function part1(maze, start, end) {
  let map = new Map();
  let h = maze.length;
  let w = maze[0].length;
  let queue = [start];
  let visited = [start];
  let distances = createMap(maze.length, maze[0].length, Infinity);
  distances[start[0]][start[1]] = 0;
  while (queue.length > 0) {
    let current = queue.shift();
    let neighbors = [
      addVectors(current, [0, -1]),
      addVectors(current, [1, 0]),
      addVectors(current, [0, 1]),
      addVectors(current, [-1, 0]),
    ];
    if (isArraysEqual(current, end)) break;
    for (let neighbor of neighbors) {
      if (!isArrayInclude(visited, neighbor) && neighbor[0] >= 0 && neighbor[0] < h && neighbor[1] >= 0 && neighbor[1] < w && maze[neighbor[0]][neighbor[1]] !== '#') {
        queue.push(neighbor);
        visited.push(neighbor);
        if (distances[neighbor[0]][neighbor[1]] > distances[current[0]][current[1]] + 1) {
          map.set(neighbor.join(), current);
        }
        distances[neighbor[0]][neighbor[1]] = Math.min(distances[neighbor[0]][neighbor[1]], distances[current[0]][current[1]] + 1);
      }
    }
  }
  return getPath(map, end);
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let maze = parseInputToMap(input);
  let [start] = findChar(maze, 'S');
  let [end] = findChar(maze, 'E');
  switch (part) {
    case 1: {
      let path = part1(maze, start, end);
      // printMaze(maze, path);
      let tmp = findShortCut(path);
      for (let [key, val] of tmp) {
        if (val - 1 === 0) {
          continue;
        }
        console.log(key, val - 1)
      }
      return path.length;
    }
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

// let example = `
// ######
// #....#
// #..#.#
// #..#.#
// #.##.#
// #S##E#
// ######
// `;
let example = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
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
