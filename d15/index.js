import { addVectors, findChar, getInput, isArrayInclude, parseInputToMap, printMap } from '../lib/index.js';

const DAY = 15;
const NAME = `\n\n--- Day ${DAY}: Warehouse Woes ---`;

/**
 * @param input {string}
 * @returns {[string[][], Set<number[]>]}
 */
function parseInput(input) {
  let [mapInput, directionsInput] = input.trim().split('\n\n');

  let map = parseInputToMap(mapInput);
  let directions = new Set(directionsInput.trim().split('').map(it => {
    if (it === '>') return [0, 1];
    if (it === '<') return [0, -1];
    if (it === '^') return [-1, 0];
    if (it === 'v') return [1, 0];
    return [0, 0];
  }));

  return [map, directions];
}

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
function part1(map, directions) {

  for (let direction of directions) {
    let [start] = findChar(map, '@');
    map = moveRobot(map, start, direction);
  }

  return countBoxes(map);
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let [map, directions] = parseInput(input);

  switch (part) {
    case 1:
      return part1(map, directions);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

// let example = `
// ########
// #..O.O.#
// ##@.O..#
// #...O..#
// #.#.O..#
// #...O..#
// #......#
// ########
//
// <^^>>>vv<v>>v<<
// `;
// let example = `
// ##########
// #..O..O.O#
// #......O.#
// #.OO..O.O#
// #..O@..O.#
// #O#..O...#
// #O..O..O.#
// #.OO.O.OO#
// #....O...#
// ##########
//
// <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
// vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
// ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
// <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
// ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
// ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
// >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
// <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
// ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
// v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
// `;
// let example = `
// ########
// #......#
// #..O@..#
// #O.OO..#
// #......#
// #...#..#
// #......#
// #......#
// #......#
// #......#
// #......#
// #......#
// ########
//
// v<><^^
// `;
// let result = main(example, 1);
// console.log(result);

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
