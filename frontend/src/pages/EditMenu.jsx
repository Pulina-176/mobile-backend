import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/restaurantSlice";
import { useParams } from "react-router-dom";

const EditMenu = () => {
  const dispatch = useDispatch();
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prevData => ({ ...prevData, photo: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.id]: e.target.value }));
    console.log(formData);
  };

  const fetchMenuItem = async () => {
    try {
      const res = await fetch(`http://localhost:5555/restaurant/${id}/menu/show/${menuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to fetch menu item: ${res.statusText}`);
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
      const res = await fetch(`http://localhost:5555/restaurant/${id}/menu/edit/${menuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      console.log("Response Data:", data); // Add this line to log response data
  
      if (!res.ok) { // Check if response is not ok or success flag is not true
        throw new Error(res.statusText);
      };
  
      dispatch(updateSuccess(data));
      setSubmitDone(true);
      setSubmitError(false); // Ensure submitError is reset
    } catch (error) {
      console.error("Submit error:", error); // Log errors for debugging
      dispatch(updateFailure());
      setSubmitError(true);
      setSubmitDone(false); // Ensure submitDone is reset
    }
  };
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit Menu Items
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              value={formData.category || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
              disabled
            />
          </div>
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium leading-6 text-gray-900">
              Item Name
            </label>
            <input
              id="itemName"
              name="itemName"
              type="text"
              required
              value={formData.itemName || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={formData.description || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2">
              <div className="mask mask-squircle h-12 w-12 object-fill">
                <img src={formData.photo || "https://via.placeholder.com/150"} alt="Menu Item" />
              </div>
              {imageError && (
                <progress className="progress progress-error w-56" value="100" max="100">
                  Error Uploading Image
                </progress>
              )}
              {imagePercent > 0 && imagePercent < 100 && (
                <progress className="progress progress-warning w-56 mt-2" value={imagePercent} max="100">
                  <span className="text-sm font-medium leading-6 text-yellow-600 mt-2">{imagePercent}%</span>
                </progress>
              )}
              {imagePercent === 100 && (
                <span className="text-sm font-medium leading-6 text-yellow-600 mt-2">Image Uploaded Successfully!</span>
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
                className="btn btn-primary btn-sm mt-2"
              >
                Change
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              required
              value={formData.price || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
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
              className="inline-block w-full rounded-md bg-yellow-600 px-3.5 py-1.5 text-base font-semibold leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
