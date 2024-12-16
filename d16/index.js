import { findChar, getInput, parseInputToMap } from '../lib/index.js';

const DAY = 16;
const NAME = `\n\n--- Day ${DAY}: Reindeer Maze ---`;

/**
 * @param maze {string[][]}
 * @return {number}
 */
function part1(maze) {
  let [start] = findChar(maze, 'S');
  let [end] = findChar(maze, 'E');

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
