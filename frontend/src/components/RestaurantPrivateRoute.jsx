import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function RestaurantPrivateRoute() {
    const {currentRestaurant} = useSelector((state) => state.restaurant)
  return (
    currentRestaurant ? <Outlet /> : <Navigate to="/restaurant/sign-in" />
  )
}
