import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";

import "./Main.css";
import { Link, RouteComponentProps } from "@reach/router";

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

        {props.userId ? (
          <>
            <p> Take the test</p>
            <Link to="/test">
              <button>Test</button>
            </Link>
          </>
        ) : (
          <>
            <head>
              <title>Depolarizer</title>
            </head>
            <body>
              <h1>Depolarizer</h1>
              <section>
                <h2>Mission</h2>
                <h3>
                  Our mission is to assess your political views through a test and provide a platform for you to access news sources that present
                  opposing viewpoints, fostering critical thinking and informed discourse.
                </h3>
              </section>
              <section>
                <h3>Learn More</h3>
                <Link to="/learnmore">
                  <button>Learn More</button>
                </Link>

                <h3>Take Test</h3>
                <Link to="/test">
                  <button>Test</button>
                </Link>
              </section>
            </body>
          </>
        )}
      </GoogleOAuthProvider>
    </>
  );
};

export default Main;
