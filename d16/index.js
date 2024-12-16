import {
  addVectors, createMap, duplicateMap,
  findChar, getAllPossibleCoordinates,
  getInput,
  getNeighbors, isArrayInclude,
  isArraysEqual,
  isInside,
  parseInputToMap, printMap, putChrInMap, turn180Degree, turn90DegreeLeft, turn90DegreeRight,
} from '../lib/index.js';

const DAY = 16;
const NAME = `\n\n--- Day ${DAY}: Reindeer Maze ---`;

/**
 * @param maze {string[][]}
 * @param start {number[]}
 * @param end {number[]}
 * @param visited {number[][]}
 * @param paths {number[][][]}
 * @return {number[][][]}
 */
function dfsMaze(maze, start, end, visited, paths) {
  if (!isInside(maze, start) || isArraysEqual(start, end)) {
    paths.push(visited);
    return paths;
  }
  let neighbors = getNeighbors(maze, start);
  for (let i = 0; i < neighbors.length; i++) {
    if (maze[neighbors[i][0]][neighbors[i][1]] !== '#' && !isArrayInclude(visited, neighbors[i])) {
      visited = [...visited, neighbors[i]];
      paths = dfsMaze(maze, neighbors[i], end, visited, paths);
      visited = visited.filter(v => !isArraysEqual(v, neighbors[i]));
    }
  }
  return paths;
}

/**
 * @param h {number}
 * @param w {number}
 * @param v {number}
 * @returns {Map<string, number>}
 */
function createHashMap(h, w, v) {
  /** @type {Map<string, number>} */
  let map = new Map();
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      map.set([i, j].join(), v);
    }
  }
  return map;
}

/**
 * @param hashMap {Set<number>}
 */
function getMinDistance(hashMap) {
  return Math.min(...hashMap);
}

/**
 * @param paths {number[][][]}
 * @returns {number}
 */
function countMostTurns(paths) {
  let min = Infinity;
  for (let i = 0; i < paths.length; i++) {
    let direction = [0, -1];
    let nbr = 0;
    for (let j = 1; j < paths[i].length; j++) {
      let first = paths[i][j - 1];
      let second = paths[i][j];

      let turnedLDirection = turn90DegreeLeft(direction);
      let turnedRDirection = turn90DegreeRight(direction);
      let turnedBDirection = turn180Degree(direction);

      let expected = addVectors(first, direction);
      let turnedL = addVectors(first, turnedLDirection);
      let turnedR = addVectors(first, turnedRDirection);
      let turnedB = addVectors(first, turnedBDirection);

      if (isArraysEqual(second, expected)) {
        nbr += 1;
      } else if (isArraysEqual(second, turnedL)) {
        direction = turn90DegreeLeft(direction);
        nbr += 1001;
      } else if (isArraysEqual(second, turnedR)) {
        direction = turn90DegreeRight(direction);
        nbr += 1001;
      } else if (isArraysEqual(second, turnedB)) {
        direction = turn180Degree(direction);
        nbr += 1;
      }
    }
    min = Math.min(min, nbr);
  }

  return min;
}

function getDistance(first, second, direction) {
  let turnedBDirection = turn180Degree(direction);

  let expected = addVectors(first, direction);
  let turnedB = addVectors(first, turnedBDirection);

  return isArraysEqual(second, expected) || isArraysEqual(second, turnedB) ? 1 : 1001;
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
  return path;
}

/**
 * @param q {{node: number[], direction: number[]}[]}
 * @param d {number[][]}
 */
function minDisQ(q, d) {
  let min = Infinity;
  let minI = -1;
  for (let i = 0; i < q.length; i++) {
    let it = d[q[i].node[0]][q[i].node[1]];
    if (it < min) {
      min = it;
      minI = i;
    }
  }
  let newQ = q.filter((_, index) => minI !== index);
  return [q[minI], newQ];
}

