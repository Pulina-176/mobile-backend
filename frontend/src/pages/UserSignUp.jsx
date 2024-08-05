import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const backendurl = import.meta.env.VITE_BACKEND_URL

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
      const res = await fetch(`${backendurl}/auth/signup`, {
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
      }, 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row h-screen">
        <div className="relative flex-shrink-0 w-full lg:w-1/2">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg">
            <h1 className="text-2xl font-bold sm:text-3xl text-center">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500 text-center">
              Create your account to start discovering and enjoying the best
              local dining experiences tailored just for you.
            </p>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  >
                    Sign up
                  </button>
                  <OAuth />
                </div>
              </form>

              {success && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                  Account created successfully!
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                  {error}
                </div>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?{" "}
                <Link to="/sign-in">
                  <span className="font-semibold leading-6 text-yellow-500 hover:text-yellow-400">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSignUp;
