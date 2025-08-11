import React from "react";
import VocabularyTest from "../../Components/Vocabulary/VocabularyTest";

const VocabularyTestPage = ({ user, token }) => {
  return <VocabularyTest user={user} token={token} />;
};

export default VocabularyTestPage;
