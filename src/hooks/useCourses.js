import { useQuery } from "react-query";
import {
  fetchAllUsers,
  fetchCourses,
  findSubscription,
  getPromotionRequest,
  getSubscribesBag,
} from "../api/courseApi";

export const useCourses = () => {
  return useQuery("courses", fetchCourses);
};
export const useUsers = () => {
  return useQuery("users", fetchAllUsers);
};
export const useSubscribesBag = () => {
  return useQuery("subscribesBag", getSubscribesBag);
};
export const usePromotionRequest = () => {
  return useQuery("promotionRequests", getPromotionRequest);
};
export const useFindSubscribe = (courseId) => {
  return useQuery(
    ["findSubscription", courseId],
    () => findSubscription(courseId),
    {
      enabled: !!courseId,
    }
  );
};
