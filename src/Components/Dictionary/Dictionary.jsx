import React, { useState } from "react";
import { useLookupWord } from "../../hooks/useDictionary";
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Dictionary = ({ user, token }) => {
  const [searchWord, setSearchWord] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  const lookupWordMutation = useLookupWord();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchWord.trim()) return;

    try {
      const result = await lookupWordMutation.mutateAsync(searchWord.trim());
      
      if (result.success && result.data) {
        setCurrentResult(result.data);
        setSearchHistory(prev => {
          const newHistory = [searchWord.trim(), ...prev.filter(word => word !== searchWord.trim())];
          return newHistory.slice(0, 10); // Keep only last 10 searches
        });
      }
    } catch (error) {
      console.error("Error looking up word:", error);
      // Mock result for demo
      const mockResult = {
        word: searchWord.trim(),
        phonetic: "/ˈwɜːrd/",
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [
              {
                definition: "A single distinct meaningful element of speech or writing, used with others to form sentences.",
                example: "I don't understand the meaning of this word.",
                synonyms: ["term", "expression", "vocable"]
              }
            ]
          },
          {
            partOfSpeech: "verb",
            definitions: [
              {
                definition: "Express (something spoken or written) in particular words.",
                example: "He words his request very carefully.",
                synonyms: ["phrase", "express", "articulate"]
              }
            ]
          }
        ]
      };
      setCurrentResult(mockResult);
      setSearchHistory(prev => {
        const newHistory = [searchWord.trim(), ...prev.filter(word => word !== searchWord.trim())];
        return newHistory.slice(0, 10);
      });
    }
    
    setSearchWord("");
  };

  const handleHistoryClick = (word) => {
    setSearchWord(word);
  };

  const playPronunciation = () => {
    // In a real app, this would play audio pronunciation
    if ('speechSynthesis' in window && currentResult) {
      const utterance = new SpeechSynthesisUtterance(currentResult.word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <BookOpenIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark dark:text-light mb-4">
            English Dictionary
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Look up definitions, pronunciations, and examples for any English word.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Enter a word to look up..."
                className="w-full p-4 pr-12 text-lg border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-dark dark:text-light focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                disabled={lookupWordMutation.isLoading || !searchWord.trim()}
                className="absolute right-2 top-2 p-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </form>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-gray-400 mb-3 flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(word)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-dark dark:text-light rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {lookupWordMutation.isLoading && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-gray-400">Looking up word...</p>
          </div>
        )}

        {/* Search Results */}
        {currentResult && !lookupWordMutation.isLoading && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-dark dark:text-light">
                  {currentResult.word}
                </h2>
                {currentResult.phonetic && (
                  <button
                    onClick={playPronunciation}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                  >
                    <SpeakerWaveIcon className="h-5 w-5" />
                    <span className="font-mono">{currentResult.phonetic}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Meanings */}
            <div className="space-y-8">
              {currentResult.meanings?.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-primary mb-4 capitalize">
                    {meaning.partOfSpeech}
                  </h3>
                  
                  <div className="space-y-4">
                    {meaning.definitions?.map((definition, defIndex) => (
                      <div key={defIndex} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                        <p className="text-dark dark:text-light mb-3 font-medium">
                          {defIndex + 1}. {definition.definition}
                        </p>
                        
                        {definition.example && (
                          <div className="mb-3">
                            <p className="text-sm font-semibold text-slate-600 dark:text-gray-400 mb-1">
                              Example:
                            </p>
                            <p className="text-slate-700 dark:text-gray-300 italic">
                              "{definition.example}"
                            </p>
                          </div>
                        )}
                        
                        {definition.synonyms && definition.synonyms.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-slate-600 dark:text-gray-400 mb-1">
                              Synonyms:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {definition.synonyms.map((synonym, synIndex) => (
                                <span
                                  key={synIndex}
                                  className="px-2 py-1 bg-secondary/20 text-primary rounded text-sm"
                                >
                                  {synonym}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!currentResult && !lookupWordMutation.isLoading && searchHistory.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center">
            <BookOpenIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
              Start Your Search
            </h3>
            <p className="text-slate-500 dark:text-gray-400">
              Enter a word in the search box above to get its definition, pronunciation, and examples.
            </p>
          </div>
        )}

        {/* Error State */}
        {lookupWordMutation.isError && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-red-500 mb-4">
              <BookOpenIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
              Word Not Found
            </h3>
            <p className="text-slate-500 dark:text-gray-400">
              Sorry, we couldn't find the definition for that word. Please check the spelling and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
