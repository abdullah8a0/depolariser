export type SingleTest = {
  id: string;
  question: string;
  type: "option" | "scale" | "bool";
  options?: Array<string>;
  min?: number;
  max?: number;
  step?: number;
  default?: number;
};

/**
 * A test object is an object that encapsulates the user's response to the options
 * presented by the test. It is used to generate the test's output.
 */
interface TestInterface {
  addSel(id: string, value: string): void;
  removeSel(id: string): void;
  save(): void;
  getTests(): Promise<Array<SingleTest>>;
}

export class TestObject implements TestInterface {
  options: Map<string, string>;
  public constructor() {
    this.options = new Map();
  }
  addSel(id: string, value: string): void {
    this.options.set(id, value);
  }
  removeSel(id: string): void {
    // if it doesnt exist, do nothing
    if (this.options.has(id)) {
      this.options.delete(id);
    }
  }
  save(): void {
    // sends the test object to the server using the fetch api also saves it to local storage

    // save to local storage
    localStorage.setItem("testObj", JSON.stringify(Object.fromEntries(this.options)));

    // fetch("/api/test", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(Object.fromEntries(this.options)),
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("success");
    //       console.log(JSON.stringify(response.json()));
    //     }
    //   })
    //   .catch((error) => {
    //     // do something
    //   });

    return;
  }

  getTests(): Promise<SingleTest[]> {
    // for now return 2 tests with 2 options each
    const tests: SingleTest[] = [
      {
        id: "1.1",
        question: "ABC News",
        type: "bool",
      },
      {
        id: "1.2",
        question: "Alter Net",
        type: "bool",
      },
      {
        id: "1.3",
        question: "Associated Press",
        type: "bool",
      },
      {
        id: "1.4",
        question: "Associated Press Fact Check",
        type: "bool",
      },
      {
        id: "1.5",
        question: "Axios",
        type: "bool",
      },
      {
        id: "1.6",
        question: "BBC News",
        type: "bool",
      },
      {
        id: "1.7",
        question: "Bloomberg",
        type: "bool",
      },
      {
        id: "1.8",
        question: "Breitbart News",
        type: "bool",
      },
      {
        id: "1.9",
        question: "Buzfeed News",
        type: "bool",
      },
      {
        id: "1.10",
        question: "CBS News (Online)",
        type: "bool",
      },
      {
        id: "1.11",
        question: "Christian Science Monitor",
        type: "bool",
      },
      {
        id: "1.12",
        question: "CNN (Online News)",
        type: "bool",
      },
      {
        id: "1.13",
        question: "CNN (Opinion)",
        type: "bool",
      },
      {
        id: "1.14",
        question: "Daily Beast",
        type: "bool",
      },
      {
        id: "1.15",
        question: "Daily Mail",
        type: "bool",
      },
      {
        id: "1.16",
        question: "Democracy Now",
        type: "bool",
      },
      {
        id: "1.17",
        question: "Forbes",
        type: "bool",
      },
      {
        id: "1.18",
        question: "Fox News (Online News)",
        type: "bool",
      },
      {
        id: "1.19",
        question: "Fox News (Opinion)",
        type: "bool",
      },
      {
        id: "1.20",
        question: "HuffPost",
        type: "bool",
      },
      {
        id: "1.21",
        question: "Insider",
        type: "bool",
      },
      {
        id: "1.22",
        question: "Mother Jones",
        type: "bool",
      },
      {
        id: "1.23",
        question: "MSNBC",
        type: "bool",
      },
      {
        id: "1.24",
        question: "National Review",
        type: "bool",
      },
      {
        id: "1.25",
        question: "NBC News (Online)",
        type: "bool",
      },
      {
        id: "1.26",
        question: "New York Post (News)",
        type: "bool",
      },
      {
        id: "1.27",
        question: "New York Times (News)",
        type: "bool",
      },
      {
        id: "1.28",
        question: "New York Times (Opinion)",
        type: "bool",
      },
      {
        id: "1.29",
        question: "NewsNation",
        type: "bool",
      },
      {
        id: "1.30",
        question: "Newsweek",
        type: "bool",
      },
      {
        id: "1.31",
        question: "NPR (Online News)",
        type: "bool",
      },
      {
        id: "1.32",
        question: "NPR (Opinion)",
        type: "bool",
      },
      {
        id: "1.33",
        question: "Politico",
        type: "bool",
      },
      {
        id: "1.34",
        question: "Reason",
        type: "bool",
      },
      {
        id: "1.35",
        question: "Reuters",
        type: "bool",
      },
      {
        id: "1.36",
        question: "Slate",
        type: "bool",
      },
      {
        id: "1.37",
        question: "The American Spectator",
        type: "bool",
      },
      {
        id: "1.38",
        question: "The Atlantic",
        type: "bool",
      },
      {
        id: "1.39",
        question: "The Blaze",
        type: "bool",
      },
      {
        id: "1.40",
        question: "The Daily Caller",
        type: "bool",
      },
      {
        id: "1.41",
        question: "The Daily Wire",
        type: "bool",
      },
      {
        id: "1.42",
        question: "The Economist",
        type: "bool",
      },
      {
        id: "1.43",
        question: "The Epoch Times",
        type: "bool",
      },
      {
        id: "1.44",
        question: "The Federalist",
        type: "bool",
      },
      {
        id: "1.45",
        question: "The Guardian",
        type: "bool",
      },
      {
        id: "1.46",
        question: "The Hill",
        type: "bool",
      },
      {
        id: "1.47",
        question: "The Intercept",
        type: "bool",
      },
      {
        id: "1.48",
        question: "The New Yorker",
        type: "bool",
      },
      {
        id: "1.49",
        question: "Time Magazine",
        type: "bool",
      },
      {
        id: "1.50",
        question: "USA TODAY",
        type: "bool",
      },
      {
        id: "1.51",
        question: "Vox",
        type: "bool",
      },
      {
        id: "1.52",
        question: "Wall Street Journal (News)",
        type: "bool",
      },
      {
        id: "1.53",
        question: "Wall Street Jounral (Opinion)",
        type: "bool",
      },
      {
        id: "1.54",
        question: "Washington Examiner",
        type: "bool",
      },
      {
        id: "1.55",
        question: "Washington Free Beacon",
        type: "bool",
      },
      {
        id: "1.56",
        question: "Washington Post",
        type: "bool",
      },
      {
        id: "1.57",
        question: "Washington Times",
        type: "bool",
      },
      {
        id: "2.1.1",
        question: "Government Size:",
        type: "option",
        options: [
          "Government should encompass all economic activity to have absolute control over economy and society.",
          "Government services should be expanded to promote social and economic equality.",
          "Government services should be limited to maintain order and stability.",
          "Government should only fulfill the most necessary services such as national security.",
          "Government should be abolished.",
        ],
      },
      {
        id: "2.1.2",
        question: "Economic Policy (Business):",
        type: "option",
        options: [
          "Business corporations abuse their market power, they should be restrained.",
          "Business corporations operate in a reasonable regulatory environment.",
          "Business corporations are subject to excessive regulation.",
        ],
      },
      {
        id: "2.1.3",
        question: "Economic Policy (Taxation):",
        type: "option",
        options: [
          "Taxes on the wealthy should be raised to fund programs that benefit the society as a whole",
          "Only the taxes on the wealthy should be lowered to support economic growth.",
          "Taxes should be lowered in general to support economic growth.",
        ],
      },
      {
        id: "2.2.1",
        question: "Clean Energy:",
        type: "option",
        options: [
          "Government should invest in clean energy research and development, and conduct policies to encourage the use of clean energy.",
          "The private sector, rather than the government, should lead the transition to clean energy with support from the government.",
          "People should be free to choose their energy source and the market forces should drive the transition to clean energy rather than government intervention.",
        ],
      },
      {
        id: "2.2.2",
        question: "Racial Injustice:",
        type: "option",
        options: [
          "Laws and institutions are fundamentally biased against some racial and ethnic groups and need to be completely changed.",
          "Laws and institutions result in certain inequities which can be alleviated by making necessary adjustments in the system.",
          "Little or nothing needs to be done against racial injustice.",
        ],
      },
      {
        id: "2.2.3",
        question: "Abortion:",
        type: "option",
        options: [
          "Women should have access to safe and legal abortion since it is essential for women's reproductive rights and autonomy.",
          "Abortion should be illegal or severely restricted because it is morally wrong and the government has an obligation to protect the unborn baby.",
        ],
      },
      {
        id: "2.2.4",
        question: "Immigration:",
        type: "option",
        options: [
          "Immigration should be open and inclusive, and immigrants should have the same rights and opportunities as citizens.",
          "Immigration should be limited and that the government should have greater control over who is allowed to enter the country.",
        ],
      },
      {
        id: "3.1",
        question: "Individualism - Communalism",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.2",
        question: "Pragmatism - Ideology",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.3",
        question: "Decentralized - Centralized",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.4",
        question: "Private - Public",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.5",
        question: "Tradition - Progress",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.6",
        question: "Egalitarian - Hierarchial",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.7",
        question: "Deregulation - Regulation",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.8",
        question: "Religious - Secular",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "3.9",
        question: "Military - Pacifist",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
    ];
    return Promise.resolve(tests);
  }
}
