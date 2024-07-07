import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantSignUp from "./pages/RestaurantSignUp";
import DeleteRestaurant from "./pages/DeleteRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import RestaurantHome from "./pages/RestaurantHome";
import RestaurantSignIn from "./pages/RestaurantSignIn";
import Home from "./pages/Home";
import ShowRestaurant from "./pages/ShowRestaurant";
import UserSignIn from "./pages/UserSignIn";
import UserProfile from "./pages/UserProfile";
import UserSignUp from "./pages/UserSignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/home" element={<RestaurantHome />} />
        <Route path="/restaurant/sign-up" element={<RestaurantSignUp />} />
        <Route path="/restaurant/sign-in" element={<RestaurantSignIn />} />
        <Route path="/restaurant/details/:id" element={<ShowRestaurant />} />
        <Route path="/restaurant/edit/:id" element={<EditRestaurant />} />
        <Route path="/restaurant/delete/:id" element={<DeleteRestaurant />} />
        <Route path="/sign-in" element={<UserSignIn />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
