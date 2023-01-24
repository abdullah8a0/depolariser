import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";
import { assert } from "console";
import { parseCNN, parseFOX, InfoCard } from "./scrape";

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
  "2.1.1": [-10, -5, 0, 5, 10],
  "2.1.2": [-5, 0, 5],
  "2.1.3": [-5, 0, 5],
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
    q1Score.reduce((a, b) => a + b, 0) / Math.max(q1Score.length, 1),
    q21Score.reduce((a, b) => a + b, 0),
    q22Score.reduce((a, b) => a + b, 0),
    q3Score.reduce((a, b) => a + b, 0) / Object.keys(q3IdtoPoints).length,
  ];

  console.log(`Vector: ${vector}`);
  return new Descriptor({
    userId: userId,
    DescVector: vector,
  });
};

type PolInfo = {
  politicalType: number;
  politicalName: string;
  wing: "left" | "right";
  politicalDescription: string;
};

const generateSuggestions = async (userPlacement: PolInfo): Promise<InfoCard[]> => {
  return userPlacement.wing == "left" ? await parseFOX("politics") : await parseCNN("politics");
};

export const fecthResults = async (descriptor: DescriptorInterface): Promise<any> => {
  const x = descriptor.DescVector[0];
  const y = descriptor.DescVector[1];
  const q2 = descriptor.DescVector[2];
  const q3 = descriptor.DescVector[3];

  const angle = Math.atan2(y, x);
  const pi = Math.PI;

  const userPlacement: PolInfo = {
    politicalType: 0,
    politicalName: "",
    wing: "left",
    politicalDescription: "",
  };

  console.log(x, y);
  console.log(descriptor.DescVector[3]);

  //based on question 1 and 2 political type is selected
  if (-pi / 8 < angle && angle < pi / 8) {
    userPlacement.politicalType = 1;
  } else if (pi / 8 <= angle && angle < (3 * pi) / 8) {
    userPlacement.politicalType = 2;
  } else if ((3 * pi) / 8 <= angle && angle < (5 * pi) / 8) {
    userPlacement.politicalType = 3;
  } else if ((5 * pi) / 8 <= angle && angle < (7 * pi) / 8) {
    userPlacement.politicalType = 4;
  } else if ((7 * pi) / 8 <= angle && angle < (-7 * pi) / 8) {
    userPlacement.politicalType = 5;
  } else if ((-7 * pi) / 8 <= angle && angle < (-5 * pi) / 8) {
    userPlacement.politicalType = 6;
  } else if ((-5 * pi) / 8 <= angle && angle < (-3 * pi) / 8) {
    userPlacement.politicalType = 7;
  } else if ((-3 * pi) / 8 <= angle && angle < -pi / 8) {
    userPlacement.politicalType = 8;
  } else {
    userPlacement.politicalType = 0;
  }

  // map the nummber to the name
  if (userPlacement.politicalType == 1) {
    userPlacement.politicalName = "Theoconservative";
    userPlacement.wing = "right";
  } else if (userPlacement.politicalType == 2) {
    userPlacement.politicalName = "Paleoconservative";
    userPlacement.wing = "right";
  } else if (userPlacement.politicalType == 3) {
    userPlacement.politicalName = "Paleolibertarian";
    userPlacement.wing = "right";
  } else if (userPlacement.politicalType == 4) {
    userPlacement.politicalName = "Individualist";
    userPlacement.wing = "right";
  } else if (userPlacement.politicalType == 5) {
    userPlacement.politicalName = "Radical";
    userPlacement.wing = "left";
  } else if (userPlacement.politicalType == 6) {
    userPlacement.politicalName = "Progressive";
    userPlacement.wing = "left";
  } else if (userPlacement.politicalType == 7) {
    userPlacement.politicalName = "Communitarian";
    userPlacement.wing = "left";
  } else if (userPlacement.politicalType == 8) {
    userPlacement.politicalName = "Neoconservative";
    userPlacement.wing = "right";
  } else {
    userPlacement.politicalName = "Populist";
    userPlacement.wing = "right";
  }
  return {
    politicalName: userPlacement.politicalName,
    suggestions: await generateSuggestions(userPlacement),
  };
};