/**
 * @param maze {string[][]}
 * @param start {number[]}
 * @param end {number[]}
 * @returns {*}
 */
function dijkstraMaze(maze, start, end) {
  let direction = [0, -1];
  let queue = [{ node: start, direction }];
  let visited = createMap(maze.length, maze[0].length, 0);
  let distances = createMap(maze.length, maze[0].length, Infinity);
  let map = new Map();
  distances[start[0]][start[1]] = 0;
  while (queue.length > 0) {
    let tmp = minDisQ(queue, distances);
    let current = tmp[0];
    queue = tmp[1];
    visited[current.node[0]][current.node[1]] = 1;
    let top = addVectors(current.node, current.direction);
    if (visited[top[0]][top[1]] !== 1 && maze[top[0]][top[1]] !== '#') {
      queue.push({ node: top, direction: current.direction });
      if (distances[top[0]][top[1]] > distances[current.node[0]][current.node[1]] + 1) {
        map.set(top.join(), current.node);
      }
      distances[top[0]][top[1]] = Math.min(distances[top[0]][top[1]], distances[current.node[0]][current.node[1]] + 1);
    }
    let right = addVectors(current.node, turn90DegreeRight(current.direction));
    if (visited[right[0]][right[1]] !== 1 && maze[right[0]][right[1]] !== '#') {
      queue.push({ node: right, direction: turn90DegreeRight(current.direction) });
      if (distances[right[0]][right[1]] > distances[current.node[0]][current.node[1]] + 1001) {
        map.set(right.join(), current.node);
      }
      distances[right[0]][right[1]] = Math.min(distances[right[0]][right[1]], distances[current.node[0]][current.node[1]] + 1001);
    }
    let left = addVectors(current.node, turn90DegreeLeft(current.direction));
    if (visited[left[0]][left[1]] !== 1 && maze[left[0]][left[1]] !== '#') {
      queue.push({ node: left, direction: turn90DegreeLeft(current.direction) });
      if (distances[left[0]][left[1]] > distances[current.node[0]][current.node[1]] + 1001) {
        map.set(left.join(), current.node);
      }
      distances[left[0]][left[1]] = Math.min(distances[left[0]][left[1]], distances[current.node[0]][current.node[1]] + 1001);
    }
    // let neighbors = getNeighbors(maze, current.node);
    // for (let i = 0; i < neighbors.length; i++) {
    //   if (visited[neighbors[i][0]][neighbors[i][1]] !== 1 && maze[neighbors[i][0]][neighbors[i][1]] !== '#') {
    //     queue.push(neighbors[i]);
    //     if (distances[neighbors[i][0]][neighbors[i][1]] > distances[current.node[0]][current.node[1]] + 1) {
    //       map.set(neighbors[i].join(), current.node);
    //     }
    //     distances[neighbors[i][0]][neighbors[i][1]] = Math.min(distances[neighbors[i][0]][neighbors[i][1]], distances[current.node[0]][current.node[1]] + 1);
    //   }
    // }
  }

  return getPath(map, end).reverse();
}

/**
 * @param maze {string[][]}
 * @return {number}
 */
function part1(maze) {
  let [start] = findChar(maze, 'S');
  let [end] = findChar(maze, 'E');

  // printMap(maze);
  let path = dijkstraMaze(maze, start, end);
  // let newMap = duplicateMap(maze);
  // for (let j = 0; j < path.length; j++) {
  //   putChrInMap(newMap, path[j], '*');
  // }
  // printMap(newMap);

  let nbr = countMostTurns([path]);
  console.log('nbr:', nbr);


  return maze.length;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let maze = parseInputToMap(input);

  switch (part) {
    case 1:
      return part1(maze);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example12 = `
#######
#...#E#
#.#.#.#
#.#...#
#.#.#.#
#S#...#
#######
`;
let example1 = `
#####
###E#
###.#
#S..#
#####
`;
let example = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`;
let result = main(example, 1);
console.log(result);

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
