import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../services/api";
import { setUser, clearUser } from "../redux/slices/authorizationSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authorization.user);
  const loading = useSelector((state) => state.authorization.loading);
  const error = useSelector((state) => state.authorization.error);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: "authorization/setLoading", payload: true });
        const response = await getCurrentUser();
        dispatch(setUser(response.data));
      } catch (err) {
        dispatch(clearUser());
      } finally {
        dispatch({ type: "authorization/setLoading", payload: false });
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  return { user, loading, error };
};
