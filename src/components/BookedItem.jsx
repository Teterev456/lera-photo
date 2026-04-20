import React from "react";

const BookedItem = () => {
  return (
    <div className="booked-item">
      <div className="booked-content">
        <div>
          <p className="meta-text meta-text-sm" style={{ opacity: 0.5 }}>
            ID: BK_2901
          </p>
          <h3>ST. PETERSBURG // INDUSTRIAL</h3>
        </div>
        <div className="meta-text meta-text-sm">
          12.NOV.24
          <br />
          14:00 GMT+3
        </div>
        <div className="status-badge status-active meta-text-sm">CONFIRMED</div>
      </div>
      <div className="chat-section">
        <div className="chat-history">
          <div className="chat-message">
            <span className="chat-meta meta-text-sm">ADMIN &gt;</span> Booking
            confirmed. Upload materials ready.
          </div>
          <div className="chat-message">
            <span className="chat-meta meta-text-sm">USER &gt;</span> Thanks.
            Will arrive at 13:45.
          </div>
          <div className="chat-message">
            <span className="chat-meta meta-text-sm">ADMIN &gt;</span> Access
            code updated: 8921.
          </div>
        </div>
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type message..."
          />
          <button className="send-btn meta-text-sm">Send</button>
        </div>
      </div>
    </div>
  );
};

export default BookedItem;
