import React from "react";
import LovesList from "../../Components/LoveSystem/LovesList";

const LovesListPage = ({ user, token }) => {
  return <LovesList user={user} token={token} />;
};

export default LovesListPage;
