import React, { useEffect, useState } from "react";
import { post } from "../../utilities";
import img from "../NoImg.png";
import "./Feed.css";
import { RouteComponentProps } from "@reach/router";
import { InfoCard } from "../../../../shared/common";

function layoutSuggestions(suggestions: InfoCard[]) {
  const completeCards: InfoCard[] = [];
  const imagelessCards: InfoCard[] = []; // certainly has no image but may have description
  const desclessCards: InfoCard[] = []; // has image but no description

  suggestions.forEach((suggestion) => {
    if (suggestion.img === "NoImg" || suggestion.img === "none") {
      imagelessCards.push(suggestion);
    } else if (suggestion.desc === "" || suggestion.desc === "none" || suggestion.desc === "NoDesc") {
      desclessCards.push(suggestion);
    } else {
      completeCards.push(suggestion);
    }
  });

  const allCards = [...completeCards, ...desclessCards, ...imagelessCards];

  // remove duplicates
  const uniqueCards = allCards.filter((card, i) => {
    return allCards.findIndex((c) => c.title === card.title) === i;
  });
  const primaryCards = uniqueCards.slice(0, 6);
  const nonPrimaryCards = uniqueCards.slice(6);

  return (
    <>
      <div className="pCardContainer">
        {primaryCards.map((card, i) => (
          <a href={card.url} className={`primaryCard u-textcolmain ${i >= 3 ? "wide" : ""} `} id={`pCard-${i}`} key={i}>
            <img className="suggestionImg" src={card.img} />
            <div className="suggestionTitle">{card.title}</div>
            {/* <div className="suggestionDesc u-textcolsec">{suggestion.desc} </div> */}
          </a>
        ))}
      </div>
      <div className="npCardContainer">
        {nonPrimaryCards.map((card, i) => (
          <div className="nonPrimaryCard" key={i} id={`npCard-${i}`}>
            <a href={card.url}>
              <div className="suggestionTitle u-textcolmain">{card.title}</div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

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
        <p className="resultText">Based on your answers, you are a {res.results.politicalName}.</p>
        <p className="resultText">Here are some news sources that you might read to learn more about what other people think.</p>
        <div className="suggestionsContainer">{layoutSuggestions(res.results.suggestions)}</div>
      </>
    );
  });

  return Promise.resolve(serverData);
};

type Props = RouteComponentProps & {
  userId?: string;
};
const Results = (props: Props) => {
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

  const [result, setResult] = useState<JSX.Element>(<></>);

  useEffect(() => {
    displayResult(userId!).then((result) => {
      setResult(result);
    });
  }, []);

  return <>{result}</>;
};

export default Results;
