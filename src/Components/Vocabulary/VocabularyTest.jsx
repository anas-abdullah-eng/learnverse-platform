import React, { useState, useEffect } from "react";
import { useGetVocabularyTest } from "../../hooks/useVocabulary";
import {
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const VocabularyTest = ({ user, token }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  const getVocabularyTestMutation = useGetVocabularyTest();

  // Mock categories for demo
  useEffect(() => {
    setCategories([
      { _id: "1", name: "Business English", color: "bg-blue-500" },
      { _id: "2", name: "Travel & Tourism", color: "bg-green-500" },
      { _id: "3", name: "Academic Writing", color: "bg-purple-500" },
      { _id: "4", name: "Daily Conversation", color: "bg-orange-500" },
    ]);
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartTest = async () => {
    if (!selectedCategory) return;
    
    try {
      const result = await getVocabularyTestMutation.mutateAsync(selectedCategory._id);
      if (result.success && result.data) {
        setQuestions(result.data.questions || []);
        setTestStarted(true);
        setTimeLeft(900); // Reset timer
      }
    } catch (error) {
      console.error("Error starting vocabulary test:", error);
      // Mock questions for demo
      setQuestions([
        {
          _id: "1",
          word: "Entrepreneur",
          definition: "A person who starts and runs a business",
          options: [
            "A person who starts and runs a business",
            "A person who works for a company",
            "A person who invests in stocks",
            "A person who teaches business"
          ],
          correctAnswer: 0
        },
        {
          _id: "2",
          word: "Negotiate",
          definition: "To discuss something with someone in order to reach an agreement",
          options: [
            "To refuse an offer",
            "To discuss something with someone in order to reach an agreement",
            "To make a final decision",
            "To cancel a meeting"
          ],
          correctAnswer: 1
        }
      ]);
      setTestStarted(true);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const handleSubmitTest = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setTestCompleted(true);
  };

  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(900);
    setScore(0);
    setQuestions([]);
    setSelectedCategory(null);
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Please Login
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            You need to be logged in to take the vocabulary test.
          </p>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-dark dark:text-light mb-4">
              Vocabulary Test Completed!
            </h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-lg text-slate-600 dark:text-gray-400">
                Your score on {selectedCategory?.name} vocabulary
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <div className="text-2xl font-bold text-dark dark:text-light">
                  {Object.keys(selectedAnswers).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">
                  Questions Answered
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((score / 100) * questions.length)}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">
                  Correct Answers
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {questions.length - Math.round((score / 100) * questions.length)}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">
                  Incorrect Answers
                </div>
              </div>
            </div>
            <button
              onClick={resetTest}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testStarted && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-dark dark:text-light">
                {selectedCategory?.name} Vocabulary Test
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-primary">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-slate-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {currentQuestion.word}
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400">
                Choose the correct definition:
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 dark:border-slate-600 hover:border-primary/50 text-dark dark:text-light"
                  }`}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-dark dark:text-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Previous
              </button>
              
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <BookOpenIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark dark:text-light mb-4">
            Vocabulary Test
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test your vocabulary knowledge in different categories. 
            Choose a category and challenge yourself with our comprehensive vocabulary tests.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-dark dark:text-light mb-6 flex items-center">
            <TagIcon className="h-6 w-6 mr-2 text-primary" />
            Select a Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedCategory?._id === category._id
                    ? "border-primary bg-primary/10"
                    : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                }`}
              >
                <div className={`w-4 h-4 ${category.color} rounded-full mx-auto mb-3`}></div>
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  Test your knowledge of {category.name.toLowerCase()} vocabulary
                </p>
              </button>
            ))}
          </div>

          <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">
              Test Information
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-gray-400">
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-primary" />
                Duration: 15 minutes
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-primary" />
                Multiple choice definitions
              </li>
              <li className="flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-primary" />
                Instant results and feedback
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartTest}
              disabled={!selectedCategory || getVocabularyTestMutation.isLoading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {getVocabularyTestMutation.isLoading ? "Loading Test..." : "Start Vocabulary Test"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyTest;
