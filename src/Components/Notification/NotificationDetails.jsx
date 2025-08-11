import React from "react";
import { useParams } from "react-router-dom";
import { useAcceptPro } from "../../hooks/useAuth";
import { usePromotionRequest } from "../../hooks/useCourses";
const NotificationDetails = ({ user }) => {
  const { id } = useParams();
  const { mutate: accept } = useAcceptPro();

  const { data: promotions, isLoading: Loading } = usePromotionRequest();
  const request = promotions?.promotions.find((r) => r._id === id);
  if (Loading)
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center px-56 py-16 bg-light dark:bg-slate-800"
      >
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-slate-600">
          <svg
            className="w-10 h-10 text-gray-500 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-600 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-600 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-600 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-600 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-600 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  const handleAccept = (e) => {
    e.preventDefault();
    accept({ orderId: request._id, status: "accepted" });
  };
  const handlereject = (e) => {
    e.preventDefault();
    accept({ orderId: request._id, status: "rejected" });
  };
  return (
    <div className="w-full p-12 dark:bg-slate-800 bg-light flex justify-center">
      <div className="w-3/4 p-12 bg-light flex dark:bg-slate-800">
        <img
          src={request.userId.photo}
          className="focus:outline-none w-full h-56 object-cover border rounded-full border-gray-200"
        />
        <div className="pl-10">
          <p
            tabIndex="0"
            className="text-slate-800 dark:text-light focus:outline-none text-lg leading-10"
          >
            <span className="text-primary mr-2">
              {request.userId.firstName + " " + request.userId.lastName}
            </span>
            is asking for teacher promotion
          </p>
          <p
            tabIndex="0"
            className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
          >
            {request.createdAt}
          </p>
          <img src={request.image} className="my-10" />
          {request.status === "null" ? (
            <div>
              <button
                onClick={handleAccept}
                className="bg-primary border-2 border-primary text-light mr-4 px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={handlereject}
                className="rounded outline border-primary dark:text-light text-dark px-3  py-2"
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="italic text-slate-500">
              This request is {request.status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NotificationDetails;
