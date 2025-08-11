import { useMutation, useQueryClient } from "react-query";
import {
  addQuestionToBank,
  removeQuestionFromBank,
} from "../api/courseApi";

// Hook for adding question to bank
export const useAddQuestionToBank = () => {
  const queryClient = useQueryClient();
  return useMutation(addQuestionToBank, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("questionBank");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for removing question from bank
export const useRemoveQuestionFromBank = () => {
  const queryClient = useQueryClient();
  return useMutation(removeQuestionFromBank, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("questionBank");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
