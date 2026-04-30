import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authorizationSlice";
import { addToast } from "../redux/slices/toastSlice";
import api from "../services/api";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useSelector(
    (state) => state.authorization
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.post("/logout/", {});
    } catch (error) {
      console.error("Ошибка при выходе на сервере:", error);
      dispatch(
        addToast({
          type: "error",
          errorMessage: "Ошибка при выходе",
          errorCode: error.response?.status || "ERROR",
        })
      );
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      dispatch(logout());

      navigate("/login");
    }
  };

  const navItems = [
    { id: "/", label: "ГЛАВНАЯ" },
    { id: "/archive", label: "ПОРТФОЛИО" },
    { id: "/contact", label: "КОНТАКТЫ" },
  ];

  return (
    <nav>
      <NavLink to="/" className="nav-item logo">
        <span className="overline">PH</span>LERYA
      </NavLink>

      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.id}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          {item.label}
        </NavLink>
      ))}

      {!loading && user && (
        <>
          <NavLink to="/booking" className="nav-item">
            ОФОРМИТЬ ЗАЯВКУ
          </NavLink>
          <NavLink to="/profile" className="nav-item">
            {user.username}
          </NavLink>
        </>
      )}

      {!loading && user && isAdmin && (
        <>
          <NavLink to="/dashboard" className="nav-item">
            Администрирование
          </NavLink>
        </>
      )}

      {!loading && user && (
        <>
          <NavLink to="#" className="nav-item exit" onClick={handleLogout}>
            ВЫЙТИ
          </NavLink>
        </>
      )}

      {!loading && !user && (
        <NavLink to="/login" className="nav-item">
          ВОЙТИ
        </NavLink>
      )}
    </nav>
  );
};

export default Header;
