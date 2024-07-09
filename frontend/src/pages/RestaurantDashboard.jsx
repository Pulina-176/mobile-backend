import React from "react";
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
  // Example profile photo URL
  const profilePhotoUrl =
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // Example cover photo URL
  const coverPhotoUrl =
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="p-4">
      {/* Cover Photo Section */}
      <div
        className="bg-gray-300 h-60 mb-4"
        style={{
          backgroundImage: `url(${coverPhotoUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4 pl-16">
        <img
          src={profilePhotoUrl}
          alt="Profile Photo"
          className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
        />{" "}
        {/* Profile Photo */}
        <div>
          <h1 className="text-3xl font-bold">Hungry</h1> {/* Profile Name */}
          <p className="text-sm text-gray-700">Best Food In Town</p>{" "}
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
            <div class="px-4 sm:px-0">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                Restaurant Information
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Go to Edit Profile section to edit data.
              </p>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Restaurant Name
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Margot Foster
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Address
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Backend Developer
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    margotfoster@example.com
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Hotline
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    $120,000
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-lg font-medium leading-6 text-gray-900">
                    Your Menu
                  </dt>
                  </div>
                  </dl>
          </div>

                    <div class="overflow-x-auto mt-6">
                      <table class="table">
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
                              <div class="flex items-center gap-3">
                                <div class="avatar">
                                  <div class="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div class="font-bold">Hart Hagerty</div>
                                </div>
                              </div>
                            </td>
                            <td>Zemlak, Daniel and Leannon</td>
                            <td>Purple</td>
                          </tr>

                          <tr>
                            <td>
                              <div class="flex items-center gap-3">
                                <div class="avatar">
                                  <div class="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div class="font-bold">Brice Swyre</div>
                                </div>
                              </div>
                            </td>
                            <td>Carroll Group</td>
                            <td>Red</td>
                          </tr>

                          <tr>
                            <td>
                              <div class="flex items-center gap-3">
                                <div class="avatar">
                                  <div class="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div class="font-bold">Marjy Ferencz</div>
                                </div>
                              </div>
                            </td>
                            <td>Rowe-Schoen</td>
                            <td>Crimson</td>
                          </tr>

                          <tr>
                            <td>
                              <div class="flex items-center gap-3">
                                <div class="avatar">
                                  <div class="mask mask-squircle h-12 w-12">
                                    <img
                                      src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div class="font-bold">Yancy Tear</div>
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
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-lg font-medium leading-6 text-gray-900">
                    Special Deals
                  </dt>
                  <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                </dd>
                    
                      <div class="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>

                      <div class="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>

                      <div class="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                          />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">Shoes!</h2>
                          <p>
                            If a dog chews shoes whose shoes does he choose?
                          </p>
                          <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
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
          className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
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
