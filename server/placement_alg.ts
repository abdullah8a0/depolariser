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
    } else if (key.match(/^2.1\./)) {
      q21Answers.push(parseInt(value));
    } else if (key.match(/^2.2\./)) {
      q22Answers.push(parseInt(value));
    } else if (key.match(/^3\./)) {
      q3Anwers.push(parseInt(value));
    }
  }
  return new Descriptor({
    userId: userId,
    DescVector: [q1Answers.reduce((a, b) => a + b, 0) / q1Answers.length, q2Answers.reduce((a, b) => a + b, 0) / q2Answers.length],
  });
};

export const fecthResults = (descriptor: DescriptorInterface): string => {
  const x = descriptor.DescVector[0]; //change x to an number
  const y = descriptor.DescVector[1];
  const cutOff = 2;

  //based on question 1 and 2 returns place on scale
  if (-cutOff < x && x < cutOff && y > cutOff) {
    return "Paleolibertarian";
  } else if (x > cutOff && y > cutOff) {
    return "Paleoconservative";
  } else if (x > cutOff && -cutOff < y && y < cutOff) {
    return "Theoconservative";
  } else if (x > cutOff && y < -cutOff) {
    return "Neoconservative";
  } else if (-cutOff < x && x < cutOff && y < -cutOff) {
    return "Communitarian";
  } else if (x < -cutOff && y < -cutOff) {
    return "Progressive";
  } else if (x < -cutOff && y < cutOff && y > -cutOff) {
    return "Radical";
  } else if (x < -cutOff && y > cutOff) {
    return "Individualist";
  } else {
    return "Populist";
  }

  //based on question 3 writes your placement
  console.log(descriptor.DescVector[3]);
};
