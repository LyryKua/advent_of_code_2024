import { findChar, getInput, isInside, parseInputToMap, printMap, turn90DegreeRight } from '../lib/index.js'

const DAY = 6
const NAME = `\n\n--- Day ${DAY}: Guard Gallivant ---`

/**
 * @param arr {[number,number][]}
 * @returns {[number, number][]}
 */
function uniq(arr) {
  /** @type {Map<string, [number, number]>} */
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i].join()
    if (map.has(key)) {
      continue
    }
    map.set(key, arr[i])
  }
  return [...map.values()]
}

/**
 * @param map {string[][]}
 * @param x {number}
 * @param y {number}
 * @returns {[number,number][]}
 */
function traverseMap(map, x, y) {
  let dirX = 0
  let dirY = -1
  /** @type {[number, number][]} */
  const visitedCells = []
  while (isInside(map, x, y)) {
    visitedCells.push([y, x])
    const newX = x + dirX
    const newY = y + dirY
    if (isInside(map, newX, newY) && map[newY][newX] === '#') {
      [dirX, dirY] = turn90DegreeRight(dirX, dirY)
    }
    x += dirX
    y += dirY
    if (isInside(map, x, y) && map[y][x] === '#') {
      x -= dirX
      y -= dirY
      const tmp = dirX
      dirX = -dirY
      dirY = tmp
    }
  }

  return visitedCells
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  const start = findChar(map, '^')
  const visitedCells = traverseMap(map, start.x, start.y)

  return uniq(visitedCells).length
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part2(map) {
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
      return part2(map)
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`)
  }
}

const example = `
....
#..#
.^#.
`

console.log(example)
const resultExample = main(example, 1)
console.log(resultExample)
//
// const example1 = `
// #..
// .#.
// ...
// ^..
// ...
// `
//
// console.log(example1)
// const resultExample1 = main(example1, 2)
// console.log(resultExample1)
//

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