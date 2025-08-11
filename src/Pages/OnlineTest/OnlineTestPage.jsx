import React from "react";
import OnlineTest from "../../Components/OnlineTest/OnlineTest";

const OnlineTestPage = ({ user, token }) => {
  return <OnlineTest user={user} token={token} />;
};

export default OnlineTestPage;
