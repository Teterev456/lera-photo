import React from "react";

const Header = ({ currentPage, setPage }) => {
  const navItems = [
    { id: "index", label: "ГЛАВНАЯ" },
    { id: "archive", label: "ПОРТФОЛИО" },
    { id: "booking", label: "ОФОРМИТЬ ЗАЯВКУ" },
    { id: "contact", label: "КОНТАКТЫ" },
    { id: "login", label: "ВОЙТИ" },
  ];

  return (
    <nav>
      <a
        href="#"
        className="nav-item logo"
        onClick={(e) => {
          e.preventDefault();
          setPage("index");
        }}
      >
        <span className="overline">PH</span>LERYA
      </a>
      {navItems.map((item) => (
        <a
          key={item.id}
          href="#"
          className={`nav-item ${currentPage === item.id ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setPage(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Header;
