import React, { useState, useEffect } from "react";
import { useAddLove, useDeleteLove, useFindLoveForVideo } from "../../hooks/useLove";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const LoveButton = ({ videoId, user, token, onLoveChange }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [loveId, setLoveId] = useState(null);
  const [loveCount, setLoveCount] = useState(0);

  const addLoveMutation = useAddLove();
  const deleteLoveMutation = useDeleteLove();
  const findLoveMutation = useFindLoveForVideo();

  useEffect(() => {
    if (user && token && videoId) {
      checkLoveStatus();
    }
  }, [videoId, user, token]);

  const checkLoveStatus = async () => {
    try {
      const result = await findLoveMutation.mutateAsync(videoId);
      if (result.success && result.data) {
        setIsLoved(true);
        setLoveId(result.data._id);
      } else {
        setIsLoved(false);
        setLoveId(null);
      }
    } catch (error) {
      console.error("Error checking love status:", error);
      setIsLoved(false);
      setLoveId(null);
    }
  };

  const handleLoveToggle = async () => {
    if (!user || !token) {
      alert("Please login to like videos");
      return;
    }

    try {
      if (isLoved && loveId) {
        // Remove love
        await deleteLoveMutation.mutateAsync(loveId);
        setIsLoved(false);
        setLoveId(null);
        setLoveCount(prev => Math.max(0, prev - 1));
        onLoveChange?.(false);
      } else {
        // Add love
        const result = await addLoveMutation.mutateAsync(videoId);
        if (result.success && result.data) {
          setIsLoved(true);
          setLoveId(result.data._id);
          setLoveCount(prev => prev + 1);
          onLoveChange?.(true);
        }
      }
    } catch (error) {
      console.error("Error toggling love:", error);
    }
  };

  return (
    <button
      onClick={handleLoveToggle}
      disabled={addLoveMutation.isLoading || deleteLoveMutation.isLoading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isLoved
          ? "bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-600"
      } disabled:opacity-50`}
    >
      {isLoved ? (
        <HeartSolidIcon className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">
        {isLoved ? "Loved" : "Love"}
      </span>
      {loveCount > 0 && (
        <span className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded-full">
          {loveCount}
        </span>
      )}
    </button>
  );
};

export default LoveButton;
