import React from "react";
import { useSelector } from "react-redux";

const BookedItem = ({ booking }) => {
  const { sessionTypes } = useSelector((state) => state.booking);

  const category = sessionTypes.find((type) => type.id === booking.type);
  const categoryTitle = category ? category.title : "Неизвестная";

  return (
    <div className="booked-item">
      <div className="order-info">
        <div>
          <p className="meta-text meta-text-sm" style={{ opacity: 0.5 }}>
            ID: {booking.id}
          </p>
          <h3>{categoryTitle} СЪЁМКА</h3>
        </div>
        <div className="booking-details">
          <div className="detail-row">
            <span className="detail-label">ALL_PHOTOS</span>
            <input
              type="checkbox"
              className="detail-checkbox"
              checked={booking.all_photo}
              disabled={true}
              style={{ cursor: "default" }}
            />
          </div>
          <div className="detail-row">
            <span className="detail-label">PEOPLE</span>
            <span className="detail-value">
              {booking.chosen_count_people}{" "}
              {booking.chosen_count_people === 1 ? "PERSON" : "PERSONS"}
            </span>
          </div>
          {booking.chosen_report_hours && (
            <div className="detail-row">
              <span className="detail-label">REPORT_HOURS</span>
              <span className="detail-value">
                {booking.chosen_report_hours} HOURS
              </span>
            </div>
          )}

          <div className="detail-row price-row">
            <span className="detail-label">PRICE</span>
            <span className="detail-price">{booking.price}</span>
          </div>
        </div>
      </div>
      <div className="meta-text meta-text-sm">
        {booking.chosen_date}
        <br />
        {booking.chosen_time}
      </div>
      <div className="status-badge status-active meta-text-sm">
        {booking.status}
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
