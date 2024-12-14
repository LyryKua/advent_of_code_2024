import { addVectors, getInput, multiplyVector } from '../lib/index.js';

const DAY = 14;
const NAME = `\n\n--- Day ${DAY}: Restroom Redoubt ---`;
const Y = 0;
const X = 1;
const WIDTH = 11;
const HEIGHT = 7;
const SECONDS = 15;

/**
 * @param vector {number[]}
 * @returns {1|2|3|4}
 */
function quadrant([y, x]) {
  let middleY = (HEIGHT - 1) / 2;
  let middleX = (WIDTH - 1) / 2;
  if (y >= 0 && y < middleY && x >= 0 && x < middleX) {
    return 1;
  } else if (y >= 0 && y < middleY && x >= middleX + 2 && x < WIDTH) {
    return 2;
  } else if (y >= middleY + 2 && y < HEIGHT && x >= 0 && x < middleX) {
    return 3;
  } else if (y >= middleY + 2 && y < HEIGHT && x >= middleX + 2 && x < WIDTH) {
    return 4;
  }
  return 0;
}

/**
 * @param coordinate {number}
 * @param base {number}
 */
function getNewCoordinate(coordinate, base) {
  if (coordinate > 0) {
    return coordinate % base;
  } else if (coordinate < 0) {
    let a = Math.abs(coordinate)
    let b = a % base
    return (base - b) % base;
  }
  return coordinate;
}

/**
 *
 */
function part1(robots) {
  let quadrantI = 0;
  let quadrantII = 0;
  let quadrantIII = 0;
  let quadrantIV = 0;

  for (let i = 0; i < robots.length; i++) {
    let position = robots[i][0];
    let velocity = robots[i][1];
    let multipliedVelocity = multiplyVector(velocity, SECONDS);
    let posAfterSeconds = addVectors(position, multipliedVelocity);

    let y = getNewCoordinate(posAfterSeconds[Y], HEIGHT);
    let x = getNewCoordinate(posAfterSeconds[X], WIDTH);
    let newPosition = [y, x];

    switch (quadrant(newPosition)) {
      case 1:
        quadrantI += 1;
        break;
      case 2:
        quadrantII += 1;
        break;
      case 3:
        quadrantIII += 1;
        break;
      case 4:
        quadrantIV += 1;
        break;
      default:
        break;
    }
  }
  return quadrantI * quadrantII * quadrantIII * quadrantIV;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let robots = input.trim().split('\n').map(line => line.split(' ').map(it => {
    let [_, coordinatesStr] = it.split('=');
    return coordinatesStr.split(',').map(Number).reverse();
  }));

  switch (part) {
    case 1:
      return part1(robots);
    case 2:
      return part;
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
p=1,0 v=-3,0
`;
// let example = `
// p=10,3 v=-1,-3
// `;
// let example = `
// p=2,4 v=2,-3
// `;
let example = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
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
