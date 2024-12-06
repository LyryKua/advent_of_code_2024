import { getInput } from '../lib/index.js'

const DAY = 0
const NAME = `\n\n--- Day ${DAY}: TODO ---`

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  switch (part) {
    case 1:
      return part
    case 2:
      return part
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`)
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
