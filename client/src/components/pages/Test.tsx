import React, { useEffect, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { TestObject, SingleTest } from "../../testutils";

import "./Test.css";
import { Link, RouteComponentProps, useLocation } from "@reach/router";

const displayTest = async (tester: TestObject) => {
  const tests = await tester.getTests().then((tests) => tests.map((test, i) => <Button test={test} tester={tester} key={i} />));

  return (
    <>
      <p>Take the test</p>
      {tests}
      <Link to="/results">
        <button
          onClick={() => {
            tester.send();
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
  // const { selection, setSelection } = useState<number>(0);

  if (props.test.type === "number") {
    const options = props.test.options.map((option, i) => (
      <button className="testOption" key={i} onClick={() => props.tester.addSel(props.test.id, option)}>
        {option}
      </button>
    ));
    return (
      <>
        <p className="testStatement">{props.test.question}</p>
        {options}
      </>
    );
  } else if (props.test.type === "boolean") {
    return (
      <>
        <p className="testStatement">{props.test.question}</p>
        <button
          className="testOption"
          onClick={() => {
            props.tester.addSel(props.test.id, props.test.options[0]);
          }}
        >
          {props.test.options[0]}
        </button>
        <button
          className="testOption"
          onClick={() => {
            props.tester.addSel(props.test.id, props.test.options[1]);
          }}
        >
          {props.test.options[1]}
        </button>
      </>
    );
  } else {
    return <></>;
  }
};

export default Test;
