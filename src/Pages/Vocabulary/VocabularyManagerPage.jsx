import React from "react";
import VocabularyManager from "../../Components/Vocabulary/VocabularyManager";

const VocabularyManagerPage = ({ user, token }) => {
  return <VocabularyManager user={user} token={token} />;
};

export default VocabularyManagerPage;
