import React, { useState } from "react";

const GrammarChecker = () => {
  const [inputText, setInputText] = useState("");
  const [newText, setNewText] = useState("");
  const [checkedText, setCheckedText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      const response = await fetch(
        "https://learnverse.onrender.com/grammar-checker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
          }),
        }
      );

      const data = await response.json();
      const array = data.data;
      let updatedText = inputText;
      array.forEach(({ index, length, correct }) => {
        console.log(index);
        updatedText =
          updatedText.slice(0, index) +
          correct.value +
          updatedText.slice(index + length);
      });

      setCheckedText(updatedText);
    } catch (error) {
      console.error("Error Checked text:", error);
    }
  };

  return (
    <div className="bg-sky-100 dark:bg-slate-900 backdrop:blur-lg shadow-xl rounded-lg p-10 max-w-5xl mx-auto">
      <div className="mt-6">
        <label
          htmlFor="input-text"
          className="text-dark dark:text-light block font-medium mb-4"
        >
          Text to Check:
        </label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={handleInputChange}
          className="px-4 py-2 w-full border-light rounded-md shadow-sm focus:border-primary focus:ring-primary h-32 bg-slate-100"
        ></textarea>
      </div>
      <div className="mt-6">
        <label
          htmlFor="output-text"
          className=" text-dark dark:text-light block font-medium mb-4"
        >
          The Result:
        </label>
        <textarea
          id="output-text"
          value={checkedText}
          readOnly
          className="px-4 py-2 w-full border-light rounded-md shadow-sm focus:border-primary focus:ring-primary h-32 bg-slate-100"
        ></textarea>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleTranslate}
          className="bg-primary hover:bg-dark text-light font-bold py-2 px-4 rounded dark:hover:bg-secondary dark:hover:text-dark"
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default GrammarChecker;
