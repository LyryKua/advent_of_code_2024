import { addVectors, getInput, isInside, parseInput } from '../lib/index.js';

const DAY = 8;
const NAME = `\n\n--- Day ${DAY}: Resonant Collinearity ---`;

/**
 * @param map {string[][]}
 * @returns {Map<string, number[][]>}
 */
function getAllAntennas(map) {
  /** @type {Map<string, number[][]>} */
  const antennasMap = new Map();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '.') continue;
      const antennaCoordinates = antennasMap.get(map[i][j]);
      if (antennaCoordinates && antennaCoordinates.length > 0) {
        antennasMap.set(map[i][j], [...antennaCoordinates, [i, j]]);
      } else {
        antennasMap.set(map[i][j], [[i, j]]);
      }
    }
  }

  return antennasMap;
}

/**
 * @param coordinates {number[][]}
 * @returns {number[][][]}
 */
function getPairs(coordinates) {
  /** @type {number[][][]} */
  const pairs = [];
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      pairs.push([coordinates[i], coordinates[j]]);
    }
  }

  return pairs;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part1(map) {
  /** @type {Map<string, boolean>} */
  const antiAntennasMap = new Map();
  const antennasMap = getAllAntennas(map);
  for (let [_, coordinates] of antennasMap) {
    const pairs = getPairs(coordinates);
    for (const pair of pairs) {
      const antenna1 = pair[0];
      const antenna2 = pair[1];
      const deltaX = antenna2[1] - antenna1[1];
      const deltaY = antenna2[0] - antenna1[0];
      const antiAntenna1 = addVectors(antenna1, [-deltaY, -deltaX]);
      const antiAntenna2 = addVectors(antenna2, [deltaY, deltaX]);
      if (isInside(map, antiAntenna1)) {
        antiAntennasMap.set(antiAntenna1.join(), true);
      }
      if (isInside(map, antiAntenna2)) {
        antiAntennasMap.set(antiAntenna2.join(), true);
      }
    }
  }

  return antiAntennasMap.size;
}

/**
 * @param map {string[][]}
 * @returns {number}
 */
function part2(map) {
  const antennasMap = getAllAntennas(map);
  /** @type {Map<string, boolean>} */
  const antiAntennasMap = new Map();
  for (let [_, coordinates] of antennasMap) {
    const pairs = getPairs(coordinates);
    for (const pair of pairs) {
      const antenna1 = pair[0];
      const antenna2 = pair[1];
      antiAntennasMap.set(antenna1.join(), true);
      antiAntennasMap.set(antenna2.join(), true);
      const deltaX = antenna2[1] - antenna1[1];
      const deltaY = antenna2[0] - antenna1[0];
      let antiAntenna1 = addVectors(antenna1, [-deltaY, -deltaX]);
      while (isInside(map, antiAntenna1)) {
        antiAntennasMap.set(antiAntenna1.join(), true);
        antiAntenna1 = addVectors(antiAntenna1, [-deltaY, -deltaX]);
      }
      let antiAntenna2 = addVectors(antenna2, [deltaY, deltaX]);
      while (isInside(map, antiAntenna2)) {
        antiAntennasMap.set(antiAntenna2.join(), true);
        antiAntenna2 = addVectors(antiAntenna2, [deltaY, deltaX]);
      }
    }
  }

  return antiAntennasMap.size;
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const map = parseInput(input).map(row => row.split(''));

  switch (part) {
    case 1:
      return part1(map);
    case 2:
      return part2(map);
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });