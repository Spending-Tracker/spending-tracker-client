import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useCycle } from "framer-motion";

import TransactionModel from "../components/TranactionModal";

// context
import { UserContext } from "../context/UserContext";
import { ToggleDarkMode } from "../context/ToggleDarkMode";

import { createTransaction } from "../api/transaction";
import { useClickOutside } from "../hooks";
import Logo from "../assets/logo.png";

const Header = () => {
  const { email, name, id, token } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useContext(ToggleDarkMode);

  const [show, setShow] = useState(false);

  const toggleTransactionModal = () => {
    setShow(!show);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <header className="fixed top-0 w-screen z-10 border-b border-gray-200 dark:border-gray-700">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 min-h-[60px]">
        <div className="flex flex-wrap items-center">
          <SideBarMenu />
          <button
            onClick={toggleTransactionModal}
            type="button"
            className="ml-auto mr-4 text-white inline-flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add new
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className=" mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
          <ProfileMenu name={name} email={email} />
        </div>
        <TransactionModel
          id={id}
          show={show}
          onClose={onClose}
          submit={createTransaction}
          title="Add new transaction"
        />
      </nav>
    </header>
  );
};
// amount, category, paidWith, transactionType, type, description, date,
// type: // Income or Spend or Transfer or Balance
// transactionType: // Deit or Credit
// paidWith: // Cash or Card or Gpay or Phonepe or Paytm or UPI
// category: // Transport or Food or Rent or Personal or Balance or Other

const sideNavLink = [
  {
    to: "/dashboard",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>
    ),
    label: "Overview",
  },
  {
    to: "transactions",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 640 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96z" />
      </svg>
    ),
    label: "Transactions",
  },
  {
    to: "groups",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 640 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
      </svg>
    ),
    label: "Groups",
  },
];

const activeSideNavLink = {
  backgroundColor: "rgb(243 244 246 / 1)",
  color: "rgb(17 24 39 / 1)",
};

const ProfileMenu = ({ name, email }: { name: string; email: string }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div ref={dropdownRef} className="flex items-center lg:order-2 mr-2">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={`https://avatars.dicebear.com/api/initials/${
            name || "user"
          }.svg`}
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isDropdownOpen ? "" : "hidden"
        } z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        style={
          isDropdownOpen
            ? {
                position: "absolute",
                top: "60px",
                right: "0px",
                margin: "0px",
              }
            : {}
        }
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
            {email}
          </span>
        </div>
        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              My profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              Account settings
            </a>
          </li>
        </ul>
        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <p
              onClick={handleLogout}
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              Sign out
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const SideBarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  let sidebarRef = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div ref={sidebarRef} className="flex justify-start items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          className="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Toggle sidebar</span>
      </button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              // position: "absolute",
              // top: "64px",
              // left: "0px",
              // margin: "0px",
            }}
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            className={`absolute top-[64px] left-0 overflow-hidden z-50 min-w-[16rem] h-screen max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 drop-shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
            id="notification-dropdown"
            // style={
            //   isSidebarOpen
            //     ? {
            //         position: "absolute",
            //         top: "64px",
            //         left: "0px",
            //         margin: "0px",
            //       }
            //     : {}
            // }
          >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white border-t border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <motion.ul
                className="space-y-2"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {sideNavLink.map((link, index) => (
                  <motion.li
                    key={index}
                    onClick={closeSidebar}
                    whileHover={{ scale: 1.01 }}
                    variants={itemVariants}
                  >
                    <NavLink
                      end
                      to={link.to}
                      style={({ isActive }) =>
                        isActive ? activeSideNavLink : undefined
                      }
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex mr-4">
        <img src={Logo} className="mr-3 h-8" alt="FlowBite Logo" />
        <span className="self-center hidden md:block text-2xl font-semibold whitespace-nowrap dark:text-white">
          SpendingTracker
        </span>
      </div>
    </div>
  );
};

export default Header;
