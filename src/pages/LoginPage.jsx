import React, { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("ВХОД");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Logged in successfully!");
  };

  return (
    <div className="page-section">
      <div className="login-container">
        <div className="login-left panel">
          <div
            className="meta-text"
            style={{ marginBottom: "1rem", color: "var(--blue)" }}
          >
            [ ВХОД НА САЙТ ]
          </div>
          <h2
            className="display-huge"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", marginBottom: "2rem" }}
          >
            ПРОФИЛЬ
            <br />
            КЛИЕНТА
          </h2>
          <p
            className="meta-text"
            style={{ maxWidth: "300px", lineHeight: 1.6 }}
          >
            ДАЁТ ДОСТУП К ОФОРМЛЕНИЮ ЗАКАЗА И ЧАТУ С ФОТОГРАФОМ.
          </p>
        </div>

        <div className="login-right panel">
          <div className="login-form">
            <div className="login-tabs">
              {["ВХОД", "РЕГИСТРАЦИЯ"].map((tab) => (
                <button
                  key={tab}
                  className={`login-tab ${activeTab === tab ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="meta-text">ЭЛЕКТРОННАЯ_ПОЧТА</label>
                <input type="email" placeholder="client@example.com" required />
              </div>
              <div className="input-group">
                <label className="meta-text">ПАРОЛЬ</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="login-submit">
                ВХОД →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
