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
      {/* <div>
        <title>Depolarizer</title>
      </div> */}
      <div className="background body">
        <h1 className="titleBox">Depolarizer</h1>
        <section className="missionBox">
          <h3>
            Our mission is to assess your political views through a test and provide a platform for you to access news sources that present opposing
            viewpoints, fostering critical thinking and informed discourse.
          </h3>
        </section>
        <section className="box">
          <div className="smallBox">
            <h4>To read more about our test and how our algorithm works press learn more.</h4>
            <Link to="/learnmore">
              <button className="button">LEARN MORE</button>
            </Link>
          </div>
          <div className="smallBox">
            <h4>In order to figure out your political type take the test.</h4>
            <Link to="/test">
              <button className="button">TAKE TEST</button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;
