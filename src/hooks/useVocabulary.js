import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getVocabulariesByCategory,
  getVocabularyTest,
  addCategory,
  deleteCategory,
  addVocabulary,
  updateVocabulary,
  removeVocabulary,
} from "../api/courseApi";

// Hook for getting vocabularies by category
export const useGetVocabulariesByCategory = (categoryId) => {
  return useQuery(
    ["vocabularies", categoryId],
    () => getVocabulariesByCategory(categoryId),
    {
      enabled: !!categoryId,
      retry: false,
    }
  );
};

// Hook for getting vocabulary test
export const useGetVocabularyTest = () => {
  const queryClient = useQueryClient();
  return useMutation(getVocabularyTest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("vocabularyTest");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for adding category
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(addCategory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("categories");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for deleting category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("categories");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

// Hook for adding vocabulary
export const useAddVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ text, categoryId }) => addVocabulary(text, categoryId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("vocabularies");
        return { success: true, data };
      },
      onError: (error) => {
        return { success: false, error: error.message };
      },
    }
  );
};

// Hook for updating vocabulary
export const useUpdateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ vocabularyId, text }) => updateVocabulary(vocabularyId, text),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("vocabularies");
        return { success: true, data };
      },
      onError: (error) => {
        return { success: false, error: error.message };
      },
    }
  );
};

// Hook for removing vocabulary
export const useRemoveVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation(removeVocabulary, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("vocabularies");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
