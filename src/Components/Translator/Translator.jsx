import React, { useState } from "react";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ar");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      const response = await fetch(
        "https://learnverse.onrender.com/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
            language: targetLanguage,
          }),
        }
      );

      const data = await response.json();
      setTranslatedText(data.data);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleSourceLanguageChange = (e) => {
    setSourceLanguage(e.target.value);
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="bg-sky-100 dark:bg-slate-900 backdrop:blur-lg shadow-xl rounded-lg p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-6 mb-16">
        <div className="col-span-1 text-center">
          <label
            htmlFor="source-language"
            className="text-dark dark:text-light font-medium mr-4"
          >
            From:
          </label>
          <select
            id="source-language"
            value={sourceLanguage}
            onChange={handleSourceLanguageChange}
            className="px-3 py-1 w-1/2 border-light rounded-md shadow-sm focus:border-primary focus:ring-primary bg-slate-100"
          >
            <option value="ar">Arabic</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese (Traditional)</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
        </div>
        <div className="col-span-1 text-center">
          <label
            htmlFor="target-language"
            className="text-dark dark:text-light font-medium mr-4"
          >
            To:
          </label>
          <select
            id="target-language"
            value={targetLanguage}
            onChange={handleTargetLanguageChange}
            className="px-3 py-1 w-1/2 border-light rounded-md shadow-sm focus:border-primary focus:ring-primary bg-slate-100"
          >
            <option value="ar">Arabic</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese (Traditional)</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="input-text"
          className="text-dark dark:text-light block font-medium mb-4"
        >
          Text to Translate:
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
          Translated Text:
        </label>
        <textarea
          id="output-text"
          value={translatedText}
          readOnly
          className="px-4 py-2 w-full border-light rounded-md shadow-sm focus:border-primary focus:ring-primary h-32 bg-slate-100"
        ></textarea>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleTranslate}
          className="bg-primary hover:bg-dark text-light font-bold py-2 px-4 rounded dark:hover:bg-secondary dark:hover:text-dark"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default Translator;
