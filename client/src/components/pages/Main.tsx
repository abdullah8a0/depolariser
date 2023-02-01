import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";

import "./Main.css";
import "../../utilities.css";
import { Link, RouteComponentProps } from "@reach/router";

type Props = RouteComponentProps & {
  userId?: string;
};
const Main = (props: Props) => {
  // button redirects to /test
  // main page seen when not logged on
  // the test button is shown when the user is logged in
  return (
    <>
      <div className="background body">
        <div className="mainGrid">
          <section className="missionBox u-addShadow">
            <h3>
              Depolarizer is designed to figure out your political perspective and then to suggest news articles and sources which generally cater to
              people with opposing viewpoints. Overall, Depolarizer aims to foster a safe environment to increase the array of news sources read by
              the general public and foster critical thinking and informed discourse.
            </h3>
          </section>
          <div className="smallBox u-addShadow">
            <h4>
              More information on the website, such as the theory behind the different political perspectives, and the news sources that are suggested
              can be found in the Learn More page.
            </h4>
            <Link to="/learnmore">
              <button className="redirect">LEARN MORE</button>
            </Link>
          </div>
          <div className="smallBox u-addShadow">
            <h4>
              The test will assign you a political perspective based on your political views, as understood by the different questions. To figure out
              your political perspective take the test.
            </h4>
            <Link to="/test">
              <button className="redirect">TAKE TEST</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
