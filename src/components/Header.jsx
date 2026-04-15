import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useUser } from "../hooks/useUser";
import { logout } from "../redux/slices/authorizationSlice";
import { addToast } from "../redux/slices/toastSlice";
import api from "../services/api";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.post("/logout/", {});
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
      dispatch(
        addToast({
          type: "error",
          errorMessage: "Ошибка при выходе",
          errorCode: error.response?.status || "ERROR",
        })
      );
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
        </>
      )}

      {!loading && user && (
        <>
          <span className="nav-item user-name">{user.username}</span>
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
