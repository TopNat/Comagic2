import { Navigate } from "react-router-dom";
import { useDataStore } from "../../store/context";

const ProtectedRoute = ({ children }: any) => {
  const store = useDataStore();
  let isAllowed = store.users.isAutorization;

  if (!isAllowed) {
    return <Navigate to="/entr" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
