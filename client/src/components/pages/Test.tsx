import React, { useEffect, useState } from "react";
import { TestObject, SingleTest } from "../../testutils";

import "./Test.css";
import { Link, RouteComponentProps } from "@reach/router";

const displayTest = async (tester: TestObject) => {
  const tests = await tester.getTests().then((tests) => tests.map((test, i) => <Button test={test} tester={tester} key={i} />));
  const testBools = tests.filter((test) => test.props.test.type === "bool");
  const testOptions = tests.filter((test) => test.props.test.type === "option");
  const testScales = tests.filter((test) => test.props.test.type === "scale");
  return (
    <>
      <p className="titleStatement">
        The following questions are designed to help us determine your news feed. Answer as many as you can for the best results and press
        <em> submit</em>.
      </p>
      <p className="testTitle">Select some news sources you usually read</p>
      <div className="testBoolContainer">{testBools}</div>
      <p className="testTitle">Select the statements you agree with the most?</p>
      <div className="testOptionContainer">{testOptions}</div>
      <p className="testTitle">Where would you place yourself on the following scale?</p>
      <div className="testScaleContainer">{testScales}</div>
      <Link to="/feed">
        <button
          className="testSubmit"
          onClick={() => {
            tester.save();
          }}
        >
          Submit
        </button>
      </Link>
    </>
  );
};

// use location to get the state from the previous page
type TestProps = RouteComponentProps & {
  userId?: string;
};

const Test = (props: TestProps) => {
  const { userId } = props;

  useEffect(() => {
    if (!userId) {
      alert("You must be logged in to view this page");
      window.location.href = "/";
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  const [test, setTest] = useState<JSX.Element>(<></>);
  const tester = new TestObject();

  useEffect(() => {
    displayTest(tester).then((test) => {
      setTest(test);
    });
  }, []);

  return <>{test}</>;
};

type ButtonProps = RouteComponentProps & {
  test: SingleTest;
  tester: TestObject;
};
const Button = (props: ButtonProps) => {
  const [selection, setSelection] = useState<number>(-1);
  if (props.test.type === "scale") {
    const slider = (
      <>
        <input
          className="testScale"
          type="range"
          min={props.test.min}
          max={props.test.max}
          step={props.test.step}
          defaultValue={props.test.default}
          onChange={(e) => {
            props.tester.addSel(props.test.id, e.target.value);
          }}
        />
      </>
    );
    return (
      <>
        <p className="testStatement">{props.test.question}</p>
        {slider}
      </>
    );
  } else if (props.test.type === "bool") {
    /* toggle opacity of div.testBool on clicking*/
    return (
      <>
        <input
          className="testBool"
          type="button"
          data-selected={selection == 1}
          value={props.test.question}
          onClick={() => {
            props.tester.addSel(props.test.id, selection === -1 ? "1" : "0");
            setSelection(-1 * selection);
          }}
        />
      </>
    );
  } else if (props.test.type === "option") {
    if (props.test.options === undefined) {
      return <></>;
    }
    const options = props.test.options.map((option, i) => (
      <button
        className="testOption"
        data-selected={selection === i}
        onClick={() => {
          setSelection(i);
          props.tester.addSel(props.test.id, i.toString());
        }}
        key={i}
      >
        {option}
      </button>
    ));
    return (
      <>
        <p className="testStatement">{props.test.question}</p>
        {options}
      </>
    );
  } else {
    return <></>;
  }
};

export default Test;
