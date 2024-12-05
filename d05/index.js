import { getInput, parseInput } from '../lib/index.js'

const DAY = 5
const NAME = `\n\n--- Day ${DAY}: Print Queue ---`

/**
 * @param input
 * @returns {{rules: [number, number][], updates: number[][]}}
 */
function parse(input) {
  const [rulesRaw, updatesRaw] = input.trim().split('\n\n')
  const rules = parseInput(rulesRaw).map(r => r.split('|').map(r => parseInt(r)))
  const updates = parseInput(updatesRaw).map(u => u.split(',').map(u => parseInt(u)))

  return { rules, updates }
}

/**
 * @param rules {[number, number][]}
 * @param updates {number[][]}
 * @returns {number}
 */
function part1(rules, updates) {
  let nbr = 0
  /**
   * @type {Map<number, boolean>}
   */
  const invalidUpdates = new Map()
  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < updates.length; j++) {
      const lIndex = updates[j].findIndex(u => u === rules[i][0])
      const rIndex = updates[j].findIndex(u => u === rules[i][1])
      if (lIndex < 0 || rIndex < 0 || lIndex < rIndex) {
        continue
      }
      invalidUpdates.set(j, true)
    }
  }
  const validUpdates = updates.filter((_, index) => !invalidUpdates.get(index))
  for (let i = 0; i < validUpdates.length; i++) {
    nbr += validUpdates[i][Math.floor(validUpdates[i].length / 2)]
  }
  return nbr
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const { rules, updates } = parse(input)
  switch (part) {
    case 1: {
      return part1(rules, updates)
    }
    case 2: {
      return input.length
    }
  }

  return input.length + part
}

// const example = `
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13
//
// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47
// `
// const examplePart = main(example, 1)
// console.log(examplePart)

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })