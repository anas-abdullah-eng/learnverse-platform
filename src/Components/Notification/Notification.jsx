import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/dark_blue_profile_picture_avatar_icon_with_light_blue_solid_background_to_add_it_as_the_default_profile_picture_when_a_user_sign_up.png";
const Notification = ({ request }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Link to={`/notification/${request._id}`}>
      <div
        className={classNames(
          request.status === "null"
            ? "bg-dark dark:bg-light"
            : "bg-sky-100 dark:bg-slate-500",
          "w-full p-3 mt-8  rounded flex"
        )}
      >
        <img
          src={request.userId.photo}
          className="focus:outline-none w-10 h-10 border rounded-full border-gray-500 flex items-center justify-center"
        ></img>
        <div className="pl-3">
          <p
            tabindex="0"
            className="text-slate-950 focus:outline-none tracking-wide text-base leading-none mb-3"
          >
            <span className="text-primary mr-1">
              {request.userId.firstName + " " + request.userId.lastName}
            </span>
            is asking for teacher promotion
          </p>
          <p
            tabindex="0"
            className="focus:outline-none text-xs leading-3 pt-1 text-gray-400"
          >
            {request.createdAt}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Notification;
