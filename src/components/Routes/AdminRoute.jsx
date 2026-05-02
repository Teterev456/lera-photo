import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user, isAdmin, loading } = useSelector(
    (state) => state.authorization
  );

  if (loading) return <div>Загрузка...</div>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
