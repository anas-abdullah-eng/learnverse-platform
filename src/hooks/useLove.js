import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addLove,
  getAllLoves,
  deleteLove,
  findLoveForVideo,
} from "../api/courseApi";

// Hook for adding love to video
export const useAddLove = () => {
  const queryClient = useQueryClient();
  return useMutation(addLove, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("loves");
      queryClient.invalidateQueries("videos");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for getting all loves
export const useGetAllLoves = () => {
  return useQuery("loves", getAllLoves, {
    retry: false,
  });
};

// Hook for deleting love
export const useDeleteLove = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLove, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("loves");
      queryClient.invalidateQueries("videos");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for finding love for specific video
export const useFindLoveForVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(findLoveForVideo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("loves");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
