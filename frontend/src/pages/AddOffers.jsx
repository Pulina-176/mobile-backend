import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSuccess } from "../redux/user/restaurantSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const AddOffers = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const { currentRestaurant } = useSelector((state) => state.restaurant);
  const offers = currentRestaurant.SpecialDeals;
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5555/restaurant/${currentRestaurant._id}/specialdeals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

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
      dispatch(updateSuccess(data));
      setTimeout(() => {
        setSuccess(false);
        setSubmitDone(true);
        window.location.reload();
      }, 500); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Error adding offers:", error);
      setError(error.message);
      setSubmitError(true);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Special Offers
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Offer Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="dealDescription"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="dealDescription"
                  name="dealDescription"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
              </div>
              <div className="mt-2">
                <div className="mask mask-squircle h-12 w-12 object-fill">
                  <img
                    src={formData.photo}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
                {imageError ? (
                  <progress
                    className="progress progress-error w-56"
                    value="100"
                    max="100"
                  >
                    Error Uploading Image
                  </progress>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <progress
                    className="progress progress-warning w-56 mt-2"
                    value={imagePercent}
                    max="100"
                  >
                    <span className="text-sm font-medium leading-6 text-yellow-600 mt-2">
                      {imagePercent}
                    </span>
                  </progress>
                ) : imagePercent === 100 ? (
                  <span className="text-sm font-medium leading-6 text-yellow-600 mt-2">
                    Image Uploaded Successfully!
                  </span>
                ) : (
                  ""
                )}
                <input
                  id="photo"
                  type="file"
                  ref={fileInputRef}
                  name="photo"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="price_discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price/ Discount
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="price_discount"
                  name="price_discount"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {submitError && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Cannot Save Offer
              </div>
            )}
            {submitDone && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Offer Saved
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Save Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOffers;
