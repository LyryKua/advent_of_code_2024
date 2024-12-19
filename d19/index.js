import { getInput } from '../lib/index.js';

const DAY = 19;
const NAME = `\n\n--- Day ${DAY}: Linen Layout ---`;

/**
 * @param alphabet {string[]}
 * @param design {string}
 * @param map {Map<string, boolean>}
 * @returns {boolean}
 */
function isPossible(alphabet, design, map) {
  if (design.length === 0) return true;
  if (map.has(design)) return map.get(design);

  let matchedAlphabet = alphabet.filter(a => design.startsWith(a));
  if (matchedAlphabet.length === 0) {
    map.set(design, false)
    return false;
  }

  const anyPossible = matchedAlphabet.reduce((acc, current) => {
    const newDesign = design.slice(current.length);
    return acc || isPossible(alphabet, newDesign, map);
  }, false);

  map.set(design, anyPossible);
  return anyPossible;
}

/**
 * @param alphabet {string[]}
 * @param designs {string[]}
 * @returns {number}
 */
function part1(alphabet, designs) {
  let nbr = 0;
  let map = new Map();
  for (let design of designs) {
    if (isPossible(alphabet, design, map)){
      nbr += 1;
    }
  }
  return nbr;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let [alphabetInput, designsInput] = input.trim().split('\n\n');
  let alphabet = alphabetInput.split(', ');
  let designs = designsInput.split('\n');

  switch (part) {
    case 1:
      return part1(alphabet, designs);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;
let result = main(example, 1);
console.log(result);

console.log(NAME)
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1)
    console.log('p1:', part1Result)

    const part2Result = main(input, 2)
    console.log('p2:', part2Result)
  })
