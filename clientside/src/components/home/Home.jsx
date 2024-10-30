import React from 'react';
import hero from '../../images/pic1.jpeg';

function Home() {
  const isLoggedIn = localStorage.getItem('userToken'); // Assuming you store a token on login

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center" style={{ padding: '5rem 0' ,paddingBottom:'10rem'}}>
        <div className="grid max-w-screen-xl px-4 py-2 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12" >
          <div className="lg:col-span-7 lg:pr-48 flex flex-col justify-center">
            <div className="place-self-center lg:mt-10">
              <h3 style={{ fontFamily: '500', fontSize: '3rem' }} className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Master Your Tasks with TaskMaster Pro – Stay Organized, Stay Ahead!
              </h3>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                A powerful task management tool designed to help you organize, prioritize, and track your tasks effortlessly. Whether you're working on personal projects or team collaborations, TaskMaster Pro keeps you focused and productive with seamless task creation, tracking, and completion features.
              </p>
              {isLoggedIn ? (
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700">View More</span>
                  <a
                    href="/adminregister"
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    style={{ backgroundColor: 'blue' }}
                  >
                    Get started as Admin
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              ) : (
                <a
                  href="/adminregister"
                  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  style={{ backgroundColor: 'blue' }}
                >
                  View More
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <img
              src={hero}
              alt="mockup"
              className="max-w-full h-auto lg:max-h-full lg:max-w-none"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
