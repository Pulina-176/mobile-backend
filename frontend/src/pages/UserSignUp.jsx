// UserSignUp.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import Header from "../components/Header";
const UserSignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5555/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      const data = await res.json();
      console.log(data);

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        setSuccess(false);
        navigate("/sign-in");
      }, 500); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Join Appete!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Sign up
              </button>
              <OAuth />
            </div>
          </form>

          {success && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Account created successfully!
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link to="/sign-in">
              <span className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
