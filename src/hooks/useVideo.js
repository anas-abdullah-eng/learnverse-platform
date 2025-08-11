import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addVideoToCourse,
  updateVideoFromCourse,
  deleteVideo,
  getVideoById,
  addVideoView,
} from "../api/courseApi";

// Hook for adding video to course
export const useAddVideoToCourse = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ title, courseId }) => addVideoToCourse(title, courseId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("videos");
        queryClient.invalidateQueries("courses");
        return { success: true, data };
      },
      onError: (error) => {
        return { success: false, error: error.message };
      },
    }
  );
};

// Hook for updating video from course
export const useUpdateVideoFromCourse = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ title, videoId }) => updateVideoFromCourse(title, videoId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("videos");
        queryClient.invalidateQueries(["video", data.videoId]);
        return { success: true, data };
      },
      onError: (error) => {
        return { success: false, error: error.message };
      },
    }
  );
};

// Hook for deleting video
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVideo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("videos");
      queryClient.invalidateQueries("courses");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for getting video by ID
export const useGetVideoById = (videoId) => {
  return useQuery(
    ["video", videoId],
    () => getVideoById(videoId),
    {
      enabled: !!videoId,
      retry: false,
    }
  );
};

// Hook for adding video view
export const useAddVideoView = () => {
  const queryClient = useQueryClient();
  return useMutation(addVideoView, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("videos");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
