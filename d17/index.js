import { getInput } from '../lib/index.js';

const DAY = 17;
const NAME = `\n\n--- Day ${DAY}: Chronospatial Computer ---`;

/**
 * The adv instruction (opcode 0) performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand. (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation is truncated to an integer and then written to the A register.
 *
 * The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
 *
 * The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
 *
 * The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
 *
 * The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
 *
 * The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
 *
 * The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)
 *
 * The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)
 */
const OPCODE = ['adv', 'bxl', 'bst', 'jnz', 'bxc', 'out', 'bdv', 'cdv'];

/**
 * @param combo {number}
 * @param a {number}
 * @param b {number}
 * @param c {number}
 * @returns {number}
 */
function getOperand(combo, a, b, c) {
  switch (combo) {
    case 0:
    case 1:
    case 2:
    case 3:
      return combo;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    case 7:
    default:
      return -1;
  }
}

/**
 * @param a {number}
 * @param b {number}
 * @param c {number}
 * @param program {number[]}
 * @returns {string}
 */
function part1(a, b, c, program) {
  /** @type {number[]} */
  let outputs = [];
  let i = 0;
  while (true) {
    if (i === program.length) {
      break;
    }
    let opcode = OPCODE[program[i]];
    let literalOperand = program[i + 1];
    let operand = getOperand(literalOperand, a, b, c);

    switch (opcode) {
      case 'adv': {
        a = Math.floor(a / Math.pow(2, operand));
        break;
      }
      case 'bxl': {
        b = b ^ literalOperand;
        break;
      }
      case 'bst': {
        b = operand % 8;
        break;
      }
      case 'jnz': {
        if (a === 0) break;
        i = literalOperand - 2;
        break;
      }
      case'bxc': {
        b = b ^ c;
        break;
      }
      case'out': {
        outputs.push(operand % 8);
        break;
      }
      case 'bdv': {
        b = Math.floor(a / Math.pow(2, operand));
        break;
      }
      case 'cdv': {
        c = Math.floor(a / Math.pow(2, operand));
        break;
      }
      default:
        break;
    }
    i += 2;
  }
  return outputs.join();
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {string}
 */
function main(input, part) {
  let [registersInput, programInput] = input.trim().split('\n\n');
  let [a, b, c] = registersInput.split('\n').map(line => Number(line.split(': ')[1]));
  let program = programInput.split(': ')[1].split(',').map(Number);

  switch (part) {
    case 1: {
      return part1(a, b, c, program);
    }

    case 2:
      return '';
    default:
      throw new Error(`Only 2 parts. There is no part ${part}`);
  }
}

let example = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`;
// let result = main(example, 1);
// console.log(result);
//
console.log(NAME);
getInput(DAY)
  .then(input => {
    const part1Result = main(input, 1);
    console.log('p1:', part1Result);

    const part2Result = main(input, 2);
    console.log('p2:', part2Result);
  });