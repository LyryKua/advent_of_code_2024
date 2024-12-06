import { findChar, getInput, isInside, parseInputToMap, printMap } from '../lib/index.js'

const DAY = 6
const NAME = `\n\n--- Day ${DAY}: Guard Gallivant ---`

/**
 * @param map {string[][]}
 * @param x {number}
 * @param y {number}
 * @returns {number}
 */
function traverseMap(map, x, y) {
  let dirX = 0
  let dirY = -1
  /** @type {Map<string, boolean>} */
  const visitedCells = new Map()
  while (isInside(map, x, y)) {
    visitedCells.set([y, x].join(), true)
    const newX = x + dirX
    const newY = y + dirY
    if (isInside(map, newX, newY) && map[newY][newX] === '#') {
      const tmp = dirX
      dirX = -dirY
      dirY = tmp
    }
    x += dirX
    y += dirY
  }
  return visitedCells.size
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  const start = findChar(map, '^')

  return traverseMap(map, start.x, start.y)
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const map = parseInputToMap(input)
  switch (part) {
    case 1:
      return part1(map)
    case 2:
      return part
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`)
  }
}

const example = `
..#.....
.......#
........
........
..^...#.
`

const resultExample = main(example, 1)
console.log(resultExample)

const example1 = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

const resultExample1 = main(example1, 1)
console.log(resultExample1)

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })