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
  send(): Promise<void>;
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
  send(): Promise<void> {
    // sends the test object to the server using the fetch api also saves it to local storage

    // save to local storage
    localStorage.setItem("testObj", JSON.stringify(Object.fromEntries(this.options)));

    fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(this.options)),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
          console.log(JSON.stringify(response.json()));
        }
      })
      .catch((error) => {
        // do something
      });

    return Promise.resolve();
  }

  getTests(): Promise<SingleTest[]> {
    // for now return 2 tests with 2 options each
    const tests: SingleTest[] = [
      {
        id: "test1",
        question: "Is this a test?",
        type: "bool",
      },
      {
        id: "test2",
        question: "How many tests are there?",
        type: "scale",
        min: 1,
        max: 5,
        step: 1,
        default: 1,
      },
      {
        id: "test3",
        question: "What is the best test?",
        type: "option",
        options: ["test1", "test2", "test3"],
      },
    ];
    return Promise.resolve(tests);
  }
}
