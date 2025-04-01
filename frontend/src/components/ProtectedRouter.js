import { useContext } from "react"; // Nova importação
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// Remova isLoggedIn das props
export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  // Desestruture isLoggedIn do valor fornecido por AppContext
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
