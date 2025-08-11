// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { useCourses, useUsers } from "../../hooks/useCourses";
import TopLikedCourse from "../../Components/CourseCard/TopLikedCourseCard";
import CourseCard from "../../Components/CourseCard/CourseCard";
import TeacherCard from "../../Components/TeacherCard/TeacherCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "./homepage.css";
import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAddCourse } from "../../hooks/useAuth";

const HomePage = ({ user, duration = 15000 }) => {
  const { mutate: addCourse } = useAddCourse();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    photo: null,
  });
  const [visible, setVisible] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: users, isLoading: usersLoading } = useUsers();
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCoverUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    setFormData({
      ...formData,

      photo: file,
    });
  };
  if (coursesLoading || usersLoading)
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

  const topLikedCourses = courses.sort((a, b) => b.likes - a.likes).slice(0, 5);
  const topTeachersMap = new Map();

  courses.forEach((course) => {
    if (!topTeachersMap.has(course.teacherId)) {
      topTeachersMap.set(course.teacherId, {
        teacherId: course.teacherId,
        subscribers: 0,
      });
    }
    topTeachersMap.get(course.teacherId).subscribers +=
      course.subscribers?.length || 0;
  });

  const topTeachers = Array.from(topTeachersMap.values())
    .sort((a, b) => b.subscribers - a.subscribers)
    .slice(0, 5)
    .map((teacher) => teacher.teacherId);
  const distinctTopTeachers = Array.from(
    new Set(topTeachers.map((teacher) => teacher.id))
  ).map((id) => {
    return topTeachers.find((teacher) => teacher.id === id);
  });
  console.log(distinctTopTeachers);
  const recommendedCourses = user
    ? courses.filter((course) => course.level === user.level)
    : [];

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    addCourse(formData, {
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
    <div className="container mx-auto p-4 bg-light dark:bg-slate-800">
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-10 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-10"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr dark:from-light from-dark to-slate-950 dark:to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
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
                    Fill in with course Info:
                  </h3>
                  <button
                    onClick={toggleModal}
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
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleAddCourseSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-slate-800 dark:text-light"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-sky-100 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-slate-500 dark:bg-slate-600 dark:border-gray-500 dark:placeholder-slate-400 dark:text-light"
                        placeholder="EX: Grammar course"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="level"
                        className="block mb-2 text-sm font-medium text-slate-800 dark:text-light"
                      >
                        Level
                      </label>
                      <input
                        type="text"
                        name="level"
                        id="level"
                        placeholder="EX: A1"
                        className="bg-sky-100 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-slate-500 dark:bg-slate-600 dark:border-gray-500 dark:placeholder-slate-400 dark:text-light"
                        required
                        value={formData.level}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-slate-800 dark:text-light"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        className="bg-sky-100 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-slate-500 dark:bg-slate-600 dark:border-gray-500 dark:placeholder-slate-400 dark:text-light"
                        required
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-light text-base">
                        If you want to Upload a cover for the course
                      </p>
                      <div className="flex justify-center">
                        <label>
                          <input
                            className="hidden"
                            id="uploadcover"
                            type="file"
                            onChange={handleCoverUpload}
                            accept="image/*"
                          />

                          <div
                            id="uploadIconcover"
                            className=" text-primary  hover:text-secondary dark:text-light hover:underline italic text-base hover:dark:text-dark py-3 rounded-full inline cursor-pointer"
                          >
                            Upload Cover
                          </div>
                          <ArrowUpTrayIcon className="w-4 h-4 inline font-bold text-primary mx-2" />

                          {formData.photo && (
                            <span className="text-green-500 ml-2">
                              {formData.photo.name} uploaded
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
                        Add the course
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <section id="AllCourses">
          <h1 className="text-4xl tracking-tight font-bold mb-4 px-7 text-slate-800 dark:text-light text-center">
            All Courses
          </h1>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            spaceBetween={50}
            coverflowEffect={{
              rotate: 0,
              stretch: 20,
              depth: 150,
              modifier: 3,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <hr className="w-48 h-1 mx-auto my-5 bg-slate-800 border-0 rounded md:mt-24 md:mb-32 dark:bg-light" />
        <section id="TopLikedCourses">
          <h1 className="tracking-tight text-4xl font-bold mb-4 px-7 text-slate-800 dark:text-light text-center">
            Top Liked Courses
          </h1>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
          >
            {topLikedCourses.map((course) => (
              <SwiperSlide key={course._id}>
                <TopLikedCourse course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <hr className="w-48 h-1 mx-auto my-5 bg-slate-800 border-0 rounded md:mt-24 md:mb-32 dark:bg-light" />
        {user && user.userType === "student" && (
          <section id="RecommendedCourses">
            <h1 className="text-4xl tracking-tight font-bold mb-4 px-7 text-slate-800 dark:text-light text-center">
              Recommended Courses
            </h1>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation={true}
              modules={[Navigation]}
            >
              {recommendedCourses.map((course) => (
                <SwiperSlide key={course._id}>
                  <TopLikedCourse course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
            <hr className="w-48 h-1 mx-auto my-5 bg-slate-800 border-0 rounded md:mt-24 md:mb-32 dark:bg-light" />
          </section>
        )}
        {user && user.userType === "teacher" && (
          <section id="yourCourses">
            <h1 className="text-4xl tracking-tight font-bold mb-4 px-7 text-slate-800 dark:text-light text-center">
              Your Courses
            </h1>
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              navigation={true}
              modules={[Navigation]}
            >
              {topLikedCourses.map((course) => (
                <SwiperSlide key={course._id}>
                  <TopLikedCourse course={course} />
                </SwiperSlide>
              ))}
              <SwiperSlide id="addCourse">
                <button
                  onClick={toggleModal}
                  className="cursor-cell w-full h-full hover:bg-slate-600 bg-slate-400 rounded text-slate-800 hover:text-slate-300 flex items-center justify-center"
                >
                  <PlusIcon className="w-11 h-11" /> Add a Course
                </button>
              </SwiperSlide>
            </Swiper>
            <hr className="w-48 h-1 mx-auto my-5 bg-slate-800 border-0 rounded md:mt-24 md:mb-32 dark:bg-light" />
          </section>
        )}

        <h1 className="text-4xl tracking-tight font-bold mb-5 px-7 text-slate-800 dark:text-light text-center">
          Top Rated Teachers
        </h1>
        <section id="TopRatedTeacher" className="px-36 flex flex-row my-28">
          <div className="inline">
            <h2 className="text-3xl font-bold tracking-tights text-slate-800 dark:text-sky-100">
              Premier Teachers Just for You
            </h2>
            <p className="text-lg leading-8 w-3/4 my-10 text-slate-700 dark:text-light">
              Discover the exceptional educators who have been recognized for
              their outstanding contributions to student success. These
              top-rated teachers bring passion, expertise, and innovation to
              every lesson, ensuring you receive the highest quality education
            </p>
          </div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="TopRatedTeacherSwiper"
          >
            {distinctTopTeachers.map((teacher) => (
              <SwiperSlide key={teacher.teacherId}>
                <TeacherCard teacher={teacher} />
              </SwiperSlide>
            ))}
            {distinctTopTeachers.map((teacher) => (
              <SwiperSlide key={teacher.teacherId}>
                <TeacherCard teacher={teacher} />
              </SwiperSlide>
            ))}
            {distinctTopTeachers.map((teacher) => (
              <SwiperSlide key={teacher.teacherId}>
                <TeacherCard teacher={teacher} />
              </SwiperSlide>
            ))}
            {distinctTopTeachers.map((teacher) => (
              <SwiperSlide key={teacher.teacherId}>
                <TeacherCard teacher={teacher} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <div
          className="absolute inset-x-0 top-[calc(75%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(75%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 bg-gradient-to-tr dark:from-light from-dark to-slate-950 dark:to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[80rem]"
            style={{
              clipPath:
                "polygon(70% 40%, 100% 65%, 95% 20%, 80% 0%, 75% 5%, 65% 40%, 55% 70%, 45% 75%, 40% 65%, 35% 30%, 20% 85%, 0% 60%, 15% 100%, 25% 85%, 75% 100%, 70% 40%)",
            }}
          />
        </div>
      </div>
      {message && visible && (
        <div
          id="toast"
          className={classNames(
            message.type === "success" ? "bg-green-400" : "bg-red-400 ",
            "fixed right-5 bottom-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          )}
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{message.text}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
