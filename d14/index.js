import { addVectors, getInput, multiplyVector, printMap } from '../lib/index.js';

const DAY = 14;
const NAME = `\n\n--- Day ${DAY}: Restroom Redoubt ---`;
const Y = 0;
const X = 1;
const WIDTH = 101;
const HEIGHT = 103;
const SECONDS = 100;

/**
 * @param vector {number[]}
 * @returns {1|2|3|4}
 */
function quadrant([y, x]) {
  let middleY = (HEIGHT - 1) / 2;
  let middleX = (WIDTH - 1) / 2;
  if (y >= 0 && y < middleY && x >= 0 && x < middleX) {
    return 1;
  } else if (y >= 0 && y < middleY && x > middleX && x < WIDTH) {
    return 2;
  } else if (y > middleY && y < HEIGHT && x >= 0 && x < middleX) {
    return 3;
  } else if (y > middleY && y < HEIGHT && x > middleX && x < WIDTH) {
    return 4;
  }
  return 0;
}

/**
 * @param coordinate {number}
 * @param base {number}
 */
function getNewCoordinate(coordinate, base) {
  if (coordinate >= 0) {
    return coordinate % base;
  } else {
    let tmp = base - (Math.abs(coordinate) % base);
    return tmp === base ? 0 : tmp;
  }
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
 *
 */
function part2(robots) {
  let quadrantI = 0;
  let quadrantII = 0;
  let quadrantIII = 0;
  let quadrantIV = 0;
  let seconds = Number(process.argv[2]);

  /** @type {string[][]} */
  let map = new Array(HEIGHT);

  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(WIDTH).fill(undefined).map(() => '.');
  }
  for (let i = 0; i < robots.length; i++) {
    let position = robots[i][0];
    let velocity = robots[i][1];
    let multipliedVelocity = multiplyVector(velocity, seconds);
    let posAfterSeconds = addVectors(position, multipliedVelocity);

    let y = getNewCoordinate(posAfterSeconds[Y], HEIGHT);
    let x = getNewCoordinate(posAfterSeconds[X], WIDTH);
    map[y][x] = '#';
  }
  console.log('for steps number:', seconds);
  printMap(map);
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
      return part2(robots);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

main(input, 2);
console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    console.log('p2: we used Visual C here to solve this part :)');
  });
