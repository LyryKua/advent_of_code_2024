import { getInput } from '../lib/index.js'

const DAY = 3
const NAME = `\n\n--- Day ${DAY}: Mull It Over ---`

/**
 * @param input {string}
 * @returns {string[]}
 */
function getAllMuls(input) {
  const regex = /mul\(\d+,\d+\)/g
  return input.match(regex) ?? []
}

/**
 * @param input {string}
 * @returns {string[]}
 */
function getAllMulsDosAndDonts(input) {
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g
  return input.match(regex) ?? []
}


/**
 * @param arr {string[]}
 * @returns {number[][]}
 */
function parseMuls(arr) {
  let isDo = true
  return arr.map(it => {
    if (it === "do()") {
      isDo = true
      return [0, 0]
    } else if (it === "don't()") {
      isDo = false
      return [0, 0]
    }
    const [_, args] = it.split('(')
    return isDo ? args.split(',').map(it => parseInt(it)) : [0, 0]
  })
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  switch (part) {
    case 1: {
      const muls = getAllMuls(input)
      const args = parseMuls(muls)
      return args.reduce((previousValue, [a, b]) => a * b + previousValue, 0)
    }
    case 2: {
      const muls = getAllMulsDosAndDonts(input)
      const args = parseMuls(muls)

      return args.reduce((previousValue, [a, b]) => a * b + previousValue, 0)
    }
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
