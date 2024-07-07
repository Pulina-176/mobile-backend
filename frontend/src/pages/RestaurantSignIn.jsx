import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/restaurantSlice";

const RestaurantSignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.restaurant);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // Hide error message after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5555/restaurant/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/restaurant/home");
      }, 500); // Hide success message after 0.5 seconds
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="officialEmail" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="officialEmail" 
                  name="officialEmail" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  onChange={handleChange} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  onChange={handleChange} />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Sign in</button>
            </div>
          </form>
          {success && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Logged in successfully!!
            </div>
          )}

          {showError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to="/restaurant/sign-up" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignIn;
