import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { setUser } from "../redux/slices/authorizationSlice";
import { login, register } from "../services/api";
import { addToast } from "../redux/slices/toastSlice";
import { getCurrentUser } from "../services/api";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState("ВХОД");
  const [username1, setUsername1] = React.useState("");
  const [email1, setEmail1] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [repeatPass, setRepeatPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useSelector((state) => state.authorization);

  React.useEffect(() => {
    setUsername1("");
    setEmail1("");
    setPassword1("");
    setPassword2("");
  }, [activeTab]);

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (repeatPass && password1 !== password2) {
      dispatch(
        addToast({
          type: "error",
          errorMessage: "Пароли не совпадают",
          errorCode: "PASSWORD_MISMATCH",
        })
      );
      setIsLoading(false);
      return;
    }

    try {
      if (repeatPass) {
        await register({
          username: username1,
          password: password1,
          email: email1,
        });
        const loginResponse = await login({
          username: username1,
          password: password1,
        });
        localStorage.setItem("access_token", loginResponse.data.access);
        localStorage.setItem("refresh_token", loginResponse.data.refresh);

        const userResponse = await getCurrentUser();
        localStorage.setItem("user", JSON.stringify(userResponse.data.user));

        dispatch(setUser(userResponse.data));

        setEmail1("");
        setUsername1("");
        setPassword1("");
        setPassword2("");

        navigate("/");
      } else {
        const loginResponse = await login({
          username: username1,
          password: password1,
        });
        localStorage.setItem("access_token", loginResponse.data.access);
        localStorage.setItem("refresh_token", loginResponse.data.refresh);

        const userResponse = await getCurrentUser();
        localStorage.setItem("user", JSON.stringify(userResponse.data.user));

        dispatch(setUser(userResponse.data));

        setUsername1("");
        setPassword1("");

        navigate("/");
      }
    } catch (error) {
      let errorMessage = "Неизвестная ошибка";
      if (error.response) {
        errorMessage = error.response.data?.detail || error.response.statusText;
      } else if (error.request) {
        errorMessage = "Нет ответа от сервера. Проверьте подключение.";
      } else {
        errorMessage = error.message;
      }

      dispatch(
        addToast({
          type: "error",
          errorMessage: errorMessage,
          errorCode: error.response?.status || "ERROR",
        })
      );
    } finally {
      setIsLoading(false);
    }
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
            className="display-huge-black"
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
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    setActiveTab(tab);
                    setRepeatPassword(tab === "РЕГИСТРАЦИЯ");
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="meta-text">ЛОГИН</label>
                <input
                  type="text"
                  placeholder="Client"
                  required
                  value={username1}
                  onChange={(e) => setUsername1(e.target.value)}
                />
              </div>

              {repeatPass && (
                <div className="input-group">
                  <label className="meta-text">ЭЛЕКТРОННАЯ_ПОЧТА</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    required
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                  />
                </div>
              )}

              <div className="input-group">
                <label className="meta-text">ПАРОЛЬ</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>

              {repeatPass && (
                <div className="input-group">
                  <label className="meta-text">ПОВТОРИТЕ ПАРОЛЬ</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={isLoading}
              >
                {isLoading
                  ? "ЗАГРУЗКА..."
                  : repeatPass
                  ? "РЕГИСТРАЦИЯ →"
                  : "ВХОД →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
