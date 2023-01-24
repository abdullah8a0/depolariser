import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";

import "./Main.css";
import "../../utilities.css";
import { Link, RouteComponentProps } from "@reach/router";

import LearnMore from "./LearnMore";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "926449838822-o9nmpi2dtrcuge8rkso0sti3vm5ln10d.apps.googleusercontent.com";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Main = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  // button redirects to /test
  // main page seen when not logged on
  // the test button is shown when the user is logged in
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {props.userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
        )}

        <head>
          <title>Depolarizer</title>
        </head>

        {props.userId ? (
          <>
            <p> Take the test</p>
            <Link to="/test">
              <button>Test</button>
            </Link>
          </>
        ) : (
          <>
            <body className="background">
              <h1 className="u-textCenter font">Depolarizer</h1>
              <section className="missionBox">
                <h3>
                  Our mission is to assess your political views through a test and provide a platform for you to access news sources that present
                  opposing viewpoints, fostering critical thinking and informed discourse.
                </h3>
              </section>
              <section className="column">
                <div className="smallColumn">
                  <h4>To read more about our test and how our algorithm works press learn more.</h4>
                  <Link to="/learnmore">
                    <button className="button">LEARN MORE</button>
                  </Link>
                </div>
                <div className="smallColumn">
                  <h4>In order to figure out your political type take the test.</h4>
                  <Link to="/test">
                    <button className="button">TAKE TEST</button>
                  </Link>
                </div>
              </section>
            </body>
          </>
        )}
      </GoogleOAuthProvider>
    </>
  );
};

export default Main;
