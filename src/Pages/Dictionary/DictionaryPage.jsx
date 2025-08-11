import React from "react";
import Dictionary from "../../Components/Dictionary/Dictionary";

const DictionaryPage = ({ user, token }) => {
  return <Dictionary user={user} token={token} />;
};

export default DictionaryPage;
