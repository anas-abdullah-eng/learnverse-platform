import React, { useState, useEffect } from "react";
import {
  useAddVideoToCourse,
  useUpdateVideoFromCourse,
  useDeleteVideo,
  useGetVideoById,
  useAddVideoView,
} from "../../hooks/useVideo";
import { useCourses } from "../../hooks/useCourses";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  PlayIcon,
  EyeIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const VideoManager = ({ user, token }) => {
  const [videos, setVideos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const { data: courses } = useCourses();
  const addVideoMutation = useAddVideoToCourse();
  const updateVideoMutation = useUpdateVideoFromCourse();
  const deleteVideoMutation = useDeleteVideo();
  const addViewMutation = useAddVideoView();

  // Mock videos for demo
  useEffect(() => {
    if (selectedCourse) {
      setVideos([
        {
          _id: "1",
          title: "Introduction to English Grammar",
          courseId: selectedCourse._id,
          views: 245,
          duration: "15:30",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          title: "Basic Sentence Structure",
          courseId: selectedCourse._id,
          views: 189,
          duration: "12:45",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, [selectedCourse]);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    
    if (!newVideoTitle.trim() || !selectedCourse) return;

    try {
      const result = await addVideoMutation.mutateAsync({
        title: newVideoTitle,
        courseId: selectedCourse._id,
      });
      
      if (result.success) {
        setVideos([...videos, {
          _id: Date.now().toString(),
          title: newVideoTitle,
          courseId: selectedCourse._id,
          views: 0,
          duration: "00:00",
          createdAt: new Date().toISOString(),
        }]);
        setNewVideoTitle("");
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleUpdateVideo = async (videoId) => {
    if (!editTitle.trim()) return;

    try {
      await updateVideoMutation.mutateAsync({
        title: editTitle,
        videoId,
      });
      
      setVideos(videos.map(video => 
        video._id === videoId 
          ? { ...video, title: editTitle }
          : video
      ));
      setEditingVideo(null);
      setEditTitle("");
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await deleteVideoMutation.mutateAsync(videoId);
      setVideos(videos.filter(video => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleAddView = async (videoId) => {
    try {
      await addViewMutation.mutateAsync(videoId);
      setVideos(videos.map(video => 
        video._id === videoId 
          ? { ...video, views: video.views + 1 }
          : video
      ));
    } catch (error) {
      console.error("Error adding view:", error);
    }
  };

  const startEditing = (video) => {
    setEditingVideo(video._id);
    setEditTitle(video.title);
  };

  const cancelEditing = () => {
    setEditingVideo(null);
    setEditTitle("");
  };

  if (!user || user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <VideoCameraIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
            Teacher Access Required
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            Only teachers can manage course videos.
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
            Video Manager
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Manage videos for your courses
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-dark dark:text-light mb-4">
            Select Course
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses?.map((course) => (
              <button
                key={course._id}
                onClick={() => setSelectedCourse(course)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedCourse?._id === course._id
                    ? "border-primary bg-primary/10"
                    : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                }`}
              >
                <h3 className="font-semibold text-dark dark:text-light mb-1">
                  {course.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  Level: {course.level}
                </p>
              </button>
            ))}
          </div>
        </div>

        {selectedCourse && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-dark dark:text-light flex items-center">
                <VideoCameraIcon className="h-6 w-6 mr-2 text-primary" />
                Videos for "{selectedCourse.name}"
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Video
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddVideo} className="mb-8 p-6 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light"
                    placeholder="Enter video title..."
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={addVideoMutation.isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {addVideoMutation.isLoading ? "Adding..." : "Add Video"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewVideoTitle("");
                    }}
                    className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <VideoCameraIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-gray-400">
                    No videos found for this course.
                  </p>
                </div>
              ) : (
                videos.map((video, index) => (
                  <div
                    key={video._id}
                    className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg"
                  >
                    {editingVideo === video._id ? (
                      <div className="mb-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-dark dark:text-light mb-3"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateVideo(video._id)}
                            disabled={updateVideoMutation.isLoading}
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
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">
                              {index + 1}. {video.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1" />
                                {video.views} views
                              </div>
                              <div className="flex items-center">
                                <PlayIcon className="h-4 w-4 mr-1" />
                                {video.duration}
                              </div>
                              <div>
                                Added: {new Date(video.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAddView(video._id)}
                              className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="Simulate view"
                            >
                              <PlayIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => startEditing(video)}
                              className="text-green-500 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                              title="Edit video"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video._id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete video"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-8 text-center">
                          <VideoCameraIcon className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-500 dark:text-gray-400">
                            Video Preview Placeholder
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center">
            <VideoCameraIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">
              Select a Course
            </h3>
            <p className="text-slate-500 dark:text-gray-400">
              Choose a course from above to manage its videos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManager;
