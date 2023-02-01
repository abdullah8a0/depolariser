import React, { useEffect, useState } from "react";
import { post } from "../../utilities";
import img from "../NoImg.png";
import info from "../info.png";
import "./Feed.css";
import { RouteComponentProps } from "@reach/router";
import { InfoCard } from "../../../../shared/common";

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

function layoutSuggestions(suggestions: InfoCard[]) {
  const completeCards: InfoCard[] = [];
  const imagelessCards: InfoCard[] = []; // certainly has no image but may have description
  const desclessCards: InfoCard[] = []; // has image but no description

  suggestions.forEach((suggestion) => {
    if (suggestion.img === "NoImg" || suggestion.img === "none") {
      imagelessCards.push(suggestion);
    } else if (suggestion.desc === "" || suggestion.desc === "none" || suggestion.desc === "undefined") {
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

  allCards.forEach((card) => {
    console.log(`desc: ${card.desc} img: ${card.img} title: ${card.title} url: ${card.url}`);
  });

  return (
    <>
      <div className={`pCardContainer`}>
        {primaryCards.map((card, i) => (
          <a href={card.url} id={`pCard-${i}`} className={`primaryCard u-textcolmain inactive ${i >= 3 ? "wide" : ""}`} key={i}>
            <div className="suggestionDesc">{card.desc}</div>
            <img className="suggestionImg" src={card.img === "NoImg" ? img : card.img} alt="suggestion" />

            <div className="suggestionTitle">{card.title}</div>
            <img
              src={info}
              className="infoIcon"
              alt="get summary"
              onClick={(event) => {
                event.preventDefault();
                // display the description
                document.getElementsByClassName("suggestionDesc")[i].classList.toggle("disp");
                document.getElementsByClassName("suggestionImg")[i].classList.toggle("noDisp");
              }}
            />
          </a>
        ))}
      </div>
      <div className="npCardContainer">
        {nonPrimaryCards.map((card, i) => (
          <div className="nonPrimaryCard s-inactive" key={i} id={`npCard-${i}`}>
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
        <p className="resultText">
          Based on your answers, you are a <em>{res.results.politicalName}</em>.
        </p>
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

  // forces the cards to animate when they are in the viewport at the start
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const cards = document.getElementsByClassName("primaryCard");
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        if (isElementInViewport(card)) {
          card.classList.remove("inactive");
          card.classList.add("active");
        }
      }

      const npCards = document.getElementsByClassName("nonPrimaryCard");
      for (let i = 0; i < npCards.length; i++) {
        const card = npCards[i] as HTMLElement;
        if (isElementInViewport(card)) {
          card.classList.remove("s-inactive");
          card.classList.add("s-active");
        }
      }
    });
  }, []);

  if (!userId) {
    return <></>;
  }

  const [result, setResult] = useState<JSX.Element>(<></>);

  // fetch the results from the server
  useEffect(() => {
    displayResult(userId!).then((result) => {
      setResult(result);
    });
  }, []);

  // used to check if the element is in the viewport, animate the cards when they are
  useEffect(() => {
    const cards = document.getElementsByClassName("primaryCard");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      if (isElementInViewport(card)) {
        card.classList.remove("inactive");
        card.classList.add("active");
      }
    }

    const npCards = document.getElementsByClassName("nonPrimaryCard");
    for (let i = 0; i < npCards.length; i++) {
      const card = npCards[i] as HTMLElement;
      if (isElementInViewport(card)) {
        card.classList.remove("s-inactive");
        card.classList.add("s-active");
      }
    }
  }, [result]);

  return <>{result}</>;
};

export default Results;
