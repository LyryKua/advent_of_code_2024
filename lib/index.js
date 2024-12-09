import 'dotenv/config';

/**
 * @param arr {string[][]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
export function isInside(arr, x, y) {
  const height = arr.length;
  const width = arr[0].length;

  return x >= 0 && x < width && y >= 0 && y < height;
}

/**
 * todo: add description
 *
 * @param arr {string[][]}
 * @param chr {string}
 * @returns {{x: number, y: number}}
 */
export function findChar(arr, chr) {
  let i = 0;
  while (i < arr.length) {
    let j = 0;
    while (j < arr[i].length) {
      if (arr[i][j] === chr) {
        return { x: j, y: i };
      }
      j += 1;
    }
    i += 1;
  }
  throw new Error(`Character ${chr} is not in array`);
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
  const response = await fetch(url, { headers })
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
 * @param x {number}
 * @param y {number}
 * @returns {[number, number]}
 */
export function turn90DegreeRight(x, y) {
  return [-y, x];
}

/**
 * @param v1 {number[]}
 * @param v2 {number[]}
 * @returns {number[]}
 */
export function addVectors(v1, v2) {
  return v1.map((it, index) => it + v2[index]);
}