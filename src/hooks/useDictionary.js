import { useMutation, useQueryClient } from "react-query";
import { lookupWord } from "../api/courseApi";

// Hook for looking up words in dictionary
export const useLookupWord = () => {
  const queryClient = useQueryClient();
  return useMutation(lookupWord, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("dictionary");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
