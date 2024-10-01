import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

function Navbar() {
  const auth = localStorage.getItem('person'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const SignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Set the theme on initial load
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-12" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" style={{ fontFamily: 700 }}>
              <b>TaskManager</b>
            </span>
          </a>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>

          <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default" style={{ marginTop: '0.5rem' }}>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              {/* Search Input in the Middle */}
              <li className="flex-grow md:flex md:justify-center">
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact Us
                </Link>
              </li>

              {auth ? (
                <>
                  {/* User Info Dropdown */}
                  <li className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center px-3 text-gray-900 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 dark:text-white"
                    >
                      <span>{auth.name || "User"}</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m5 8 5 5 5-5"
                        />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuButton">
                          <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{auth.email}</p>
                          <div className="py-1">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              onClick={SignOut}
                            >
                              Sign out
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <div style={{ display: 'flex', columnGap: '1rem', marginTop: '-0.5rem' }}>
                  <li>
                    <Link
                      to="/register"
                      className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400"
                    >
                      Login
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>

          {/* Toggle Dark Mode Button at the End of the Right Side */}
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full focus:outline-none ml-4"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-9.66h-1M4.34 12H3.34m12.02-7.66l-.7.7M6.02 17.66l-.7.7m12.02 0l-.7-.7m-8.7-8.7l-.7-.7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-9.66h-1M4.34 12H3.34m12.02-7.66l-.7.7M6.02 17.66l-.7.7m12.02 0l-.7-.7m-8.7-8.7l-.7-.7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
