import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantSignUp from "./pages/RestaurantSignUp";
import RestaurantHome from "./pages/RestaurantHome";
import RestaurantSignIn from "./pages/RestaurantSignIn";
import Home from "./pages/Home";
import UserSignIn from "./pages/UserSignIn";
import UserProfile from "./pages/UserProfile";
import UserSignUp from "./pages/UserSignUp";
import AddOffers from "./pages/AddOffers";
import SetRestaurantLocation from "./pages/SetRestaurantLocation";
import PrivateRoute from "./components/PrivateRoute";
import RestaurantPrivateRoute from "./components/RestaurantPrivateRoute";
import CreateMenu from "./pages/CreateMenu";
import RestaurantDashboard from "./pages/RestaurantDashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RestaurantPrivateRoute />}>
        <Route path="/restaurant/home" element={<RestaurantHome />} />
        </Route>
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/menu" element={<CreateMenu />}/>
        <Route path="/restaurant/sign-up" element={<RestaurantSignUp />} />
        <Route path="/restaurant/sign-in" element={<RestaurantSignIn />} />
        <Route path="/restaurant/add-offers" element={<AddOffers />} />
        <Route path="/sign-in" element={<UserSignIn />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/restaurant/set-location" element={<SetRestaurantLocation />} />
      </Routes>
    </>
  );
};

export default App;
