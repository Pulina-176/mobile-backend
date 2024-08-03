import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapSigns,
  FaStar,
  FaStarHalfAlt,
  FaStarHalf,
  FaRegStar,
  FaSalesforce,
  FaTags,
  FaHamburger,
  FaWineBottle,
  FaWineGlass,
} from "react-icons/fa";
import StarRating from "../components/StarRating";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fullStars, setFullStars] = useState(null);
  const [hasHalfStar, setHasHalfStar] = useState(null);
  const [emptyStars, setEmptyStars] = useState(null);
  const [formattedRating, setFormattedRating] = useState(null);

  const navigate = useNavigate();

  const handleRating = async () => {
    console.log("Submitting rating:", stars);
    const id = restaurant._id;
    const rating = stars;
    try {
      const res = await fetch(
        `http://localhost:5555/restaurant/${id}/addrating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rating }),
        }
      );
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
          throw new Error(
            `Failed to fetch restaurant details: ${res.statusText}`
          );
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Log the fetched data
        setRestaurant(data);
        setFullStars(Math.floor(data.averageRating));
        setHasHalfStar(data.averageRating % 1 >= 0.5);
        setEmptyStars(5 - fullStars - (hasHalfStar ? 1 : 0));
        setFormattedRating(data.averageRating.toFixed(1));
        console.log(emptyStars);
        console.log(restaurant);
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
          {success && (
            <p className="text-green-500">Rating submitted successfully!</p>
          )}
          <h1 className="text-3xl font-extrabold">{restaurant?.title}</h1>
          <p className="text-md text-gray-700">{restaurant?.about}</p>
          <div className="flex items-center mb-2">
            {[...Array(fullStars)].map((_, index) => (
              <FaStar key={index} className="h-5 w-5 text-yellow-400" />
            ))}
            {hasHalfStar && (
              <FaStarHalfAlt className="h-5 w-5 text-yellow-400" />
            )}

            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
              (_, index) => (
                <FaRegStar key={index} className="h-5 w-5 text-gray-300" />
              )
            )}

            <span className="ml-2 text-gray-700">{formattedRating}</span>
          </div>
        </div>
      </div>

      {/* Restaurant Details in Horizontal Layout */}
      <div className="flex items-center space-x-8 mb-4 ml-16">
        <div className="flex items-center text-sm text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />{" "}
          {restaurant?.address}
          <button
            className="ml-4 bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
            onClick={() => handleViewDirections(restaurant?._id)}
          >
            <FaMapSigns className="mr-2" /> View Directions
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FaEnvelope className="mr-2 text-gray-500" />{" "}
          {restaurant?.officialEmail}
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FaPhoneAlt className="mr-2 text-gray-500" /> {restaurant?.hotline}
        </div>
        <button
          className="ml-4 bg-yellow-500 text-white py-1 px-3 rounded flex items-center text-sm"
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
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <hr className="my-4 border-t-2 border-gray-300 mt-12" />

      <div className="mt-6">
          <h3 className="text-3xl font-extrabold text-neutral-700 leading-tight ml-16 mt-12 flex items-center gap-4">
          <FaTags className="ml-2" />
            Special Offers
            
          </h3>
        
        <div className="flex flex-wrap gap-4 ml-16 mr-16 mt-12">
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
                    <button className="btn btn-neutral">
                      {deal.price_discount}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      <hr className="my-4 border-t-2 border-gray-300 mt-12" />

      {/* Restaurant Information */}
      <div className="mt-4 ml-16 mr-16" >
        {/* Menu */}
          <div className="overflow-x-auto mt-6 mx-auto w-3/5 ">
          <h3 className="text-3xl font-extrabold text-neutral-700 leading-tight ml-16 mt-12 flex justify-center gap-4">
          <FaHamburger className="ml-2" />
            Our Menu
            
          </h3>
       

            <table className="table mt-6">
              <thead>
                <tr>
                  <th></th>
                  {/* <th>Description</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedMenuItems).map((category, catIndex) => (
                  <React.Fragment key={catIndex}>
                    <tr>
                      <td
                        colSpan="3"
                        className="font-bold text-lg text-gray-800 bg-gray-100 rounded-md py-2 px-4 mb-4"
                      >
                        {category}
                      </td>
                    </tr>
                    {groupedMenuItems[category].map((item, index) => (
                      <tr key={index} className="hover:cursor-pointer">
                        <td>
                          <div className="flex items-center gap-12 ">
                            <div className="avatar">
                              <div className="mask mask-squircle h-24 w-24">
                                <img
                                  src={
                                    item.photo ||
                                    "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                  }
                                  alt={item.itemName}
                                />
                              </div>
                            </div>
                            <div className=" flex flex-col">
                              <div className="font-bold text-gray-900 text-lg">
                                {item.itemName}
                              </div>
                              <div>{item.description}</div>
                            </div>
                          </div>
                        </td>
                        {/* <td>{item.description}</td> */}
                        <td className="font-bold text-md">{item.price}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          
        </div>

        {/* Special Deals */}
      </div>
    </div>
  );
};

export default RestaurantDetails;
