import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/restaurantSlice";
import { useParams } from "react-router-dom";
import RestaurantHeader from "../components/RestaurantHeader";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const backendurl = import.meta.env.VITE_BACKEND_URL

const EditMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const { id, menuid } = useParams();

  useEffect(() => {
    fetchMenuItem();
  }, []);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, photo: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    console.log(formData);
  };

  const fetchMenuItem = async () => {
    try {
      const res = await fetch(
        `${backendurl}/restaurant/${id}/menu/show/${menuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok)
        throw new Error(`Failed to fetch menu item: ${res.statusText}`);
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(
        `${backendurl}/restaurant/${id}/menu/edit/${menuid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Response Data:", data); // Add this line to log response data

      if (!res.ok) {
        // Check if response is not ok or success flag is not true
        throw new Error(res.statusText);
      }

      dispatch(updateSuccess(data));
      setSubmitDone(true);
      setSubmitError(false); 
      navigate("/restaurant/dashboard"); // Ensure submitError is reset
    } catch (error) {
      console.error("Submit error:", error); // Log errors for debugging
      dispatch(updateFailure());
      setSubmitError(true);
      setSubmitDone(false); // Ensure submitDone is reset
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <RestaurantHeader />
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-neutral-600 sm:text-3xl">
            Edit Menu Items
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Easily update and customize your menu items to reflect new dishes,
            adjust prices, or make seasonal changes.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">Edit Menu Item</p>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900 hidden"
              >
                Photo
              </label>
              <div className="mt-2">
                <div className="mask mask-squircle h-24 w-24 object-fill mx-auto">
                  <img
                    src={formData.photo || "https://via.placeholder.com/150"}
                    alt="Menu Item"
                  />
                </div>
                {imageError && (
                  <progress
                    className="progress progress-error w-56"
                    value="100"
                    max="100"
                  >
                    Error Uploading Image
                  </progress>
                )}
                {imagePercent > 0 && imagePercent < 100 && (
                  <progress
                    className="progress progress-warning w-56 mt-2"
                    value={imagePercent}
                    max="100"
                  >
                    <span className="text-sm font-medium leading-6 text-yellow-500 mt-2">
                      {imagePercent}%
                    </span>
                  </progress>
                )}
                {imagePercent === 100 && (
                  <span className="text-sm font-medium leading-6 text-yellow-500 mt-2">
                    Image Uploaded Successfully!
                  </span>
                )}
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="btn btn-neutral btn-sm mt-2"
                >
                  <FaUpload />
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900 mt-8"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={formData.category || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Name
              </label>
              <input
                id="itemName"
                name="itemName"
                type="text"
                required
                value={formData.itemName || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                value={formData.description || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="text"
                required
                value={formData.price || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>

            {submitError && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Cannot Save Menu Item
              </div>
            )}
            {submitDone && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Menu Item Edited
              </div>
            )}

            <div>
              <button
                type="submit"
                className="inline-block w-full rounded-md bg-yellow-500 px-3.5 py-1.5 text-base font-semibold leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
