import { getInput, parseInputToMap } from '../lib/index.js';

const DAY = 10;
const NAME = `\n\n--- Day ${DAY}: Hoof It ---`;

/**
 * @param map {number[][]}
 * @returns {number}
 */
function part1(map) {
  return map.length
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let map = parseInputToMap(input).map(row => row.map(it => parseInt(it)))

  switch (part) {
    case 1:
      return part1(map);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
0123
1234
8765
9876
`;
let result = main(example, 1)
console.log(result);

/*
console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
*/