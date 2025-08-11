import React from "react";
import { Link } from "react-router-dom";

const TeacherCard = ({ teacher }) => {
  return (
    <Link
      to=""
      className="flex flex-col items-start bg-slate-100 border border-cyan-100 rounded-lg shadow-lg hover:bg-sky-200 dark:border-dark dark:bg-slate-900 dark:hover:bg-primary"
    >
      <img
        className="object-cover w-full rounded md:h-96"
        src={teacher.photo}
        alt={teacher.firstName}
      />
      <div className="flex flex-col justify-around p-4 leading-normal">
        <h4 className="mb-2 text-2xl font-bold tracking-tight text-dark dark:text-light">
          {teacher.firstName + " " + teacher.lastName}
        </h4>
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-slate-700 dark:text-light">
          Level: {teacher.level}
        </h5>
        <h6 className="mb-2 text-base font-semibold tracking-tight text-slate-700 dark:text-light">
          {teacher.email}
        </h6>
      </div>
    </Link>
  );
};

export default TeacherCard;
