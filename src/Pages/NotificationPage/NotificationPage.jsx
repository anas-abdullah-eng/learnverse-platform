import React from "react";
import Notification from "../../Components/Notification/Notification";
import { usePromotionRequest } from "../../hooks/useCourses";

const NotificationPage = () => {
  const { data: promotions, isLoading: Loading } = usePromotionRequest();
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
  promotions.promotions.sort(function (a, b) {
    return a.createdAt.localeCompare(b.createdAt);
  });
  console.log(promotions);
  return (
    <section className="flex items-center bg-light dark:bg-slate-800 justify-center">
      <div className="w-full" id="notification">
        <div className=" w-full bg-light dark:bg-slate-800 p-8">
          <p
            tabIndex="0"
            className="focus:outline-none text-2xl font-semibold leading-6 text-slate-800 dark:text-light"
          >
            Notifications
          </p>
          <h2
            tabIndex="0"
            className="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-500"
          >
            Promotion Request
          </h2>
          {promotions.promotions.map((request) => (
            <Notification key={request.id} request={request} />
          ))}

          <div className="flex items-center justiyf-between">
            <hr className="w-full" />
            <p
              tabIndex="0"
              className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
            >
              Thats it for now :)
            </p>
            <hr className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotificationPage;
