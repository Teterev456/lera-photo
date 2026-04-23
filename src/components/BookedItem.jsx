import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import BookedItemMessage from "./BookedItemMessage";
import { fetchMessages, postMessage } from "../redux/slices/chatSlice";

const selectMessages = createSelector(
  (state) => state.chat.entities,
  (_, bookingId) => bookingId,
  (entities, bookingId) => {
    const msgs = entities[bookingId];
    return Array.isArray(msgs) ? msgs : [];
  }
);

const BookedItem = ({ booking }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const messages = useSelector((state) => selectMessages(state, booking.id));
  const { loading } = useSelector((state) => state.chat);
  const { sessionTypes } = useSelector((state) => state.booking);

  const bookingId = booking.id;
  React.useEffect(() => {
    if (bookingId) {
      dispatch(fetchMessages(bookingId));
    }
  }, [bookingId, dispatch]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;
    setIsSending(true);
    try {
      await dispatch(postMessage({ bookingId: booking.id, text: newMessage }));
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    } finally {
      setIsSending(false);
    }
  };

  const category = sessionTypes?.find((type) => type.id === booking.type);
  const categoryTitle = category ? category.title : "НЕИЗВЕСТНАЯ";
  const isChatDisabled =
    booking.status.toLowerCase() === "cancelled" ||
    booking.status.toLowerCase() === "completed";

  if (loading && !messages.length) return <div>Загрузка сообщений...</div>;

  return (
    <div
      className="booked-item"
      style={{
        opacity: isChatDisabled ? 0.4 : 1,
      }}
    >
      <div className="order-info">
        <div>
          <p className="meta-text meta-text-sm" style={{ opacity: 0.5 }}>
            ID: {booking.id}
          </p>
          <h3>{categoryTitle} СЪЁМКА</h3>
        </div>
        <div className="booking-details">
          <div className="detail-row">
            <span className="detail-label">ИСХОДНИКИ ФОТОГРАФИЙ:</span>
            <input
              type="checkbox"
              className="detail-checkbox"
              checked={booking.all_photo}
              disabled={true}
              style={{ cursor: "default" }}
            />
          </div>

          {category && category.id === 2 && (
            <div className="detail-row">
              <span className="detail-label">КОЛИЧЕСТВО ЛЮДЕЙ:</span>
              <span className="detail-value">
                {booking.chosen_count_people}
              </span>
            </div>
          )}

          {category && category.id === 3 && (
            <div className="detail-row">
              <span className="detail-label">
                ДЛИТЕЛЬНОСТЬ РЕПОРТАЖНОЙ СЪЁМКИ:
              </span>
              <span className="detail-value">
                {booking.chosen_report_hours} ч.
              </span>
            </div>
          )}

          <div className="detail-row price-row">
            <span className="detail-label">СТОИМОТЬ</span>
            <span className="detail-price">{booking.price}</span>
          </div>
        </div>
      </div>
      <div className="meta-text" style={{ fontSize: "14px" }}>
        {booking.chosen_date}
        <br />
        {booking.chosen_time}
      </div>
      <span className={`status-badge ${booking.status.toLowerCase()}`}>
        {booking.status}
      </span>

      <div className="chat-section">
        <div className="extra-info">{booking.extra_info}</div>
        <div className="messages-container">
          {messages.map((msg) => (
            <BookedItemMessage key={msg.id} msg={msg} />
          ))}
        </div>
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
            placeholder={
              isChatDisabled ? "Чат закрыт" : "Написать сообщение..."
            }
            onKeyDown={(e) =>
              !isChatDisabled && e.key === "Enter" && handleSend()
            }
            disabled={isChatDisabled}
          />
          <button
            onClick={handleSend}
            className="send-btn meta-text-sm"
            disabled={isSending || isChatDisabled}
            style={{
              cursor: isChatDisabled ? "default" : "pointer",
            }}
          >
            ОТПРАВИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookedItem;
