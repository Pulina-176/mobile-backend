import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUserEdit,
  FaUtensils,
  FaTag,
  FaMapMarkerAlt,
  FaBell,
  FaQuestionCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/restaurantSlice";

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const { currentRestaurant } = useSelector((state) => state.restaurant);
  console.log(currentRestaurant);
  //console.log(currentRestaurant.menu);
  const menuItems = currentRestaurant.menu;
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Example profile photo URL
  const profilePhotoUrl = currentRestaurant.profilePicture;
  // Example cover photo URL
  const coverPhotoUrl = currentRestaurant.coverPhoto;

  const handleDeleteMenuItem = async (id, menuid) => {
    try {
      dispatch(updateStart());
      const response = await fetch(
        `http://localhost:5555/restaurant/${id}/menu/delete/${menuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        // If the response is not ok, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete menu item");
      }

      const data = await response.json();
      console.log(data);

      dispatch(updateSuccess(data));

      console.log("Menu item deleted successfully:", data);

      // Update UI state to reflect the deletion (instead of reloading the page)
      // For example, you might want to call a function to refresh the menu list or remove the item from state
      // refreshMenuList(); // Example function, implement as needed
    } catch (error) {
      console.error("Error deleting menu item:", error.message);
      dispatch(updateFailure());
    }
  };

  useEffect(() => {
    const handleFill = async () => {
      try {
        const res = await fetch(
          `http://localhost:5555/restaurant/myprofile/${currentRestaurant._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    handleFill();
  }, [currentRestaurant._id]);

  if (!profileData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Cover Photo Section */}
      <div
        className="bg-gray-300 h-60 mb-4"
        style={{
          backgroundImage: `url(${currentRestaurant.coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4 pl-16">
        <img
          src={profilePhotoUrl}
          alt="Profile Photo"
          className="h-20 w-20 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{currentRestaurant.title}</h1>
          <p className="text-sm text-gray-700">{currentRestaurant.about}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="drawer-button p-2 rounded-full shadow-lg bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
          >
            <FaBars className="text-2xl" />
          </label>
          <div className="mt-4 pl-32">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Restaurant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Go to Edit Profile section to edit data.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Restaurant Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {currentRestaurant.title}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {currentRestaurant.address}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {profileData.officialEmail}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Hotline
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {profileData.hotline}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    Your Menu
                  </dt>
                </div>
              </dl>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Settings</th>
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
                          <td>
                            <div className="flex items-center gap-4">
                              <div className="text-yellow-500 text-lg">
                                <button className="btn">
                                <Link
                                  to={`/restaurant/${currentRestaurant._id}/menu/edit/${item._id}`}
                                >
                                  <FaEdit />
                                </Link>
                                </button>
                              </div>
                              <div>
                                <div className="text-red-500 text-lg">
                                  <button

                                    className="btn"
                                    onClick={() =>
                                      document
                                        .getElementById("my_modal_1")
                                        .showModal()
                                    }
                                  >
                                    <div className="text-red-500 text-lg">
                                    <FaTrash />
                                    </div>
                                  </button>
                                  <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                      <h3 className="font-bold text-lg">
                                        Are You sure you want to delete this item?
                                      </h3>
                                      <div className="modal-action">
                                        <form method="dialog">
                                          {/* if there is a button in form, it will close the modal */}
                                          <button className="btn btn-error" onClick={() => handleDeleteMenuItem(currentRestaurant._id, item._id)} aria-label="Close modal" >Delete</button>
                                          <span> </span>
                                          <span></span>
                                          <button className="btn">Close</button>

                                        </form>
                                      </div>
                                    </div>
                                  </dialog>
                                </div>
                              </div>
                            </div>
                          </td>
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
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                Special Deals
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>

              {currentRestaurant.specialDeals.map((deal, index) => (
                <div
                  key={index}
                  className="card card-compact bg-base-100 w-96 shadow-xl"
                  style={{ width: "20rem", height: "24rem" }}
                >
                  <figure>
                    <img
                      src={
                        deal.photo ||
                        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      }
                      className="w-full"
                      //alt="Special Offers"
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

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-100 text-gray-900 min-h-full w-80 p-4 space-y-2">
            {/* Sidebar content here */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className=" items-center ">
              <img
                src={profilePhotoUrl}
                alt="Profile Photo"
                className="h-20 w-20 rounded-full border-4 border-white shadow-lg object-cover"
              />{" "}
              {/* Profile Photo */}
              <div>
                <h1 className="text-3xl font-bold">Hungry</h1>{" "}
                {/* Profile Name */}
                <p className="text-sm text-gray-700">Best Food In Town</p>{" "}
                {/* Additional Info */}
              </div>
            </div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaHome className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaUserEdit className="mr-2" /> Update Profile
              </a>
            </li>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaUtensils className="mr-2" /> Change Menu
              </a>
            </li>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaTag className="mr-2" /> Add Offers
              </a>
            </li>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaMapMarkerAlt className="mr-2" /> Location
              </a>
            </li>
            <li className="mb-2">
              <a className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                <FaQuestionCircle className="mr-2" /> Help/Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
