import React from "react";

const BookingSuccessToast = ({ isVisible, onClose, bookingId }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toast ${isVisible ? "visible" : ""}`}>
      <div className="toast-icon">✓</div>
      <div className="toast-content">
        <span className="toast-meta">SYSTEM_MESSAGE // SUCCESS</span>
        <span className="toast-title">СЪЁМКА_ЗАБРОНИРОВАНА</span>
        <p className="toast-message">
          ID: #{bookingId || "LR-92104"} <br />
          Ознакомиться с заявкой вы можете в профиле.
        </p>
        <button className="toast-close" onClick={onClose}>
          CLOSE[X]
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessToast;
