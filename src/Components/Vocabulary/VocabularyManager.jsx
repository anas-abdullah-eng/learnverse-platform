import React, { useState, useEffect } from "react";
import {
  useAddCategory,
  useDeleteCategory,
  useAddVocabulary,
  useUpdateVocabulary,
  useRemoveVocabulary,
  useGetVocabulariesByCategory,
} from "../../hooks/useVocabulary";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  BookOpenIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const VocabularyManager = ({ user, token }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newVocabularyText, setNewVocabularyText] = useState("");
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [editText, setEditText] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddVocabulary, setShowAddVocabulary] = useState(false);

  const addCategoryMutation = useAddCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const addVocabularyMutation = useAddVocabulary();
  const updateVocabularyMutation = useUpdateVocabulary();
  const removeVocabularyMutation = useRemoveVocabulary();
  
  const { data: vocabularies, refetch: refetchVocabularies } = useGetVocabulariesByCategory(
    selectedCategory?._id
  );

  // Mock categories for demo - in real app, fetch from API
  useEffect(() => {
    setCategories([
      { _id: "1", name: "Business English" },
      { _id: "2", name: "Travel & Tourism" },
      { _id: "3", name: "Academic Writing" },
      { _id: "4", name: "Daily Conversation" },
    ]);
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      const result = await addCategoryMutation.mutateAsync(newCategoryName);
      if (result.success) {
        setCategories([...categories, result.data]);
        setNewCategoryName("");
        setShowAddCategory(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      if (selectedCategory?._id === categoryId) {
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddVocabulary = async () => {
    if (!newVocabularyText.trim() || !selectedCategory) return;
    
    try {
      const result = await addVocabularyMutation.mutateAsync({
        text: newVocabularyText,
        categoryId: selectedCategory._id,
      });
      if (result.success) {
        setNewVocabularyText("");
        setShowAddVocabulary(false);
        refetchVocabularies();
      }
    } catch (error) {
      console.error("Error adding vocabulary:", error);
    }
  };

  const handleUpdateVocabulary = async (vocabularyId) => {
    if (!editText.trim()) return;
    
    try {
      await updateVocabularyMutation.mutateAsync({
        vocabularyId,
        text: editText,
      });
      setEditingVocabulary(null);
      setEditText("");
      refetchVocabularies();
    } catch (error) {
      console.error("Error updating vocabulary:", error);
    }
  };

  const handleRemoveVocabulary = async (vocabularyId) => {
    if (!window.confirm("Are you sure you want to remove this vocabulary?")) return;
    
    try {
      await removeVocabularyMutation.mutateAsync(vocabularyId);
      refetchVocabularies();
    } catch (error) {
      console.error("Error removing vocabulary:", error);
    }
  };

  const startEditing = (vocabulary) => {
    setEditingVocabulary(vocabulary._id);
    setEditText(vocabulary.text);
  };

  const cancelEditing = () => {
    setEditingVocabulary(null);
    setEditText("");
  };

  if (!user || user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Teacher Access Required
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            Only teachers can manage vocabulary categories and words.
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
            Vocabulary Manager
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Manage vocabulary categories and words for your students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark dark:text-light flex items-center">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  Categories
                </h2>
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              {showAddCategory && (
                <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light mb-3"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddCategory}
                      disabled={addCategoryMutation.isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddCategory(false);
                        setNewCategoryName("");
                      }}
                      className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCategory?._id === category._id
                        ? "border-primary bg-primary/10"
                        : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-dark dark:text-light font-medium">
                        {category.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category._id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vocabulary Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              {selectedCategory ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-dark dark:text-light flex items-center">
                      <BookOpenIcon className="h-5 w-5 mr-2 text-primary" />
                      {selectedCategory.name} Vocabulary
                    </h2>
                    <button
                      onClick={() => setShowAddVocabulary(true)}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Word
                    </button>
                  </div>

                  {showAddVocabulary && (
                    <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <textarea
                        value={newVocabularyText}
                        onChange={(e) => setNewVocabularyText(e.target.value)}
                        placeholder="Enter vocabulary word or phrase with definition..."
                        rows={3}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light mb-3 resize-none"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleAddVocabulary}
                          disabled={addVocabularyMutation.isLoading}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Add Vocabulary
                        </button>
                        <button
                          onClick={() => {
                            setShowAddVocabulary(false);
                            setNewVocabularyText("");
                          }}
                          className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {vocabularies?.map((vocabulary) => (
                      <div
                        key={vocabulary._id}
                        className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        {editingVocabulary === vocabulary._id ? (
                          <div>
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              rows={3}
                              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light mb-3 resize-none"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateVocabulary(vocabulary._id)}
                                disabled={updateVocabularyMutation.isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <p className="text-dark dark:text-light flex-1 mr-4">
                              {vocabulary.text}
                            </p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditing(vocabulary)}
                                className="text-blue-500 hover:text-blue-700 p-1"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveVocabulary(vocabulary._id)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {vocabularies?.length === 0 && (
                      <div className="text-center py-12">
                        <BookOpenIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-gray-400">
                          No vocabulary words in this category yet.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <TagIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-gray-400">
                    Select a category to manage vocabulary words.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyManager;
