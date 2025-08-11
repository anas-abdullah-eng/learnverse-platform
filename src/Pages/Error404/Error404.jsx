import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="bg-light dark:bg-slate-800 h-screen flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt=""
        />
        <img
          className="hidden md:block lg:hidden"
          src="https://i.ibb.co/c1ggfn2/Group-193.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-dark dark:text-light">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base  text-dark dark:text-light">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base text-dark dark:text-light">
          Sorry about that! Please visit our homepage to get where you need to
          go.
        </p>
        <div className="my-10">
          <Link
            to="/"
            className="px-8 py-2 w-full lg:w-auto border rounded-md bg-primary text-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Go back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
