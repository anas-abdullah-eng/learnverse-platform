import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeButton } from "../../Components/DarkmodeComponent/DarkModeButton";
import logo from "../../assets/logo_3x.png";

import "./login_style.css";

const url = "https://learnverse.onrender.com";

const Login = ({ onLogin }) => {
  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const GoogleAuth = async (e) => {
    e.preventDefault();
    const result = await fetch("https://learnverse.onrender.com/auth/google", {
      method: "GET",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // if (!pass.trim()) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     password: "Password is required",
    //   }));
    //   isValid = false;
    // } else {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     password: "",
    //   }));
    // }

    const user = {
      email: email,
      password: pass,
    };
    if (isValid) {
      const result = await fetch("https://learnverse.onrender.com/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      if (data.success) {
        onLogin(data.data.user, data.data.token);
        navigate("/");
        console.log("Success");
      } else {
        if (data.field === "email") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: data.message,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: data.message,
          }));
        }
      }
    }
  };

  return (
    <section className="w-screen h-screen bg-secondary dark:bg-dark flex justify-center items-center relative">
      <div className="z-20 w-2/3 rounded-3xl">
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
        <form className="grid grid-cols-8" onSubmit={handleLogin}>
          <div className="col-span-4 dark:bg-slate-800 bg-light px-20 py-10 rounded-l-3xl">
            <p className="dark:text-light leading-loose text-dark text-2xl mt-8 mb-20 text-center">
              Welcome to <br />
              <span className="text-4xl funky-font">LearnVerse</span>
            </p>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-5 mb-3">
                <div className="relative ">
                  <input
                    type="email"
                    id="email"
                    className="dark:border-light border-dark dark:text-light text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="dark:text-light bg-light dark:bg-slate-800 absolute text-sm text-dark transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    Your Email
                  </label>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  <span className="font-medium">{errors.email}</span>
                </p>
              </div>

              <div className="col-span-5 mb-3">
                <div className="relative ">
                  <input
                    type="password"
                    id="password"
                    className="dark:border-light border-dark  dark:text-light text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="dark:text-light bg-light dark:bg-slate-800 absolute text-sm text-dark transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    Enter your password
                  </label>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  {pass.length < 8 && pass.length > 0 && (
                    <span className="font-medium">
                      Password must be at least 8 characters long.
                    </span>
                  )}
                  <span className="font-medium">{errors.password}</span>
                </p>
              </div>

              <div className="col-start-2 col-span-3 px-0 mt-2">
                <button
                  type="submit"
                  className="bg-primary text-light py-2 px-4 rounded-full hover:bg-dark hover:text-light w-full"
                >
                  Log In
                </button>
                <span className="text-dark text-xs opacity-75 dark:text-light block text-center my-2">
                  <i>Or</i>
                </span>
                <button
                  onClick={GoogleAuth}
                  className="w-full px-1 py-2 border flex justify-center gap-3 border-dark dark:border-light rounded-full text-dark dark:text-light hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
          <div className="relative col-span-4 bg-primary p-4 flex flex-col justify-center items-center rounded-r-3xl gap-14">
            <DarkModeButton />
            <div className="col-span-2 rounded-full bg-light w-60 h-60 flex justify-center items-center p-5">
              <img className="w-full" src={logo} alt="" />
            </div>
            <div>
              <p className="text-light">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-slate-950 italic hover:text-secondary"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div
          className="absolute inset-x-0 top-[calc(50%-8rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(50%-20rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[40rem] h-[20rem] -translate-x-1/2 bg-gradient-to-tr dark:from-light from-dark to-primary dark:to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[80rem] sm:h-[40rem]"
            style={{
              clipPath:
                "polygon(70% 40%, 100% 65%, 95% 20%, 80% 0%, 75% 5%, 65% 40%, 55% 70%, 45% 75%, 40% 65%, 35% 30%, 20% 85%, 0% 60%, 15% 100%, 25% 85%, 75% 100%, 70% 40%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
