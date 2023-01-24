import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";

import "./Main.css";
import { Link, RouteComponentProps } from "@reach/router";

const GOOGLE_CLIENT_ID = "926449838822-o9nmpi2dtrcuge8rkso0sti3vm5ln10d.apps.googleusercontent.com";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Main = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  // button redirects to /test
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
        <h1>This is the Main Page</h1>
        {props.userId ? (
          <>
            <p> Take the test</p>
            <Link to="/test">
              <button>Test</button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </GoogleOAuthProvider>
    </>
  );
};

export default Main;
