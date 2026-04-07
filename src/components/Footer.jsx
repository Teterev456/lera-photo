import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer panel">
      <Link to="/" className="footer-logo">
        <span className="overline">PH</span>LERYA
      </Link>
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
