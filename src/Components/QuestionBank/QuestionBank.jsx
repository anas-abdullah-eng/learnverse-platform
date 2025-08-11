import React, { useState, useEffect } from "react";
import { useAddQuestionToBank, useRemoveQuestionFromBank } from "../../hooks/useTeacher";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const QuestionBank = ({ user, token }) => {
  const [questions, setQuestions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [formData, setFormData] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
    answer: "A",
  });

  const addQuestionMutation = useAddQuestionToBank();
  const removeQuestionMutation = useRemoveQuestionFromBank();

  const levels = [
    { value: "beginner", label: "Beginner", color: "bg-green-500" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-500" },
    { value: "advanced", label: "Advanced", color: "bg-red-500" },
  ];

  // Mock questions for demo
  useEffect(() => {
    setQuestions([
      {
        _id: "1",
        level: "beginner",
        question: "What is the past tense of 'go'?",
        A: "went",
        B: "goed",
        C: "gone",
        D: "going",
        answer: "A",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        level: "intermediate",
        question: "Which sentence is grammatically correct?",
        A: "I have been working here since 5 years.",
        B: "I have been working here for 5 years.",
        C: "I am working here since 5 years.",
        D: "I work here since 5 years.",
        answer: "B",
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.A.trim() || !formData.B.trim() || 
        !formData.C.trim() || !formData.D.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const questionData = {
        level: selectedLevel,
        ...formData,
      };
      
      const result = await addQuestionMutation.mutateAsync(questionData);
      if (result.success) {
        setQuestions([...questions, { ...questionData, _id: Date.now().toString(), createdAt: new Date().toISOString() }]);
        setFormData({
          question: "",
          A: "",
          B: "",
          C: "",
          D: "",
          answer: "A",
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleRemoveQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to remove this question?")) return;
    
    try {
      await removeQuestionMutation.mutateAsync(questionId);
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (error) {
      console.error("Error removing question:", error);
    }
  };

  const filteredQuestions = questions.filter(q => q.level === selectedLevel);

  if (!user || user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AcademicCapIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Teacher Access Required
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            Only teachers can manage the question bank.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark dark:text-light mb-2">
            Question Bank Manager
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Create and manage questions for online tests
          </p>
        </div>

        {/* Level Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-dark dark:text-light mb-4">
            Select Level
          </h2>
          <div className="flex space-x-4">
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedLevel === level.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-slate-200 dark:border-slate-600 hover:border-primary/50 text-dark dark:text-light"
                }`}
              >
                <div className={`w-3 h-3 ${level.color} rounded-full inline-block mr-2`}></div>
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Question Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-dark dark:text-light flex items-center">
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2 text-primary" />
              {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Questions
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Question
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddQuestion} className="mb-8 p-6 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                  Question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light resize-none"
                  placeholder="Enter your question here..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Option A
                  </label>
                  <input
                    type="text"
                    name="A"
                    value={formData.A}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                    placeholder="Option A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Option B
                  </label>
                  <input
                    type="text"
                    name="B"
                    value={formData.B}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                    placeholder="Option B"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Option C
                  </label>
                  <input
                    type="text"
                    name="C"
                    value={formData.C}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                    placeholder="Option C"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Option D
                  </label>
                  <input
                    type="text"
                    name="D"
                    value={formData.D}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                    placeholder="Option D"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                  Correct Answer
                </label>
                <select
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={addQuestionMutation.isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {addQuestionMutation.isLoading ? "Adding..." : "Add Question"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({
                      question: "",
                      A: "",
                      B: "",
                      C: "",
                      D: "",
                      answer: "A",
                    });
                  }}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <QuestionMarkCircleIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-gray-400">
                  No questions found for {selectedLevel} level.
                </p>
              </div>
            ) : (
              filteredQuestions.map((question, index) => (
                <div
                  key={question._id}
                  className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-light">
                      Question {index + 1}
                    </h3>
                    <button
                      onClick={() => handleRemoveQuestion(question._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-dark dark:text-light mb-4 font-medium">
                    {question.question}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {["A", "B", "C", "D"].map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-lg border ${
                          question.answer === option
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        <span className="font-semibold mr-2">{option}.</span>
                        <span className="text-dark dark:text-light">
                          {question[option]}
                        </span>
                        {question.answer === option && (
                          <span className="ml-2 text-green-600 font-semibold">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-slate-500 dark:text-gray-400">
                    Added: {new Date(question.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
