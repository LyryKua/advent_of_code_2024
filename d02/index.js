import { getInput, parseInput } from '../lib/index.js'

const DAY = 2
const NAME = `\n\n--- Day ${DAY}: Red-Nosed Reports ---`

/**
 * @param arr {number[]}
 * @returns {boolean}
 */
function isIncrOrDecr(arr) {
    /** @type {number[]} */
    const incrOrDecr = []
    for (let i = 1; i < arr.length; i++) {
        incrOrDecr.push(arr[i] - arr[i - 1])
    }
    if (incrOrDecr.every(it => it > 0 && it < 4)) {
        return true
    } else {
        return incrOrDecr.every(it => it > -4 && it < 0);
    }
}

/**
 * @param arr {number[]}
 * @returns {boolean}
 */
function tryToRemove(arr) {
    for (let i = 0; i < arr.length; i++) {
        const newArr = arr.filter((_, index) => index !== i)
        if (isIncrOrDecr(newArr)) {
            return true
        }
    }
    return false
}

/**
 * @param arr {number[]}
 * @returns {boolean}
 */
function isIncrOrDecr2(arr) {
    /** @type {number[]} */
    const incrOrDecr = []
    for (let i = 1; i < arr.length; i++) {
        incrOrDecr.push(arr[i] - arr[i - 1])
    }
    if (incrOrDecr.every(it => it > 0 && it < 4)) {
        return true
    } else if (incrOrDecr.every(it => it > -4 && it < 0)) {
        return true;
    } else {
        return tryToRemove(arr)
    }
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
    if (part === 1) {
        const rows = parseInput(input)
        const data = rows.map(row => row.split(' ').map(it => +it))
        let answer = 0
        for (const arr of data) {
            answer += isIncrOrDecr(arr) ? 1 : 0
        }
        return answer
    } else if (part === 2) {
        const rows = parseInput(input)
        const data = rows.map(row => row.split(' ').map(it => +it))
        let answer = 0
        for (const arr of data) {
            answer += isIncrOrDecr2(arr) ? 1 : 0
        }
        return answer
    }
    throw new Error(`There are only 2 parts. Part ${part} does not exist`)
}

console.log(NAME)
getInput(DAY)
    .then(input => {
        const part1Result = main(input, 1)
        console.log('p1:', part1Result)

        const part2Result = main(input, 2)
        console.log('p2:', part2Result)
    })
