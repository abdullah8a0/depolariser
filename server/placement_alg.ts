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

const q1IdtoPoints = {
  "1.1": [0, -10],
  "1.2": [0, -20],
  "1.3": [0, -10],
  "1.4": [0, -10],
  "1.5": [0, 0],
  "1.6": [0, 0],
  "1.7": [0, -10],
  "1.8": [0, 20],
  "1.9": [0, -20],
  "1.10": [0, -10],
  "1.11": [0, 0],
  "1.12": [0, -20],
  "1.13": [0, -20],
  "1.14": [0, -20],
  "1.15": [0, 20],
  "1.16": [0, -20],
  "1.17": [0, 0],
  "1.18": [0, 20],
  "1.19": [0, 20],
  "1.20": [0, -20],
  "1.21": [0, -10],
  "1.22": [0, -20],
  "1.23": [0, -20],
  "1.24": [0, 20],
  "1.25": [0, -10],
  "1.26": [0, 20],
  "1.27": [0, -10],
  "1.28": [0, -20],
  "1.29": [0, 0],
  "1.30": [0, 0],
  "1.31": [0, -10],
  "1.32": [0, -10],
  "1.33": [0, -10],
  "1.34": [0, 10],
  "1.35": [0, 0],
  "1.36": [0, -20],
  "1.37": [0, 20],
  "1.38": [0, -20],
  "1.39": [0, 20],
  "1.40": [0, 20],
  "1.41": [0, 20],
  "1.42": [0, -10],
  "1.43": [0, 10],
  "1.44": [0, 20],
  "1.45": [0, -10],
  "1.46": [0, 0],
  "1.47": [0, -20],
  "1.48": [0, -20],
  "1.49": [0, -10],
  "1.50": [0, -10],
  "1.51": [0, -20],
  "1.52": [0, 0],
  "1.53": [0, 10],
  "1.54": [0, 10],
  "1.55": [0, 20],
  "1.56": [0, -10],
  "1.57": [0, 10],
};
const q21IdtoPoints = {
  "2.1.1": [-20, -10, 0, 10, 20],
  "2.1.2": [-10, 0, 10],
  "2.1.3": [-10, 0, 10],
};
const q22IdtoPoints = {
  "2.2.1": [-10, 0, 10],
  "2.2.2": [-10, 0, 10],
  "2.2.3": [-10, 10],
  "2.2.4": [-10, 10],
};
const q3IdtoPoints = {
  "3.9": [0, 1, 2, 3, 4],
};

export const generateDescriptor = (selections: unknown, userId: string): DescriptorInterface => {
  if (
    !((el): el is object => {
      return typeof el === "object";
    })(selections)
  ) {
    throw new Error("selections is not an object");
  }
  const selectionsJSON = selections;
  //iterate through the keys-value pairs
  console.log(`selectionsJSON: ${JSON.stringify(selectionsJSON)}`);

  const q1Score: number[] = [];
  const q21Score: number[] = [];
  const q22Score: number[] = [];
  const q3Score: number[] = [];
  for (const [key, value] of Object.entries(selectionsJSON) as [string, string][]) {
    if (key.match(/^1\./)) {
      q1Score.push(q1IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^2.1\./)) {
      q21Score.push(q21IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^2.2\./)) {
      q22Score.push(q22IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^3\./)) {
      q3Score.push(parseInt(value));
    } else {
      assert(false, `Key ${key} is not valid`);
    }
  }
  const vector = [
    q1Score.reduce((a, b) => a + b, 0) / Object.keys(q1IdtoPoints).length,
    q21Score.reduce((a, b) => a + b, 0) / Object.keys(q21IdtoPoints).length,
    q22Score.reduce((a, b) => a + b, 0) / Object.keys(q22IdtoPoints).length,
    q3Score.reduce((a, b) => a + b, 0) / Object.keys(q3IdtoPoints).length,
  ];

  console.log(`Vector: ${vector}`);
  return new Descriptor({
    userId: userId,
    DescVector: vector,
  });
};

export const fecthResults = (descriptor: DescriptorInterface): string => {
  console.log(`Descriptor: ${descriptor.userId} ${descriptor.DescVector}`);
  const x = descriptor.DescVector[0]; //change x to an number
  const y = descriptor.DescVector[1];
  const cutOff = 5;

  console.log(x, y);
  console.log(descriptor.DescVector[3]);
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
};
