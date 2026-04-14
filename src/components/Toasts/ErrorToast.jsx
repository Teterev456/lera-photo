import React from "react";

const ErrorToast = ({ isVisible, onClose, errorCode }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toast ${isVisible ? "visible" : ""}`}>
      <div className="toast-icon">!</div>
      <div className="toast-content">
        <span className="toast-meta">
          SYSTEM_ALERT // {errorCode || "ERROR_LOGIN"}
        </span>
        <span className="toast-title">
          {errorCode === 401 ? "ОШИБКА АВТОРИЗАЦИИ" : "ОШИБКА"}
        </span>
        <p className="toast-message">
          ВВЕДЕНЫ НЕВЕРНЫЕ ДАННЫЕ. ПОЖАЛУЙСТА, ПОПРОБУЙТЕ СНОВА.
        </p>
        <span
          className="toast-meta"
          style={{ marginTop: "0.5rem", opacity: 0.4 }}
        >
          TS: {new Date().toLocaleTimeString()}
        </span>
        <button className="toast-close" onClick={onClose}>
          [X]
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;
