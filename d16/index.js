import {
  addVectors, duplicateMap,
  findChar,
  getInput,
  getNeighbors, isArrayInclude,
  isArraysEqual,
  isInside,
  parseInputToMap, printMap, putChrInMap,
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
 * @param maze {string[][]}
 * @return {number}
 */
function part1(maze) {
  let [start] = findChar(maze, 'S');
  let [end] = findChar(maze, 'E');
  let visited = [start];

  printMap(maze);
  let paths = dfsMaze(maze, start, end, visited, []);
  for (let i = 0; i < paths.length; i++) {
    let newMap = duplicateMap(maze);
    for (let j = 0; j < paths[i].length; j++) {
      putChrInMap(newMap, paths[i][j], '*');
    }
    printMap(newMap);
  }
  console.log(paths);


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

let example = `
#######
#...#E#
#.#.#.#
#.#...#
#.#.#.#
#S#...#
#######
`;
let example1 = `
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

// console.log(NAME)
// getInput(DAY)
//   .then(input => {
//     const part1Result = main(input, 1)
//     console.log('p1:', part1Result)
//
//     const part2Result = main(input, 2)
//     console.log('p2:', part2Result)
//   })
