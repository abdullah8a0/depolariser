import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "926449838822-o9nmpi2dtrcuge8rkso0sti3vm5ln10d.apps.googleusercontent.com";

//Navigation bar
type NavBarProps = RouteComponentProps & {
  userId?: string;
  handleLogin: (response: CredentialResponse) => void;
  handleLogout: () => void;
};
const NavBar = (props: NavBarProps) => {
  const { userId, handleLogin, handleLogout } = props;
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">
        <Link className="Router-link" to="/">
          Home
        </Link>
      </div>
      <div className="NavBar-links">
        <Link className="Router-link" to="/test">
          Test
        </Link>
        <Link className="Router-link" to="/feed">
          Feed
        </Link>
        <Link className="Router-link" to="/learnmore">
          Learn More
        </Link>
      </div>
      <div className="NavBar-login">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};
export default NavBar;
