import React from "react";
import { useGetAllLoves, useDeleteLove } from "../../hooks/useLove";
import { useGetVideoById } from "../../hooks/useVideo";
import { HeartIcon, TrashIcon, PlayIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const LovesList = ({ user, token }) => {
  const { data: loves, isLoading, refetch } = useGetAllLoves();
  const deleteLoveMutation = useDeleteLove();

  const handleRemoveLove = async (loveId) => {
    if (!window.confirm("Are you sure you want to remove this from your loved videos?")) return;

    try {
      await deleteLoveMutation.mutateAsync(loveId);
      refetch();
    } catch (error) {
      console.error("Error removing love:", error);
    }
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <HeartSolidIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Please Login
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            You need to be logged in to view your loved videos.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-gray-400">Loading your loved videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark dark:text-light mb-2 flex items-center">
            <HeartSolidIcon className="h-8 w-8 text-red-500 mr-3" />
            Loved Videos
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Your collection of favorite videos
          </p>
        </div>

        {loves?.data?.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center">
            <HeartIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
              No Loved Videos Yet
            </h3>
            <p className="text-slate-500 dark:text-gray-400">
              Start exploring videos and click the heart icon to add them to your favorites.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {loves?.data?.map((love) => (
              <LoveVideoCard
                key={love._id}
                love={love}
                onRemove={() => handleRemoveLove(love._id)}
                isRemoving={deleteLoveMutation.isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoveVideoCard = ({ love, onRemove, isRemoving }) => {
  // Mock video data - in real app, you'd fetch this using the video ID
  const mockVideo = {
    _id: love.videoId,
    title: "Sample Video Title",
    description: "This is a sample video description that would normally come from the video data.",
    thumbnail: "/api/placeholder/300/200",
    duration: "15:30",
    views: 1250,
    course: {
      name: "English Grammar Basics",
      level: "Beginner"
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Video Thumbnail */}
        <div className="md:w-1/3">
          <div className="relative bg-slate-200 dark:bg-slate-700 h-48 md:h-full flex items-center justify-center">
            <PlayIcon className="h-12 w-12 text-slate-400" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {mockVideo.duration}
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
                {mockVideo.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 mb-3 line-clamp-2">
                {mockVideo.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-gray-400">
                <span>{mockVideo.views} views</span>
                <span>•</span>
                <span>{mockVideo.course.name}</span>
                <span>•</span>
                <span className="capitalize">{mockVideo.course.level}</span>
              </div>
            </div>
            
            <button
              onClick={onRemove}
              disabled={isRemoving}
              className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
              title="Remove from loved videos"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-red-500">
              <HeartSolidIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Loved</span>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-gray-400">
              Added: {new Date(love.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LovesList;
