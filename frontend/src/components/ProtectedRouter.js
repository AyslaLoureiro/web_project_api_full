import { useContext } from "react"; // Nova importação
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// Remova isLoggedIn das props
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Desestruture isLoggedIn do valor fornecido por AppContext
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    // return <Navigate to="/login" state={{ from: location }} />;
    return <Navigate to="/login" />;
  }

  return children;
}
