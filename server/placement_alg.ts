import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";
import { assert } from "console";
/* A function that takes in a string and a userId and returns a DescriptorInterface.
 * The string is the user's selections from the test.
 * The userId is the user's id.
 * The function parses the string and generates the descriptor vector.
 *
 * The descriptor vector is an array of numbers.
 * index 0: average of q1
 * index 1: average of q2
 * index 2: average of q3
 */
export const generateDescriptor = (selections: string, userId: string): DescriptorInterface => {
  /* Logging the selections to the console. */
  // console.log(selections);
  // console.log(selections.toString().replace(/'/g, '"').toString());
  const selectionsJSON = {}; //JSON.parse(selections.toString().replace(/'/g, '"')) ||
  //iterate through the keys-value pairs
  const q1Answers: number[] = [];
  const q2Answers: number[] = [];
  for (const [key, value] of Object.entries(selectionsJSON) as [string, string][]) {
    if (key.match(/^1\./)) {
      q1Answers.push(parseInt(value));
    } else if (key.match(/^2\./)) {
      q2Answers.push(parseInt(value));
    } else if (key.match(/^3\./)) {
    }
  }
  return new Descriptor({
    userId: userId,
    DescVector: [q1Answers.reduce((a, b) => a + b, 0) / q1Answers.length, q2Answers.reduce((a, b) => a + b, 0) / q2Answers.length],
  });
};

export const fecthResults = (descriptor: DescriptorInterface): string => {
  return "Commie";
};
