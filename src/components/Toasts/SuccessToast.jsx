import React from "react";

const SuccessToast = ({
  isVisible,
  onClose,
  bookingId,
  message,
  extraMessage,
}) => {
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
        <span className="toast-title">{message}</span>
        <p className="toast-message">
          ID: #{bookingId || "LR-92104"} <br />
          {extraMessage}
        </p>
        <button className="toast-close" onClick={onClose}>
          CLOSE[X]
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;
