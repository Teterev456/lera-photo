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
        <span className="toast-title">BOOKING_CONFIRMED_OK</span>
        <p className="toast-message">
          Transaction ID: #{bookingId || "LR-92104"}
        </p>
        <button className="toast-close" onClick={onClose}>
          CLOSE[X]
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessToast;
