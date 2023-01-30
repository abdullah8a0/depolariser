import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";
import { assert } from "console";
import { parseCNN, parseFOX, InfoCard } from "./scrape";
import Card from "./models/Card";
import CardInterface from "../shared/Card";

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
  /**"1.12": [0, -20], */
  "1.12": [0, -20],
  "1.13": [0, -20],
  "1.14": [0, 20],
  "1.15": [0, -20],
  "1.16": [0, 0],
  "1.17": [0, 20],
  /**"1.19": [0, 20], */
  "1.18": [0, -20],
  "1.19": [0, -10],
  "1.20": [0, -20],
  "1.21": [0, -20],
  "1.22": [0, 20],
  "1.23": [0, -10],
  "1.24": [0, 20],
  "1.25": [0, -10],
  /**"1.28": [0, -20], */
  "1.26": [0, 0],
  "1.27": [0, 0],
  "1.28": [0, -10],
  /**"1.32": [0, -10], */
  "1.29": [0, -10],
  "1.30": [0, 10],
  "1.31": [0, 0],
  "1.32": [0, -20],
  "1.33": [0, 20],
  "1.34": [0, -20],
  "1.35": [0, 20],
  "1.36": [0, 20],
  "1.37": [0, 20],
  "1.38": [0, -10],
  "1.39": [0, 10],
  "1.40": [0, 20],
  "1.41": [0, -10],
  "1.42": [0, 0],
  "1.43": [0, -20],
  "1.44": [0, -20],
  "1.45": [0, -10],
  "1.46": [0, -10],
  "1.47": [0, -20],
  "1.48": [0, 0],
  /**"1.53": [0, 10],*/
  "1.49": [0, 10],
  "1.50": [0, 20],
  "1.51": [0, -10],
  "1.52": [0, 10],
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
  "3.1": [
    [2, 3, 5],
    [2, 3, 5],
    [4, 7, 1],
    [6, 0],
    [6, 0],
  ],
  "3.2": [
    [6, 2, 3],
    [6, 2, 3],
    [7, 1, 5],
    [0, 4],
    [0, 4],
  ],
  "3.3": [[1, 2], [1, 2], [0, 4, 3, 7, 5], [6], [6]],
  "3.4": [[2], [2], [0, 4, 3, 7, 1], [5, 6], [5, 6]],
  "3.5": [[2, 0, 7, 1], [2, 0, 7, 1], [6], [4, 3, 5], [4, 3, 5]],
  "3.6": [[4, 3, 5], [4, 3, 5], [6], [2, 0, 7, 1], [2, 0, 7, 1]],
  "3.7": [
    [6, 5],
    [6, 5],
    [0, 4, 1],
    [2, 3, 7],
    [2, 3, 7],
  ],
  "3.8": [[2, 0, 7, 1], [2, 0, 7, 1], [6], [4, 3, 5], [4, 3, 5]],
  "3.9": [[7], [7], [6, 0, 3, 1], [2, 4, 5], [2, 4, 5]],
};
/**
 * Theoconservative = 0
 * Paleoconservative = 1
 * Paleolibertarian = 2
 * Individualist = 3
 * Radical = 4
 * Progressive = 5
 * Communitarian = 6
 * Neoconservative = 7
 * Populist = 8
 */

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
  const q3Score: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  for (const [key, value] of Object.entries(selectionsJSON) as [string, string][]) {
    if (key.match(/^1\./)) {
      q1Score.push(q1IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^2.1\./)) {
      q21Score.push(q21IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^2.2\./)) {
      q22Score.push(q22IdtoPoints[key][parseInt(value)]);
    } else if (key.match(/^3\./)) {
      const indicesToInc = q3IdtoPoints[key][parseInt(value)] as number[];
      indicesToInc.forEach((ind) => {
        q3Score[ind]++;
      });
    } else {
      assert(false, `Key ${key} is not valid`);
    }
  }
  const vector = [
    q1Score.reduce((a, b) => a + b, 0) / Math.max(q1Score.length, 1),
    q21Score.reduce((a, b) => a + b, 0),
    q22Score.reduce((a, b) => a + b, 0),
    q3Score.indexOf(Math.max(...q3Score)),
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

/**
 * It takes in a user's political placement and returns a list of news articles that are relevant to
 * the user's political placement.
 * Looks up today's news articles from the database. If there are no articles, it scrapes the news.
 *
 * @param {PolInfo} userPlacement - PolInfo
 * @returns An array of InfoCard objects
 */
const generateSuggestions = async (userPlacement: PolInfo): Promise<InfoCard[]> => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const card = await Card.findOne({ date: todayString });
  if (card) {
    return userPlacement.wing == "left" ? card.FOXCards : card.CNNCards;
  } else {
    const newCard = new Card({
      date: todayString,
      CNNCards: await parseCNN("politics"),
      FOXCards: await parseFOX("politics"),
    });
    await newCard.save();
    return userPlacement.wing === "left" ? newCard.FOXCards : newCard.CNNCards;
    // return newCard.FOXCards; // TODO: change this back to the above line
  }
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

  //console.log(x, y);
  //console.log(descriptor.DescVector[3]);

  //groups people into one of eight groups based on x and y values (q1, q2.1)
  var group = 8;

  if (-pi / 8 < angle && angle < pi / 8) {
    group = 0;
  } else if (pi / 8 <= angle && angle < (3 * pi) / 8) {
    group = 1;
  } else if ((3 * pi) / 8 <= angle && angle < (5 * pi) / 8) {
    group = 2;
  } else if ((5 * pi) / 8 <= angle && angle < (7 * pi) / 8) {
    group = 3;
  } else if ((7 * pi) / 8 <= angle && angle < (-7 * pi) / 8) {
    group = 4;
  } else if ((-7 * pi) / 8 <= angle && angle < (-5 * pi) / 8) {
    group = 5;
  } else if ((-5 * pi) / 8 <= angle && angle < (-3 * pi) / 8) {
    group = 6;
  } else if ((-3 * pi) / 8 <= angle && angle < -pi / 8) {
    group = 7;
  }

  if (x === 0 && y === 0) {
    group = 8;
  }

  console.log(`group: ${group}`);

  //check if it fits with the groups from by comparing to results form q3
  if (group != q3) {
    if (1 < group && group < 7) {
      if (group + 1 === q3 || group - 1 === q3) {
        group = q3;
      } else {
        group = 8;
      }
    } else {
      if ((group === 7 && q3 === 1) || (group === 1 && q3 === 7)) {
        group = q3;
      } else {
        group = 8;
      }
    }
  }

  // map the nummber to the name
  if (group === 0) {
    userPlacement.politicalName = "Theoconservative";
    userPlacement.wing = "right";
  } else if (group === 1) {
    userPlacement.politicalName = "Paleoconservative";
    userPlacement.wing = "right";
  } else if (group === 2) {
    userPlacement.politicalName = "Paleolibertarian";
    userPlacement.wing = "right";
  } else if (group === 3) {
    userPlacement.politicalName = "Individualist";
    userPlacement.wing = "right";
  } else if (group === 4) {
    userPlacement.politicalName = "Radical";
    userPlacement.wing = "left";
  } else if (group === 5) {
    userPlacement.politicalName = "Progressive";
    userPlacement.wing = "left";
  } else if (group === 6) {
    userPlacement.politicalName = "Communitarian";
    userPlacement.wing = "left";
  } else if (group === 7) {
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
