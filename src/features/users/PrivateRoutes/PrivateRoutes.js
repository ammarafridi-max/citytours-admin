import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

export default function PrivateRoutes({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the user state
  }

  return user ? children : <Navigate to="/login" />;
}
