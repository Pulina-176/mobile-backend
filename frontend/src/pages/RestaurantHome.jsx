import React from 'react'
import RestaurantHeader from '../components/RestaurantHeader'
import {useRef,useEffect} from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from "../firebase";

const RestaurantHome = () => {
  const filePickerRef = useRef(null);
  const [image, setImage] = useState(undefined);
  console.log(image)
  const {currentRestaurant} = useSelector((state) => state.restaurant);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

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
      
        console.log("Upload is " + imagePercent+ "% done");
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData({ ...formData, photo: downloadURL });
        });
      });
  };

  return (
    <>
    <RestaurantHeader />
    <div className="flex min-h-full flex-col justify-center px-32 py-32 lg:px-48">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-xl font-semibold leading-7 text-gray-900">Profile</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed to users.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Restaurant Name</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:max-w-md"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">About your restaurant.</p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:max-w-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:max-w-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:max-w-md"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div>
                <img
                  src={formData.photo || currentRestaurant.profilePicture}
                  alt="profile"
                  className="h-24 w-24 self-center rounded-full object-cover"
                />
                {imageError ? (
                    <progress className="progress progress-error w-56" value="100" max="100">Error Uploading Image</progress>): imagePercent > 0  && imagePercent < 100 ? (
                      <progress className="progress progress-warning w-56" value={imagePercent} max="100"><span className="text-sm font-medium leading-6 text-yellow-600">{imagePercent}</span></progress>) : imagePercent === 100 ? (
                        <span className="text-sm font-medium leading-6 text-yellow-600">Image Uploaded Successfully!</span>) : ('')}

                  </div>
                <input type="file" ref={filePickerRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => filePickerRef.current.click()}
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Location</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">Choose Your Location</label>
                <div className="mt-2">
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 leading-6"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Menu and Specials</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Add and manage the categories of your menu as well as highlight any special deals.</p>
            
            <div className="mt-4 flex gap-x-4">
              <button type="button" className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                Edit Menu
              </button>
              <button type="button" className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                Edit Special Offers
              </button>
              <button type="button" className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                Edit Categories
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
            Save
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default RestaurantHome;
