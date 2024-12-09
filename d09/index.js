import { getInput } from '../lib/index.js';

const DAY = 9;
const NAME = `\n\n--- Day ${DAY}: Disk Fragmenter ---`;

/**
 * @param arr {number[]}
 * @returns {number}
 */
function calculateHashSum(arr) {
  let nbr = 0;
  for (let k = 0; k < arr.length; k++) {
    nbr += arr[k] === -1 ? 0 : k * arr[k];
  }

  return nbr;
}

/**
 * @param arr {number[]}
 * @param index {number}
 * @param direction {number}
 * @returns {number}
 */
function countLength(arr, index, direction) {
  let length = 0;
  let i = index;
  while (i >= 0 && i < arr.length && arr[index] === arr[i]) {
    i += direction;
    length += 1;
  }
  return length;
}

/**
 * @param arr {number[]}
 * @param start {number}
 * @param end {number}
 * @returns {number}
 */
function doesItFit(arr, start, end) {
  for (let i = 0; i < start; i++) {
    if (arr[i] === -1) {
      const length = countLength(arr, i, 1)
      if (length >= end - start + 1) return i
    }
  }
  return -1;
}

/**
 * @param arr {number[]}
 * @param leftStart {number}
 * @param rightStart {number}
 * @param length {number}
 * @returns {number[]}
 */
function swapSubArr(arr, leftStart, rightStart, length) {
  while (
    length
    && leftStart + length - 1 >= 0 && leftStart + length - 1 < arr.length
    && rightStart + length - 1 >= 0 && rightStart + length - 1 < arr.length
    ) {
    const tmp = arr[leftStart + length - 1];
    arr[leftStart + length - 1] = arr[rightStart + length - 1];
    arr[rightStart + length - 1] = tmp;
    length -= 1;
  }
  return arr;
}

/**
 * @param item {number}
 * @param length {number}
 * @return {number[]}
 */
function generateBlock(item, length) {
  return Array(length).fill(item);
}

/**
 * @param input {string}
 * @returns {number[]}
 */
function createBlocks(input) {
  /** @type {number[]} */
  let blocks = [];
  for (let i = 0; i < input.trim().length; i++) {
    const item = i % 2 ? -1 : i / 2;
    blocks.push(...generateBlock(item, parseInt(input[i])));
  }

  return blocks;
}

/**
 * @param blocks {number[]}
 * @return {number}
 */
function part1(blocks) {
  let j = blocks.length - 1;
  while (j) {
    let i = 0;
    while (blocks[i] !== -1) {
      i += 1;
    }
    if (blocks[j] === -1) {
      j -= 1;
      continue;
    }
    if (i >= j) break;
    if (blocks[i] === -1 && blocks[j] !== -1) {
      const tmp = blocks[i];
      blocks[i] = blocks[j];
      blocks[j] = tmp;
    }
  }

  return calculateHashSum(blocks);
}

/**
 * @param blocks {number[]}
 * @return {number}
 */
function part2(blocks) {
  let j = blocks.length - 1;
  let rememberNbr = blocks[j]
  while (j >= 0) {
    if (blocks[j] !== -1 && rememberNbr >= blocks[j]) {
      rememberNbr = blocks[j]
      const fileLength = countLength(blocks, j, -1);
      const doesIt = doesItFit(blocks, j - fileLength + 1, j)
      if (doesIt >= 0) {
        swapSubArr(blocks, doesIt, j - fileLength + 1, fileLength);
      } else {
        j -= fileLength
        continue
      }
    }
    j -= 1;
  }

  return calculateHashSum(blocks);
}


/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const blocks = createBlocks(input);

  switch (part) {
    case 1:
      return part1(blocks);
    case 2:
      return part2(blocks);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
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
