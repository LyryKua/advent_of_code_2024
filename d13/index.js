import { getInput } from "../lib/index.js";

const DAY = 13;
const NAME = `\n\n--- Day ${DAY}: Claw Contraption ---`;
const X = 0;
const Y = 1;

/**
 * @param input {string}
 * @returns {number[][][]}
 */
function parseInput(input) {
  return input.trim().split('\n\n').map(it => {
    let lines = it.split('\n');
    let a = lines[0].split(', ').map(c => c.split('+').map(Number));
    let b = lines[1].split(', ').map(c => c.split('+').map(Number));
    let p = lines[2].split(', ').map(c => c.split('=').map(Number));
    return [
      [a[0][1], a[1][1]],
      [b[0][1], b[1][1]],
      [p[0][1], p[1][1]],
    ];
  });
}

/**
 * @param machines {number[][][]}
 * @param part {number}
 * @returns {number}
 */
function solve(machines, part) {
  let nbr = 0;
  for (let i = 0; i < machines.length; i++) {
    let a = machines[i][0];
    let b = machines[i][1];
    let p = machines[i][2].map(it => part === 1 ? it : 10000000000000 + it);

    let bt = (a[X] * p[Y] - a[Y] * p[X]) / (a[X] * b[Y] - b[X] * a[Y]);
    let at = (p[X] - b[X] * bt) / a[X];
    if (bt % 1 !== 0 || at % 1 !== 0) {
      continue;
    }
    nbr += 3 * at + bt;
  }
  return nbr;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let machines = parseInput(input);

  return solve(machines, part);
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });
