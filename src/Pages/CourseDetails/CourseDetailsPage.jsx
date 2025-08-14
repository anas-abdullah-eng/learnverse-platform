import {
  ArrowUpTrayIcon,
  NoSymbolIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddVideo,
  useDeleteCourse,
  useSubscribe,
  useUnsubscribe,
} from "../../hooks/useAuth";
import { useCourses, useFindSubscribe } from "../../hooks/useCourses";

export default function CourseDetailsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const course = courses?.find((c) => c._id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
  });
  const [subscribed, setSubscribed] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubscribe, setIsOpenSubscribe] = useState(false);
  const { data: findSubscribe, isSuccess } = useFindSubscribe(course?._id);
  useEffect(() => {
    if (isSuccess && findSubscribe) {
      setSubscribed(findSubscribe.success);
    }
  }, [isSuccess, findSubscribe]);

  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: unsubscribe } = useUnsubscribe();
  const { mutate: subscribeCourse } = useSubscribe();
  const { mutate: addVideo } = useAddVideo();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubscriptionModal = () => {
    setIsOpenSubscribe(!isOpenSubscribe);
  };
  const toggleVideoModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteCourse(id);
    navigate(-1);
  };
  const handelUnsubscribe = (e) => {
    e.preventDefault();
    unsubscribe(id);
    toggleSubscriptionModal();
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    subscribeCourse(course._id);
  };
  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      title: e.target.value,
      courseId: course._id,
    });
  };
  const handleCoverUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    setFormData({
      ...formData,

      video: file,
    });
  };
  if (coursesLoading)
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

  if (!course) {
    return (
      <div className="bg-light dark:bg-slate-800 text-slate-800 dark:text-light text-3xl text-center pt-16">
        Course not found
        <NoSymbolIcon className="ms-4 w-10 h-10 inline" />
      </div>
    );
  }
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    addVideo(formData, {
      onSuccess: () => {
        setMessage({ type: "success", text: "Course added successfully!" });
      },
      onError: (error) => {
        setMessage({
          type: "error",
          text: `Error adding the course: ${error.message}`,
        });
      },
    });
    toggleModal();
  };
  return (
    <div className="bg-light dark:bg-slate-800 grid p-6 grid-cols-2">
      <div className="col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
        <img
          alt={course.name}
          src={course.photo}
          className="h-full w-full object-cover object-center rounded"
        />
      </div>

      <div className="col-span-1 px-10 flex flex-col justify-between">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-light sm:text-3xl">
            {course.name}
          </h1>

          <div className="lg:pb-16 lg:pt-10 py-10">
            <div className="space-y-6">
              <p className="text-base text-slate-900 dark:text-slate-200">
                {course.description}
              </p>
            </div>
          </div>

          <p className="inline text-base text-slate-300">
            Level: {course.level}
          </p>
        </div>

        {course.teacherId._id === user._id ? (
          <div className="lg:col-span-2">
            <button
              onClick={toggleModal}
              className="px-6 py-3 bg-red-500 border-4 border-red-700 rounded text-light hover:bg-red-700 hover:border-red-500"
            >
              Delete
            </button>
          </div>
        ) : subscribed ? (
          <div className="lg:col-span-2">
            <p className="italic text-slate-500 inline mr-4">
              Your are already Subscribed
            </p>
            <button
              onClick={toggleSubscriptionModal}
              className="px-4 py-3 border-4 border-primary rounded text-light hover:bg-secondary hover:border-secondary "
            >
              UnSubscribe
            </button>
          </div>
        ) : (
          <div className="lg:col-span-2">
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-primary border-4 border-primary rounded text-light hover:bg-secondary hover:border-secondary "
            >
              Subscribe
              <hr className="w-48 h-1 mx-auto my-5 bg-slate-800 border-0 rounded md:mt-24 md:mb-32 dark:bg-light" />
            </button>
          </div>
        )}
      </div>
      {user && user.userType === "teacher" && (
        <section id="yourCourses">
          <button
            onClick={toggleVideoModal}
            className="cursor-cell w-full h-full hover:bg-slate-600 bg-slate-400 rounded text-slate-800 hover:text-slate-300 flex items-center justify-center"
          >
            <PlusIcon className="w-11 h-11" /> Add a Video
          </button>
        </section>
      )}

      {isOpen && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-80"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-light rounded-lg shadow dark:bg-slate-800 sm:p-5">
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-light hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="bg-slate-800/80 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-light rounded-lg shadow dark:bg-slate-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-light">
                  Fill in with Video Info:
                </h3>
                <button
                  onClick={toggleVideoModal}
                  type="button"
                  className="end-2.5 text-slate-500 bg-transparent hover:bg-slate-200 hover:text-slate-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-light"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleAddCourseSubmit}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-slate-800 dark:text-light"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-sky-100 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-slate-500 dark:bg-slate-600 dark:border-gray-500 dark:placeholder-slate-400 dark:text-light"
                      placeholder="EX: Grammar course"
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="flex justify-center">
                      <label>
                        <input
                          className="hidden"
                          id="uploadcVideo"
                          type="file"
                          onChange={handleCoverUpload}
                        />

                        <div
                          id="uploadconVideo"
                          className=" text-primary  hover:text-secondary dark:text-light hover:underline italic text-base hover:dark:text-dark py-3 rounded-full inline cursor-pointer"
                        >
                          Upload Video
                        </div>
                        <ArrowUpTrayIcon className="w-4 h-4 inline font-bold text-primary mx-2" />

                        {formData.photo && (
                          <span className="text-green-500 ml-2">
                            {formData.video.name} uploaded
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded text-light bg-primary px-6 py-3 hover:bg-slate-800"
                    >
                      Add the Video
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpenSubscribe && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-80"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-light rounded-lg shadow dark:bg-slate-800 sm:p-5">
              <button
                type="button"
                onClick={toggleSubscriptionModal}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-light hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={toggleSubscriptionModal}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  onClick={handelUnsubscribe}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
