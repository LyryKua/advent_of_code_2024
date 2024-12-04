import { getInput } from '../lib/index.js'

const DAY = 0
const NAME = `\n\n--- Day ${DAY}: TODO ---`

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {

  return input.length + part
}

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
