import React, { useEffect, useState } from "react";
import { post } from "../../utilities";

import "./Feed.css";
import { RouteComponentProps } from "@reach/router";

const displayResult = async (userId: string) => {
  // fecth the results from the server with params = userId and testObj from local storage

  const testObj = localStorage.getItem("testObj");
  if (!testObj) {
    // alert("You must take the test before viewing the results");
    // window.location.href = "/";
    // return <></>;
  }
  const serverData = await post("/api/results", { userId: userId, testObj: testObj }).then((res) => {
    return (
      <>
        <p>Based on your answers, you are a {res.results.politicalName}.</p>
        <p>Here are some news sources that you might read to learn more about what other people think.</p>
        <ul className="suggestionsContainer">
          {res.results.suggestions.map((suggestion) => (
            <a href={suggestion.url}>
              <li className="suggestionCard">
                <img className="suggestionImg" src={suggestion.img} />
                <div className="suggestionTitle">{suggestion.title}</div>
                <div className="suggestionDesc">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquet nunc, eget
                  aliquet nisl nisl sit amet nunc.
                </div>
              </li>
            </a>
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
};
const Results = (props: Props) => {
  const { userId } = props;
  useEffect(() => {
    if (!userId) {
      // alert("You must be logged in to view this page");
      // window.location.href = "/";
    }
  }, [userId]);

  if (!userId) {
    // return <></>;
  }

  const [result, setResult] = useState<JSX.Element>(<></>);

  useEffect(() => {
    displayResult(userId!).then((result) => {
      setResult(result);
    });
  }, []);

  return (
    <>
      <h1>Your Results are:</h1>
      {result}
    </>
  );
};

export default Results;
