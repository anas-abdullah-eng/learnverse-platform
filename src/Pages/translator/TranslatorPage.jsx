import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeButton } from "../../Components/DarkmodeComponent/DarkModeButton";
import Translator from "../../Components/Translator/Translator";

const TranslatorPage = () => {
  return (
    <div className="dark:bg-slate-800 bg-light">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-10 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-10"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr dark:from-light from-dark to-primary dark:to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-5xl py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-dark dark:text-light sm:text-5xl">
              Our powerful translation tool helps you communicate with a global
              audience.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-400">
              Our intuitive interface makes translation a breeze. Simply upload
              your content, and we'll handle the rest.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#Translator"
                className="rounded-md bg-dark dark:bg-light px-3.5 py-2.5 text-sm font-semibold text-light dark:text-dark shadow-sm hover:bg-dark hover:dark:bg-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark dark:focus-visible:outline-light"
              >
                Get started
              </a>
              <Link
                to="/aboutus"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(75%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(75%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 bg-gradient-to-tr dark:from-light from-dark to-primary dark:to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[80rem]"
            style={{
              clipPath:
                "polygon(70% 40%, 100% 65%, 95% 20%, 80% 0%, 75% 5%, 65% 40%, 55% 70%, 45% 75%, 40% 65%, 35% 30%, 20% 85%, 0% 60%, 15% 100%, 25% 85%, 75% 100%, 70% 40%)",
            }}
          />
        </div>
        <div id="Translator" className="py-8">
          <Translator />
        </div>
      </div>
    </div>
  );
};
export default TranslatorPage;
