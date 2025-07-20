import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element: Element }) => {
  const token = Cookies.get("jwt_token");
  return token ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
