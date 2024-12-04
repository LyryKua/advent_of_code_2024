import { getInput, parseInput } from '../lib/index.js'

const DAY = 4
const NAME = `\n\n--- Day ${DAY}: Ceres Search ---`

/**
 * @param arr {string[][]}
 * @return {number}
 */
function countMAS(arr) {
  let nbr = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      /*
       * M.M
       * .A.
       * S.S
       */
      if (arr[i][j] === 'M' && arr[i][j + 2] === 'M'
        && arr[i + 1]?.[j + 1] === 'A'
        && arr[i + 2]?.[j] === 'S' && arr[i + 2]?.[j + 2] === 'S') {
        nbr += 1
      }
      /*
       * M.S
       * .A.
       * M.S
       */
      if (arr[i][j] === 'M' && arr[i][j + 2] === 'S'
        && arr[i + 1]?.[j + 1] === 'A'
        && arr[i + 2]?.[j] === 'M' && arr[i + 2]?.[j + 2] === 'S') {
        nbr += 1
      }
      /*
       * S.M
       * .A.
       * S.M
       */
      if (arr[i][j] === 'S' && arr[i][j + 2] === 'M'
        && arr[i + 1]?.[j + 1] === 'A'
        && arr[i + 2]?.[j] === 'S' && arr[i + 2]?.[j + 2] === 'M') {
        nbr += 1
      }
      /*
       * S.S
       * .A.
       * M.M
       */
      if (arr[i][j] === 'S' && arr[i][j + 2] === 'S'
        && arr[i + 1]?.[j + 1] === 'A'
        && arr[i + 2]?.[j] === 'M' && arr[i + 2]?.[j + 2] === 'M') {
        nbr += 1
      }
    }
  }
  return nbr
}

/**
 * @param arr {string[][]}
 * @return {number}
 */
function countXMAS(arr) {
  let nbr = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      //horizontal
      if (arr[i][j] === 'X' && arr[i][j + 1] === 'M' && arr[i][j + 2] === 'A' && arr[i][j + 3] === 'S') {
        nbr += 1
      }
      if (arr[i][j] === 'S' && arr[i][j + 1] === 'A' && arr[i][j + 2] === 'M' && arr[i][j + 3] === 'X') {
        nbr += 1
      }
      //vertical
      if (arr[i][j] === 'X' && arr[i + 1]?.[j] === 'M' && arr[i + 2]?.[j] === 'A' && arr[i + 3]?.[j] === 'S') {
        nbr += 1
      }
      if (arr[i][j] === 'S' && arr[i + 1]?.[j] === 'A' && arr[i + 2]?.[j] === 'M' && arr[i + 3]?.[j] === 'X') {
        nbr += 1
      }
      //diagonal \
      if (arr[i][j] === 'X' && arr[i + 1]?.[j + 1] === 'M' && arr[i + 2]?.[j + 2] === 'A' && arr[i + 3]?.[j + 3] === 'S') {
        nbr += 1
      }
      if (arr[i][j] === 'S' && arr[i + 1]?.[j + 1] === 'A' && arr[i + 2]?.[j + 2] === 'M' && arr[i + 3]?.[j + 3] === 'X') {
        nbr += 1
      }
      //diagonal /
      if (arr[i][j + 3] === 'X' && arr[i + 1]?.[j + 2] === 'M' && arr[i + 2]?.[j + 1] === 'A' && arr[i + 3]?.[j] === 'S') {
        nbr += 1
      }
      if (arr[i][j + 3] === 'S' && arr[i + 1]?.[j + 2] === 'A' && arr[i + 2]?.[j + 1] === 'M' && arr[i + 3]?.[j] === 'X') {
        nbr += 1
      }
    }
  }
  return nbr
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const arr = parseInput(input).map(it => it.split(''))
  switch (part) {
    case 1:
      return countXMAS(arr)
    case 2:
      return countMAS(arr)
    default:
      throw new Error(`There are only 2 parts. Part ${part} does not exist`)
  }
}

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
