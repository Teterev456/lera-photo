import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const date = dayjs(new Date());
  const dateStr = date.format("DD:MM:YYYY");
  return (
    <main className="error-container">
      <section className="error-left">
        <div
          className="system-alert meta-text"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--white)",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          SYS_ERROR // 0x404
          <br />
          STATUS: DISCONNECTED
        </div>
        <div className="crosshair ch-tr"></div>
        <h1 className="display-huge">
          404
          <br />
          NOT
          <br />
          FOUND
        </h1>
      </section>

      <section className="error-right">
        <div className="error-details">
          <span
            className="meta-text"
            style={{ color: "var(--blue)", marginBottom: "1rem" }}
          >
            [ КРИТИЧЕСКАЯ_ОЩИБКА ]
          </span>
          <h2 className="glitch-text" style={{ fontSize: "3rem" }}>
            СТРАНИЦА НЕ НАЙДЕНА
          </h2>
          <p
            className="meta-text"
            style={{ maxWidth: "800px", lineHeight: 1.8, opacity: 0.7 }}
          >
            У ВАС НЕТ ДОСТУПА К ДАННОЙ СТРАНИЦЕ ЛИБО ОНА НЕ СУЩЕСТВУЕТ.
            ПОПРОБУЙТЕ ВОЙТИ В АККАУНТ ЛИБО ЗАРЕГИСТРИРОВАТЬСЯ.
          </p>

          <Link to="/" className="return-btn">
            ВЕРНУТЬСЯ_НА_ГЛАВНУЮ →
          </Link>
        </div>

        <div className="error-footer">
          <span
            className="meta-text"
            style={{
              opacity: 0.4,
            }}
          >
            SYS_DATE // {dateStr}
          </span>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
