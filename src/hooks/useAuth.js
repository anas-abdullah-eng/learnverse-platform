import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import {
  updateUserProfile,
  requestPromotionToProfessor,
  addCourse,
  deleteCourse,
  subscribeCourse,
  unsubscribe,
  acceptProm,
  addVideo,
} from "../api/courseApi";

// const login = async ({ email, password }) => {
//   const response = await axios.post(
//     "https://learnverse.onrender.com/auth/login",
//     { email, password }
//   );
//   return response.data;
// };

// const signup = async ({ email, password, name }) => {
//   const response = await axios.post(
//     "https://learnverse.onrender.com/auth/signup",
//     { email, password, name }
//   );
//   return response.data;
// };

// export const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation(login, {
//     onSuccess: (data) => {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       queryClient.invalidateQueries("userProfile");
//     },
//   });
// };

// export const useSignUp = () => {
//   const queryClient = useQueryClient();
//   return useMutation(signup, {
//     onSuccess: (data) => {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       queryClient.invalidateQueries("userProfile");
//     },
//   });
// };

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserProfile, {
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      queryClient.invalidateQueries("userProfile");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
export const useAddVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(addVideo, {
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      queryClient.invalidateQueries("userProfile");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation(addCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("addCourse");
      return { success: true };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
export const useSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation(subscribeCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("subscribeCourse");
      return { success: true };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
// export const useFindSubscription = () => {
//   const queryClient = useQueryClient();
//   return useMutation(findSubscription, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("findSubscription");
//       return { success: true };
//     },
//     onError: (error) => {
//       return { success: false, error: error.message };
//     },
//   });
// };
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("deleteCourse");
      return { success: true };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

export const useAcceptPro = () => {
  const queryClient = useQueryClient();
  return useMutation(acceptProm, {
    onSuccess: () => {
      queryClient.invalidateQueries("acceptPro");
      return { success: true };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
export const useUnsubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation(unsubscribe, {
    onSuccess: () => {
      queryClient.invalidateQueries("unsubscribe");
      return { success: true };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};

export const useRequestPromotionToProfessor = () => {
  const queryClient = useQueryClient();
  return useMutation(requestPromotionToProfessor, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("promotionRequest");
      return { success: true, data };
    },
    onError: (error) => {
      return { success: false, error: error.message };
    },
  });
};
