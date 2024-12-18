import { getInput } from '../lib/index.js';

const DAY = 18;
const NAME = `\n\n--- Day ${DAY}: RAM Run ---`;

const WIDTH = 7
const HEIGHT = 7
const NBR_BITS = 12

/**
 * @param bytes {number[][]}
 * @returns {number}
 */
function part1(bytes) {
  return 0;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let bytes = input.trim().split('\n').map(m => m.split(',').map(Number));
  switch (part) {
    case 1:
      return part1(bytes);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
let result = main(example, 1);
console.log(result);

// console.log(NAME);
// getInput(DAY)
//   .then(input => {
//     const part1Result = main(input, 1);
//     console.log('p1:', part1Result);
//
//     const part2Result = main(input, 2);
//     console.log('p2:', part2Result);
//   });
