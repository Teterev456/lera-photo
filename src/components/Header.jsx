import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navItems = [
    { id: "/", label: "ГЛАВНАЯ" },
    { id: "/archive", label: "ПОРТФОЛИО" },
    { id: "/booking", label: "ОФОРМИТЬ ЗАЯВКУ" },
    { id: "/contact", label: "КОНТАКТЫ" },
    { id: "/login", label: "ВОЙТИ" },
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
    </nav>
  );
};

export default Header;
