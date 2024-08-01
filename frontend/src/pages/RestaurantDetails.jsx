import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapSigns,
  FaStar,
} from "react-icons/fa";
import StarRating from "../components/StarRating";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRating = async () => {
    console.log("Submitting rating:", stars);
    const id = restaurant._id;
    const rating = stars;
    try {
      const res = await fetch(`http://localhost:5555/restaurant/${id}/addrating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ rating }),
      });
      if (!res.ok) {
        throw new Error(`Failed to submit rating: ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Rating submission response:", data); // Log the response
      setSuccess(true);
      // Optionally: close the modal or show a success message
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5555/restaurant/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch restaurant details: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Log the fetched data
        setRestaurant(data);
      } catch (error) {
        setError("An error occurred while fetching restaurant details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  useEffect(() => {
    console.log("Restaurant state:", restaurant); // Log the state whenever it updates
  }, [restaurant]);

  const handleViewDirections = (id) => {
    navigate(`/user/view-directions/${id}`);
  };

  const groupedMenuItems = (restaurant?.menu || []).reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {/* Cover Photo Section */}
      <div
        className="bg-gray-300 h-60 mb-4"
        style={{
          backgroundImage: `url(${restaurant?.coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4 ml-16">
        <img
          src={restaurant?.profilePicture}
          alt="Profile Photo"
          className="h-20 w-20 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <div>
        {success && <p className="text-green-500">Rating submitted successfully!</p>}
          <h1 className="text-3xl font-bold">{restaurant?.title}</h1>
          <p className="text-sm text-gray-700">{restaurant?.about}</p>
        </div>
      </div>

      {/* Restaurant Details in Horizontal Layout */}
      <div className="flex items-center space-x-8 mb-4 ml-16">
        <div className="flex items-center text-sm text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-gray-500" /> {restaurant?.address}
          <button
            className="ml-4 bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
            onClick={() => handleViewDirections(restaurant?._id)}
          >
            <FaMapSigns className="mr-2" /> View Directions
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FaEnvelope className="mr-2 text-gray-500" /> {restaurant?.officialEmail}
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FaPhoneAlt className="mr-2 text-gray-500" /> {restaurant?.hotline}
        </div>
        <button
          className="ml-4 bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <FaStar className="mr-2" /> Rate Us
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Rate Us</h3>
            <StarRating onRatingChange={(rating) => setStars(rating)} />
            <div className="modal-action">
              <form method="dialog">

                <button
                  type="button"
                  className="btn"
                  aria-label="Submit Rating"
                  onClick={handleRating}
                >
                  Submit
                </button>
                <span> </span>
                <button  className="btn">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Restaurant Information */}
      <div className="mt-4 ml-16">
        {/* Menu */}
        <div className="overflow-x-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedMenuItems).map((category, catIndex) => (
                <React.Fragment key={catIndex}>
                  <tr>
                    <td
                      colSpan="3"
                      className="font-bold text-md text-gray-800 bg-gray-100 rounded-md py-2 px-4 mb-4"
                    >
                      {category}
                    </td>
                  </tr>
                  {groupedMenuItems[category].map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  item.photo ||
                                  "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                }
                                alt={item.itemName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="">{item.itemName}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Special Deals */}
        <div className="mt-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Special Deals
          </h3>
          <div className="flex flex-wrap gap-4">
            {restaurant?.specialDeals &&
              restaurant.specialDeals.map((deal, index) => (
                <div
                  key={index}
                  className="card card-compact bg-base-100 w-80 shadow-xl"
                >
                  <figure>
                    <img
                      src={
                        deal.photo ||
                        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      }
                      alt={deal.name}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{deal.name}</h2>
                    <p>{deal.dealDescription}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">
                        {deal.price_discount}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
