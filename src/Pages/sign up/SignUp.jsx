import React, { useState, useEffect } from "react";
import "./signup_style.css";
import studentProfileImage from "../../assets/default_student_profile.jpg";
import { DarkModeButton } from "../../Components/DarkmodeComponent/DarkModeButton";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const url = "https://learnverse.onrender.com";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  const GoogleAuth = async (e) => {
    e.preventDefault();
    const result = await fetch("https://learnverse.onrender.com/auth/google", {
      method: "GET",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!firstName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "",
      }));
    }

    if (!lastName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "",
      }));
    }
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    }
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
    };
    if (isValid) {
      const result = await fetch(
        "https://learnverse.onrender.com/user/register",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await result.json();
      if (data.success) {
        navigate("/");
        console.log("Success");
      } else {
        const emailError = data.errors[0].msg;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: emailError,
        }));
      }
    }
  };

  return (
    <section className="w-screen h-screen bg-secondary dark:bg-dark flex justify-center items-center relative ">
      <div className="z-20 w-2/3 rounded-3xl ">
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
        <form className="grid grid-cols-5" onSubmit={handleSubmit}>
          <div className="relative col-span-2 bg-primary p-4 flex flex-col justify-around items-center rounded-l-3xl">
            <DarkModeButton />
            <div className="text-light text-3xl text-start">
              Improve your English skills
            </div>
            <div className="col-span-2">
              <div className="w-52 h-52- round-full overflow-hidden mx-auto">
                <img
                  src={studentProfileImage}
                  alt="Default Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-light">
                Already Have an account ?{" "}
                <Link
                  to={"/login"}
                  className="text-slate-950 italic hover:text-secondary"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <div className="col-span-3 dark:bg-slate-800 bg-light px-10 py-20 rounded-r-3xl">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 mb-3">
                <div className="relative ">
                  <input
                    type="text"
                    id="firstName"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label
                    htmlFor="firstName"
                    className="dark:text-light absolute text-sm text-dark bg-light dark:bg-slate-800 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    First Name
                  </label>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  <span className="font-medium">{errors.firstName}</span>
                </p>
              </div>
              <div className="col-span-2 mb-3">
                <div className="relative ">
                  <input
                    type="text"
                    id="lastname"
                    className="dark:text-light dark:border-light border-dark z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark bg-transparent rounded-lg border-[1px] border-grey-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label
                    htmlFor="lastname"
                    className="dark:text-light  transition-all absolute text-sm text-dark  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 bg-light dark:bg-slate-800 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Last Name
                  </label>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  <span className="font-medium">{errors.lastName}</span>
                </p>
              </div>

              <div className="col-span-4 mb-3">
                <div className="relative ">
                  <input
                    type="email"
                    id="email"
                    className="dark:border-light  dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
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

              <div className="col-span-4 mb-3">
                <div className="relative ">
                  <input
                    type="password"
                    id="password"
                    className="dark:border-light  dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
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
                </p>
              </div>
              <div className="col-span-4 mb-3">
                <div className="relative ">
                  <input
                    type="password"
                    id="rePassword"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={repass}
                    onChange={(e) => setRepass(e.target.value)}
                  />
                  <label
                    htmlFor="rePassword"
                    className="dark:text-light bg-light dark:bg-slate-800 absolute text-sm text-dark transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    Re-enter the password
                  </label>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  {pass !== repass && repass.length > 0 && (
                    <span className="font-medium">Passwords do not match.</span>
                  )}
                </p>
              </div>
              <div className="col-start-2 col-span-2 px-5 mt-2">
                <button
                  type="submit"
                  className="bg-primary text-light py-2 px-4 rounded-full hover:bg-dark hover:text-light w-full"
                >
                  Sign Up
                </button>
                <span className="text-dark text-xs opacity-75 dark:text-light block text-center my-2">
                  <i>Or</i>
                </span>
                <button
                  onClick={GoogleAuth}
                  className="w-full px-3 py-2 border flex justify-center gap-3 border-dark dark:border-light rounded-full text-dark dark:text-light hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary hover:shadow-lg transition-shadow duration-200"
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
        </form>
        <div
          className="absolute inset-x-0 top-[calc(50%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(50%-30rem)]"
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
      </div>
    </section>
  );
};

export default SignUp;
