import React from "react";
import { CredentialResponse } from "@react-oauth/google";

import "./Results.css";
import { RouteComponentProps, useLocation } from "@reach/router";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogout: () => void;
};
const Results = (props: Props) => {
  window.location.href = "/";
  return <></>;
};

export default Results;
