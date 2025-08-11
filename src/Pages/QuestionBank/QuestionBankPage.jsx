import React from "react";
import QuestionBank from "../../Components/QuestionBank/QuestionBank";

const QuestionBankPage = ({ user, token }) => {
  return <QuestionBank user={user} token={token} />;
};

export default QuestionBankPage;
