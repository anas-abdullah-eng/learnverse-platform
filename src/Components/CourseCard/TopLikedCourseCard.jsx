import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/Free-Online-Course-2-768x513.jpg";

const TopLikedCourse = ({ course }) => {
  return (
    <Link
      to={`/course/${course._id}`}
      className="flex flex-col items-start bg-slate-100 border border-cyan-100 rounded-lg shadow-lg hover:bg-sky-200 dark:border-dark dark:bg-slate-900 dark:hover:bg-primary"
    >
      <img
        className="object-cover w-full rounded md:h-80"
        src={course.photo}
        alt={course.name}
      />
      <div className="flex flex-col justify-around p-4 leading-normal h-72">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-dark dark:text-light">
          {course.name}
        </h5>
        <h6 className="mb-2 text-lg font-semibold tracking-tight text-slate-700 dark:text-light">
          Level: {course.level}
        </h6>
        <p className="mb-3 font-normal text-slate-600 dark:text-gray-400 line-clamp-4 whitespace-normal text-ellipsis">
          {course.description}
        </p>
        <p className="mb-3 font-normal text-slate-600 dark:text-gray-400">
          Number of subscribers: {course.likes}
        </p>
      </div>
    </Link>
  );
};

export default TopLikedCourse;
