import React from "react";

const OAuth = () => {
  return (
    <button className="flex items-center justify-center w-full mt-4 rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
      <img
        className="w-6 h-6 mr-2"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default OAuth;
