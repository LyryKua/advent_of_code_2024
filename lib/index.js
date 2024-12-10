import 'dotenv/config';

/**
 * @param arr {string|number[][]}
 * @param point {number[]}
 * @returns {boolean}
 */
export function isInside(arr, [y, x]) {
  const height = arr.length;
  const width = arr[0].length;

  return x >= 0 && x < width && y >= 0 && y < height;
}

/**
 * Gets all occurrences of `chr` in `grid`
 *
 * @param grid {string[][]}
 * @param chr {string}
 * @returns {number[][]}
 */
export function findChar(grid, chr) {
  /** @type {number[][]} */
  let coordinates = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== chr) {
        continue;
      }

      coordinates.push([i, j]);
    }
  }

  return coordinates;
}

/**
 * Gets all occurrences of `nbr` in `grid`
 *
 * @param grid {number[][]}
 * @param nbr {number}
 * @returns {number[][]}
 */
export function findNbr(grid, nbr) {
  /** @type {number[][]} */
  let coordinates = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== nbr) {
        continue;
      }

      coordinates.push([i, j]);
    }
  }

  return coordinates;
}

/**
 * Parse the input into an array of strings.
 *
 * @param input {string}
 * @returns {string[]}
 */
export function parseInput(input) {
  return input.trim().split('\n');
}

/**
 * Parse the input into a map
 *
 * @example
 * parseInputToMap('.#..\n..##\n') // [['.', '#', '.', '.'], ['.', '.', '#', '#']]
 *
 * @param input {string}
 * @returns {string[][]}
 */
export function parseInputToMap(input) {
  return input.trim().split('\n').map(row => row.split(''));
}

/**
 * Get the input for the given year and day.
 * @param day {number}
 * @returns {Promise<string>}
 */
export async function getInput(day) {
  const url = `https://adventofcode.com/${process.env.YEAR}/day/${day}/input`;
  const cookie = process.env.AOC_SESSION_COOKIE;
  const headers = { Cookie: `session=${cookie}` };
  const response = await fetch(url, { headers });
  return response.text();
}

/**
 * Print the given array
 * @param map {string[][]}
 */
export function printMap(map) {
  console.log(map.map(row => row.join('')).join('\n'), '\n');
}

/**
 * @param vector {number[]}
 * @returns {number[]}
 */
export function turn90DegreeRight([y, x]) {
  return [x, -y];
}

/**
 * @param vector {number[]}
 * @returns {number[]}
 */
export function turn90DegreeLeft([y, x]) {
  return [-x, y];
}

/**
 * @param vector {number[]}
 * @returns {number[]}
 */
export function turn180Degree([y, x]) {
  return [-y, -x];
}

/**
 * @param v1 {number[]}
 * @param v2 {number[]}
 * @returns {number[]}
 */
export function addVectors(v1, v2) {
  return v1.map((it, index) => it + v2[index]);
}