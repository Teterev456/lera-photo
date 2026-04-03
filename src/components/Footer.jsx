import React from "react";

const Footer = ({ setPage }) => {
  return (
    <footer className="site-footer panel">
      <a
        href="#"
        className="footer-logo"
        onClick={(e) => {
          e.preventDefault();
          setPage("index");
        }}
      >
        <span className="overline">PH</span>LERYA
      </a>
      <div className="footer-links">
        <a
          href="https://www.instagram.com/ph.lerya"
          target="_blank"
          rel="noopener noreferrer"
        >
          ↗ ИНСТАГРАМ
        </a>
        <a
          href="https://vk.com/phlerya"
          target="_blank"
          rel="noopener noreferrer"
        >
          ↗ ВКОНТАКТЕ
        </a>
        <p>+7 (911) 366-80-71</p>
      </div>
      <div className="footer-copy meta-text">© 2026 Лера | Фото в Пскове.</div>
    </footer>
  );
};

export default Footer;
