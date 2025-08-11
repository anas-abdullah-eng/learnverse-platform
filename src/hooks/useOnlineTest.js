import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getOnlineTest,
  saveGrade,
  getEvaluationTest,
  saveEvaluation,
} from "../api/courseApi";

// Hook for getting online test questions
export const useGetOnlineTest = () => {
  const queryClient = useQueryClient();
  return useMutation(getOnlineTest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("onlineTest");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for saving test grade
export const useSaveGrade = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ testLevel, grade }) => saveGrade(testLevel, grade),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("grades");
        return { success: true, data };
      },
      onError: (error) => {
        return { success: false, error: error.message };
      },
    }
  );
};

// Hook for getting evaluation test
export const useGetEvaluationTest = () => {
  return useQuery("evaluationTest", getEvaluationTest, {
    enabled: false, // Only fetch when explicitly called
    retry: false,
  });
};

// Hook for saving evaluation
export const useSaveEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation(saveEvaluation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("evaluation");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
