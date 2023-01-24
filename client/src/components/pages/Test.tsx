import React, { useEffect, useState } from "react";
import { TestObject, SingleTest } from "../../testutils";

import "./Test.css";
import { Link, RouteComponentProps } from "@reach/router";

const displayTest = async (tester: TestObject) => {
  const tests = await tester.getTests().then((tests) => tests.map((test, i) => <Button test={test} tester={tester} key={i} />));

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <p>Take the test</p>
      <p>Select which news sources do you usually read</p>
      {tests}
      <Link to="/results">
        <button
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
  handleLogout: () => void;
};

const Test = (props: TestProps) => {
  const { userId, handleLogout } = props;

  useEffect(() => {
    if (!userId) {
      alert("You must be logged in to view this page");
      window.location.href = "/";
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  // render the test page

  const [test, setTest] = useState<JSX.Element>(<></>);
  const tester = new TestObject();

  useEffect(() => {
    displayTest(tester).then((test) => {
      setTest(test);
    });
  }, []);

  return (
    <>
      <p>This is the test page!</p>
      <button
        onClick={() => {
          window.location.href = "/";
          handleLogout();
        }}
      >
        Logout
      </button>
      {test}
    </>
  );
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
        <button
          className="testBool"
          data-selected={selection}
          onClick={() => {
            setSelection(-1 * selection);
            props.tester.addSel(props.test.id, (selection === -1 ? 0 : 1).toString());
          }}
        >
          <p className="testStatement">{props.test.question}</p>
        </button>
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
