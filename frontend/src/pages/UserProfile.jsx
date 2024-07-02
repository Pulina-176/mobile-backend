import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from "../firebase";

const UserProfile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, profilePicture: downloadURL }))
        });
      };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-3xl px-20">
          <div>
            <h1 className="pb-5 text-2xl font-semibold leading-7 text-gray-900">Profile</h1>
            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-2">
                <div>
                <img
                  src={formData.profilePicture || currentUser.profilePicture}
                  alt="profile"
                  className="h-24 w-24 self-center rounded-full object-cover"
                />
                
                  {imageError ? (
                    <progress class="progress progress-error w-56" value="100" max="100">Error Uploading Image</progress>): imagePercent > 0  && imagePercent < 100 ? (
                      <progress class="progress progress-warning w-56" value={imagePercent} max="100"><span className="text-sm font-medium leading-6 text-yellow-600">{imagePercent}</span></progress>) : imagePercent === 100 ? (
                        <span className="text-sm font-medium leading-6 text-yellow-600">Image Uploaded Successfully!</span>) : ('')}
                </div>
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=> setImage(e.target.files[0])}></input>
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => fileRef.current.click()}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 sm:max-w-md">
                    <input
                    defaultValue={currentUser.username}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  defaultValue={currentUser.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-4">
          
            <button
              type="submit"
              className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Update Profile
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
