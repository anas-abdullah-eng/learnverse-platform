import { Fragment } from "react";
import logo from "../../assets/logo_3x.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import studentImage from "../../assets/default_student_profile.jpg";
import teacherImage from "../../assets//default_teacher_profile.jpg";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import {
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DarkModeButton } from "../DarkmodeComponent/DarkModeButton";

const navigation = [
  { name: "Translator", href: "/translator" },
  { name: "Grammar Checker", href: "/grammar-checker" },
  { name: "Dictionary", href: "/dictionary" },
  { name: "Online Test", href: "/online-test" },
  { name: "Vocabulary Test", href: "/vocabulary-test" },
  { name: "About US", href: "/about-us" },
  { name: "VerseChat", href: "https://messenger-3m7q.onrender.com/" },
];

const teacherNavigation = [
  { name: "Question Bank", href: "/question-bank" },
  { name: "Vocabulary Manager", href: "/vocabulary-manager" },
  { name: "Video Manager", href: "/video-manager" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <DarkModeButton />
      <Disclosure as="nav" className="bg-light dark:bg-slate-800 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:px-8">
              <div className="relative flex h-28 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-dark hover:bg-primary hover:text-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:justify-start">
                  <div className="flex flex-shrink-0 items-center mr-7">
                    <Link to="/">
                      <img
                        className="h-24 w-auto"
                        src={logo}
                        alt="LearnVerse.png"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-primary text-light"
                              : "text-dark hover:bg-dark hover:text-light dark:text-light dark:hover:bg-light dark:hover:text-dark ",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {user?.role === "teacher" && teacherNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-secondary text-white"
                              : "text-dark hover:bg-secondary hover:text-white dark:text-light dark:hover:bg-secondary dark:hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer border border-secondary"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {user ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* <button
                      type="button"
                      className="relative rounded-full bg-primary dark:bg-light p-1 text-light dark:text-dark hover:text-light focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2 focus:ring-offset-dark"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <ChatBubbleOvalLeftEllipsisIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button> */}

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2 focus:ring-offset-dark">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-16 w-16 object-cover rounded-full"
                            src={
                              user.photo
                                ? user.photo
                                : user.userType == "student"
                                ? studentImage
                                : teacherImage
                            }
                            alt="Profile Picture"
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-light py-1 shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  focus ? "bg-light" : "",
                                  "block px-4 py-2 text-sm text-dark"
                                )}
                              >
                                {user.firstName + " " + user.lastName}
                              </Link>
                            )}
                          </MenuItem>

                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to="/loved-videos"
                                className={classNames(
                                  focus ? "bg-light" : "",
                                  "block px-4 py-2 text-sm text-dark"
                                )}
                              >
                                Loved Videos
                              </Link>
                            )}
                          </MenuItem>
                          {user.userType === "admin" && (
                            <MenuItem>
                              {({ focus }) => (
                                <Link
                                  to="/notification"
                                  className={classNames(
                                    focus ? "bg-light" : "",
                                    "block px-4 py-2 text-sm text-dark"
                                  )}
                                >
                                  Notifications
                                </Link>
                              )}
                            </MenuItem>
                          )}
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  focus ? "bg-light" : "",
                                  "block px-4 py-2 text-sm text-dark"
                                )}
                                onClick={onLogout}
                              >
                                Sign out
                              </Link>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="bg-primary border-2 border-primary text-light mr-4 px-4 py-2 rounded"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded outline border-primary dark:text-light text-dark px-3  py-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-primary text-light"
                        : "text-dark hover:bg-dark hover:text-light dark:text-light dark:hover:bg-light dark:hover:text-dark ",
                      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default Navbar;
