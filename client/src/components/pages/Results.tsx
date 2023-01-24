import React, { useEffect, useState } from "react";
import { post } from "../../utilities";

import "./Results.css";
import { RouteComponentProps, Link } from "@reach/router";

const displayResult = async (userId: string) => {
  // fecth the results from the server with params = userId and testObj from local storage

  const testObj = localStorage.getItem("testObj");
  if (!testObj) {
    alert("You must take the test before viewing the results");
    window.location.href = "/";
    return <></>;
  }
  const serverData = await post("/api/results", { userId: userId, testObj: testObj }).then((res) => {
    return (
      <>
        <h1>Results</h1>
        <p>Based on your answers, you are a {res.results.politicalName}.</p>
        <p>Here are some news sources that you might read to learn more about what other people think.</p>
        <ul>
          {res.results.suggestions.map((suggestion) => (
            <li>
              <img src={suggestion.img} />
              <a href={suggestion.url}>{suggestion.title}</a>
            </li>
          ))}
        </ul>
      </>
    );
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
      alert("You must be logged in to view this page");
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
      <Link to="/">
        <button>Home</button>
      </Link>
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
