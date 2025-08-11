import React, { useEffect, useState } from "react";
import {
  useUpdateUserProfile,
  useRequestPromotionToProfessor,
} from "../../hooks/useAuth";
import studentImage from "../../assets/default_student_profile.jpg";
import teacherImage from "../../assets//default_teacher_profile.jpg";
import { ArrowUpTrayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const ProfilePage = ({ duration = 15000 }) => {
  const { mutate: updateProfile } = useUpdateUserProfile();
  const { mutate: promoteUser } = useRequestPromotionToProfessor();
  const [message, setMessage] = useState(null);
  // const [promoteMessage, setPromoteMessage] = useState(null);

  const [user, setUser] = useState(() => {
    const userStorage = localStorage.getItem("user");
    return userStorage ? JSON.parse(userStorage) : null;
  });
  if (!user) return <div>You are not logged in</div>;

  const [defaultPhoto, setDefaultPhoto] = useState(user.photo);
  const [certification, setCertification] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photo: null,
  });
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
  };

  useState(() => {
    const userStorage = localStorage.getItem("user");
    return userStorage ? JSON.parse(userStorage) : null;
  });

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    setFormData({
      ...formData,

      photo: file,
    });
  };
  const handleRevertPhoto = () => {
    setFormData({
      ...formData,

      photo: null,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: (data) => {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      },
      onError: (error) => {
        setMessage({
          type: "error",
          text: `Error updating profile: ${error.message}`,
        });
      },
    });
  };

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [user]);

  const handleCertificationUpload = (e) => {
    e.preventDefault();
    const cirt = e.target.files[0];

    setCertification(cirt);
  };
  const handleCertificationSubmit = (e) => {
    e.preventDefault();
    if (certification) {
      promoteUser(certification, {
        onSuccess: (data) => {
          setMessage({
            type: "success",
            text: "Promotion request sent successfully!",
          });
        },
        onError: (error) => {
          setMessage({
            type: "error",
            text: `Error sending promotion request: ${error.message}`,
          });
        },
      });
    }
  };
  return (
    <div className="flex items-center justify-center bg-light pt-12 pb-24 dark:bg-slate-800">
      <div className="w-1/2">
        <div className="bg-sky-100 shadow-2xl rounded-lg py-5 dark:bg-dark">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-2">
              <img
                className="w-56 h-56 rounded-full mx-auto object-cover"
                src={
                  formData.photo
                    ? URL.createObjectURL(formData.photo)
                    : defaultPhoto !== ""
                    ? defaultPhoto
                    : user.userType === "student"
                    ? studentImage
                    : teacherImage
                }
                alt="Profile.png"
              />
            </div>
            <div className="text-center my-3">
              <label>
                <input
                  type="file"
                  id="uploadProfilePicture"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                />
                <div
                  id="uploadIcon"
                  className="bg-secondary text-slate-800 hover:bg-slate-800 hover:text-light dark:bg-slate-800 dark:text-light hover:dark:bg-light hover:dark:text-dark px-3 py-2 rounded w-fit mx-auto mt-6 mb-4 cursor-pointer"
                >
                  <ArrowUpTrayIcon className="h-4 w-4 transition-none inline me-2" />
                  Upload picture
                </div>
              </label>
              {formData.photo && (
                <button type="button" onClick={handleRevertPhoto}>
                  Revert
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4 p-8">
              <div className="col-span-2 mb-3 ">
                <div className="relative ">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="firstName"
                    className="dark:text-light absolute text-sm text-dark bg-sky-100 dark:bg-slate-900 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    First Name
                  </label>
                </div>
              </div>
              <div className="col-span-2 mb-3 ">
                <div className="relative ">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="lastName"
                    className="dark:text-light absolute text-sm text-dark bg-sky-100 dark:bg-slate-900 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    Last Name
                  </label>
                </div>
              </div>
              <div className="col-span-2 mb-3 ">
                <div className="relative ">
                  <p
                    id="level"
                    name="level"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    onChange={handleChange}
                  >
                    {user.level}
                  </p>
                  <label
                    htmlFor="lastName"
                    className="dark:text-light absolute text-sm text-dark bg-sky-100 dark:bg-slate-900 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    Your Level
                  </label>
                </div>
              </div>
              <div className="col-span-2 mb-3 ">
                <div className="relative ">
                  <p
                    id="level"
                    name="level"
                    className="dark:border-light dark:text-light border-dark text-dark bg-transparent z-0 block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    onChange={handleChange}
                  >
                    {user.userType}
                  </p>
                  <label
                    htmlFor="lastName"
                    className="dark:text-light absolute text-sm text-dark bg-sky-100 dark:bg-slate-900 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-3 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[80%] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 "
                  >
                    User Type
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center my-3">
              <button
                className="text-light bg-primary hover:bg-dark hover:text-light rounded px-4 py-2"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
          {user.userType === "student" ? (
            <form onSubmit={handleCertificationSubmit}>
              <div className="px-8 py-4 dark:text-light dark-slate-800">
                <p className="inline me-1">
                  Do you want to become a teacher in our website?
                </p>
                <label>
                  <input
                    className="hidden"
                    id="uploadCertification"
                    type="file"
                    onChange={handleCertificationUpload}
                    accept="image/*"
                  />

                  <div
                    id="uploadIconCertification"
                    className=" text-primary  hover:text-secondary  hover:underline italic text-base  px-2 py-1 rounded-full inline cursor-pointer"
                  >
                    Upload Certification
                  </div>
                  {certification && (
                    <span className="text-green-500 ml-2">
                      {certification.name} uploaded
                    </span>
                  )}
                  <button type="submit" className="inline">
                    <ArrowRightIcon className="h-5 w-5 transition-none inline ms-2" />
                  </button>
                </label>
              </div>
            </form>
          ) : (
            ""
          )}
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

export default ProfilePage;
