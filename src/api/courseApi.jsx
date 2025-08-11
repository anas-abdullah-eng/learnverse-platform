// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://learnverse.onrender.com",
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchCourses = async () => {
  const response = await apiClient.get("/course/");
  return response.data.data;
};

export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/all");
    return response.data.data;
  } catch (error) {
    return [];
  }
};
// export const fetchMyUser = async () => {
//   try {
//     const response = await apiClient.get("/user");
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching you:", error);
//     return [];
//   }
// };
export const deleteCourse = async (id) => {
  const response = await apiClient.delete(`/course/delete-course/${id}`);
  return response.data;
};

export const unsubscribe = async (id) => {
  const response = await apiClient.delete(`/subscribe/delete-subscribe/${id}`);
  return response.data;
};
export const findSubscription = async (courseId) => {
  const response = await apiClient.post(
    "/subscribe/find-subscribe-for-this-course",
    { courseId }
  );
  return response.data;
};
export const acceptProm = async (par) => {
  const response = await apiClient.post(
    "/admin/answer-for-teacher-promotion",
    par
  );
  return response.data;
};
export const getSubscribesBag = async () => {
  const response = await apiClient.get("/subscribe/get-all-subscribes");
  return response.data;
};
export const getPromotionRequest = async () => {
  const response = await apiClient.get("/admin/all-promotions");
  return response.data;
};

export const updateUserProfile = async (profile) => {
  const response = await apiClient.patch("/user/update-user", profile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const addCourse = async (course) => {
  const response = await apiClient.post("/course/add-course", course, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
export const addVideo = async (video) => {
  const response = await apiClient.post("/video/add-to-course", video, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const subscribeCourse = async (courseId) => {
  const response = await apiClient.post("/subscribe/add-subscribe", {
    courseId,
  });

  return response.data.data;
};

export const requestPromotionToProfessor = async (photo) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await apiClient.post("/user/promotion-to-professor");

  return response.data;
};

// ============ ONLINE TEST SYSTEM ============
export const getOnlineTest = async (level) => {
  const response = await apiClient.post("/user/online-test", { level });
  return response.data;
};

export const saveGrade = async (testLevel, grade) => {
  const response = await apiClient.post("/user/save-grade", { testLevel, grade });
  return response.data;
};

export const getEvaluationTest = async () => {
  const response = await apiClient.get("/user/evaluation-test");
  return response.data;
};

export const saveEvaluation = async (level) => {
  const response = await apiClient.post("/user/save-evaluation", { level });
  return response.data;
};

// ============ VOCABULARY SYSTEM ============
export const getVocabulariesByCategory = async (id) => {
  const response = await apiClient.get(`/user/vocabularies/${id}`);
  return response.data;
};

export const getVocabularyTest = async (categoryId) => {
  const response = await apiClient.post("/user/test-vocabulary", { categoryId });
  return response.data;
};

// ============ TEACHER QUESTION BANK ============
export const addQuestionToBank = async (questionData) => {
  const response = await apiClient.post("/teacher/add-question-to-the-bank", questionData);
  return response.data;
};

export const removeQuestionFromBank = async (id) => {
  const response = await apiClient.delete(`/teacher/remove-question-from-the-bank/${id}`);
  return response.data;
};

// ============ CATEGORY MANAGEMENT ============
export const addCategory = async (name) => {
  const response = await apiClient.post("/teacher/add-category", { name });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete(`/teacher/delete-category/${id}`);
  return response.data;
};

// ============ VOCABULARY MANAGEMENT ============
export const addVocabulary = async (text, categoryId) => {
  const response = await apiClient.post("/teacher/add-vocabulary", { text, categoryId });
  return response.data;
};

export const updateVocabulary = async (vocabularyId, text) => {
  const response = await apiClient.patch("/teacher/update-vocabulary", { vocabularyId, text });
  return response.data;
};

export const removeVocabulary = async (id) => {
  const response = await apiClient.delete(`/teacher/remove-vocabulary/${id}`);
  return response.data;
};

// ============ VIDEO MANAGEMENT ============
export const addVideoToCourse = async (title, courseId) => {
  const response = await apiClient.post("/video/add-to-course", { title, courseId });
  return response.data;
};

export const updateVideoFromCourse = async (title, videoId) => {
  const response = await apiClient.patch("/video/update-from-course", { title, videoId });
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await apiClient.delete(`/video/delete-video/${id}`);
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await apiClient.get(`/video/${id}`);
  return response.data;
};

export const addVideoView = async (videoId) => {
  const response = await apiClient.post("/video/add-view", { videoId });
  return response.data;
};

// ============ DICTIONARY SYSTEM ============
export const lookupWord = async (word) => {
  const response = await apiClient.post("/dictionary/", { word });
  return response.data;
};

// ============ LOVE/LIKE SYSTEM ============
export const addLove = async (videoId) => {
  const response = await apiClient.post("/love/add-love", { videoId });
  return response.data;
};

export const getAllLoves = async () => {
  const response = await apiClient.get("/love/get-all-loves");
  return response.data;
};

export const deleteLove = async (id) => {
  const response = await apiClient.delete(`/love/delete-love/${id}`);
  return response.data;
};

export const findLoveForVideo = async (videoId) => {
  const response = await apiClient.post("/love/find-love-for-this-video", { videoId });
  return response.data;
};
