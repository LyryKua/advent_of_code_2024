import { findChar, getInput, parseInput, parseInputToMap } from '../lib/index.js'

const DAY = 6
const NAME = `\n\n--- Day ${DAY}: Guard Gallivant ---`

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  const start = findChar(map, '^')

  return map.length
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

const resultExample = main(example, 1)
console.log(resultExample)

/*
console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })


 */