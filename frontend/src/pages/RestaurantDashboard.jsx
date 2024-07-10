import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaUserEdit,
  FaUtensils,
  FaTag,
  FaMapMarkerAlt,
  FaBell,
  FaQuestionCircle,
} from "react-icons/fa";

const RestaurantDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const { currentRestaurant } = useSelector((state) => state.restaurant);
  console.log(currentRestaurant)

  // Example profile photo URL
  const profilePhotoUrl = currentRestaurant.profilePicture;  // Example cover photo URL
  const coverPhotoUrl = currentRestaurant.coverPhoto;
    useEffect(() => {
      const handleFill = async () => {
        try {
          const res = await fetch(`http://localhost:5555/restaurant/myprofile/${currentRestaurant._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await res.json();
          if (data.success === false) {
            
            return;
          }
          //console.log(data);
          setProfileData(data);
          //console.log(profileData.title);
          //console.log(profileData);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      handleFill();
    }, []);
  
    if (!profileData) {
      return <div>Loading...</div>;
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
        />{" "}
        {/* Profile Photo */}
        <div>
          <h1 className="text-3xl font-bold">{profileData.title}</h1> {/* Profile Name */}
          <p className="text-sm text-gray-700">{profileData.about}</p>{" "}
          {/* Additional Info */}
        </div>
      </div>

      {/* Sidebar (Unchanged) */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="drawer-button p-2 rounded-full shadow-lg bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
          >
            <FaBars className="text-2xl" />
          </label>
          {/* Page content here */}
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
                    {profileData.title} 
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Address 
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {profileData.address}
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">Hart Hagerty</div>
                                </div>
                              </div>
                            </td>
                            <td>Zemlak, Daniel and Leannon</td>
                            <td>Purple</td>
                          </tr>

                          <tr>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">Brice Swyre</div>
                                </div>
                              </div>
                            </td>
                            <td>Carroll Group</td>
                            <td>Red</td>
                          </tr>

                          <tr>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">Marjy Ferencz</div>
                                </div>
                              </div>
                            </td>
                            <td>Rowe-Schoen</td>
                            <td>Crimson</td>
                          </tr>

                          <tr>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">Yancy Tear</div>
                                </div>
                              </div>
                            </td>
                            <td>Wyman-Ledner</td>
                            <td>Indigo</td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    Special Deals
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                </dd>
                    
                      <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>

                      <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>

                      <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>
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
          <h1 className="text-3xl font-bold">Hungry</h1> {/* Profile Name */}
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
