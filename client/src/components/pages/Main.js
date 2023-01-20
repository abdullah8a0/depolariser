import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Main.css";

const GOOGLE_CLIENT_ID = "926449838822-o9nmpi2dtrcuge8rkso0sti3vm5ln10d.apps.googleusercontent.com";

const Main = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </GoogleOAuthProvider>
      <h1>This is the Main Page</h1>
    </>
  );
};

export default Main;
