import React, { useEffect, useState } from "react";
import { post } from "../../utilities";

import "./Results.css";
import { RouteComponentProps } from "@reach/router";

const displayResult = async (userId: string) => {
  // fecth the results from the server with params = userId and testObj from local storage

  const testObj = localStorage.getItem("testObj");
  if (!testObj) {
    window.location.href = "/";
    return <></>;
  }
  const serverData = await post("/api/results", { userId: userId, testObj: testObj }).then((res) => {
    return <div dangerouslySetInnerHTML={{ __html: res.results }}></div>;
  });

  // return the results

  return Promise.resolve(serverData);
};

type Props = RouteComponentProps & {
  userId?: string;
  handleLogout: () => void;
};
const Results = (props: Props) => {
  const { userId, handleLogout } = props;
  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  const [result, setResult] = useState<JSX.Element>(<></>);

  useEffect(() => {
    displayResult(userId).then((result) => {
      setResult(result);
    });
  }, []);

  return (
    <>
      <p>This is the results page!</p>
      <button
        onClick={() => {
          window.location.href = "/";
          handleLogout();
        }}
      >
        Logout
      </button>
      <h1>Your Results are:</h1>
      {result}
    </>
  );
};

export default Results;
