import React, { useState, useEffect } from "react";
import { useGetOnlineTest, useSaveGrade } from "../../hooks/useOnlineTest";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  AcademicCapIcon 
} from "@heroicons/react/24/outline";

const OnlineTest = ({ user, token }) => {
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  const getOnlineTestMutation = useGetOnlineTest();
  const saveGradeMutation = useSaveGrade();

  const levels = [
    { value: "beginner", label: "Beginner", color: "bg-green-500" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-500" },
    { value: "advanced", label: "Advanced", color: "bg-red-500" },
  ];

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
    try {
      const result = await getOnlineTestMutation.mutateAsync(selectedLevel);
      if (result.success && result.data) {
        setQuestions(result.data.questions || []);
        setTestStarted(true);
        setTimeLeft(1800); // Reset timer
      }
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
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

  const handleSubmitTest = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setTestCompleted(true);
    
    try {
      await saveGradeMutation.mutateAsync({
        testLevel: selectedLevel,
        grade: finalScore,
      });
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(1800);
    setScore(0);
    setQuestions([]);
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AcademicCapIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Please Login
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            You need to be logged in to take the online test.
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
              Test Completed!
            </h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-lg text-slate-600 dark:text-gray-400">
                Your score on the {selectedLevel} level test
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
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Level Test
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
            <h2 className="text-xl font-semibold text-dark dark:text-light mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {["A", "B", "C", "D"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionIndex] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 dark:border-slate-600 hover:border-primary/50 text-dark dark:text-light"
                  }`}
                >
                  <span className="font-semibold mr-3">{option}.</span>
                  {currentQuestion[option]}
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
          <AcademicCapIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark dark:text-light mb-4">
            Online English Test
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test your English proficiency with our comprehensive online test. 
            Choose your level and get instant results with detailed feedback.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-dark dark:text-light mb-6">
            Select Your Level
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedLevel === level.value
                    ? "border-primary bg-primary/10"
                    : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                }`}
              >
                <div className={`w-4 h-4 ${level.color} rounded-full mx-auto mb-3`}></div>
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">
                  {level.label}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {level.value === "beginner" && "Basic English skills and vocabulary"}
                  {level.value === "intermediate" && "Moderate English proficiency"}
                  {level.value === "advanced" && "Advanced English mastery"}
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
                Duration: 30 minutes
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-primary" />
                Multiple choice questions
              </li>
              <li className="flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-primary" />
                Instant results and feedback
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartTest}
              disabled={getOnlineTestMutation.isLoading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {getOnlineTestMutation.isLoading ? "Loading Test..." : "Start Test"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineTest;
