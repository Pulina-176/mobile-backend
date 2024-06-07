import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  // restaurants stores the list of restaurants fetched from API
  //setrestaurants updates the restaurant's state
  const [restaurants, setrestaurants] = useState([]);
  //loading manages the loading state to show a spinner while data is fetched
  // setLoading updates the loading state
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/restaurant")
      .then((response) => {
        setrestaurants(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Restaurants Near You </h1>
        <Link to="/restaurant/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Description
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                HotLine
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant._id} className="h-8">
                <td className="border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {restaurant.title}
                </td>
                <td className="border-slate-700 rounded-md text-center max-md:hidden">
                  {restaurant.description}
                </td>
                <td className="border-slate-700 rounded-md text-center max-md:hidden">
                  {restaurant.hotline}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/restaurant/details/${restaurant._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/restaurant/edit/${restaurant._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/restaurant/delete/${restaurant._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
