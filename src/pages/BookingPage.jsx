import React, { useState } from "react";
import BookingCalendar from "../components/BookingCalendar";

const BookingPage = () => {
  const [sessionType, setSessionType] = useState("ИНДИВИДУАЛЬНАЯ");
  const [selectedDate, setSelectedDate] = useState("7");
  const [selectedTime, setSelectedTime] = useState("13:00");

  const sessionTypes = ["ИНДИВИДУАЛЬНАЯ", "ГРУППОВАЯ", "РЕПОРТАЖНАЯ"];
  const timeSlots = ["9:00", "13:00", "17:00", "20:00"];

  const handleBooking = () => {
    alert(
      `Booking confirmed!\nDate: ${selectedDate} April 2026\nTime: ${selectedTime} — ${
        parseInt(selectedTime) + 2
      }:00\nType: ${sessionType}`
    );
  };

  return (
    <div className="page-section">
      <div className="panel portfolio-header">
        <h2 className="display-medium overline">БРОНЬ_ФОТОСЕССИИ</h2>
        <div className="meta-text">ВЫБЕРИТЕ ДАТУ И ТИП_СЪЁМКИ</div>
      </div>

      <div className="booking-container">
        <div className="booking-form panel">
          <div
            className="meta-text"
            style={{ marginBottom: "2rem", color: "var(--blue)" }}
          >
            [ ЗАБРОНИРУЙТЕ ВАШИ СЪЁМКИ СЕЙЧАС ]
          </div>

          <div className="form-group">
            <label className="meta-text">ТИП_СЪЁМОК</label>
            <div className="session-options">
              {sessionTypes.map((type) => (
                <button
                  key={type}
                  className={`session-btn ${
                    sessionType === type ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setSessionType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <BookingCalendar />

          <div className="form-group">
            <label className="meta-text">ВРЕМЯ</label>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${
                    selectedTime === time ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button className="book-btn" onClick={handleBooking}>
            ПОДТВЕРДИТЬ →
          </button>
        </div>

        <div className="booking-info panel">
          <div>
            <div
              className="meta-text"
              style={{ marginBottom: "1rem", color: "var(--blue)" }}
            >
              [ ИНФОРМАЦИЯ О БРОНИ ]
            </div>
            <h3
              className="display-medium"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              ВАША
              <br />
              ФОТОСЕССИЯ
            </h3>

            <div className="info-block">
              <span className="meta-text info-label">ДАТА</span>
              <p className="info-text">{selectedDate} АПРЕЛЬ 2026</p>
            </div>
            <div className="info-block">
              <span className="meta-text info-label">ВРЕМЯ</span>
              <p className="info-text">
                {selectedTime} — {parseInt(selectedTime) + 2}:00
              </p>
            </div>
            <div className="info-block">
              <span className="meta-text info-label">ТИП</span>
              <p className="info-text">{sessionType} СЪЁМКА</p>
            </div>
            <div className="info-block">
              <span className="meta-text info-label">МЕСТОПОЛОЖЕНИЕ</span>
              <p className="info-text">РОССИЯ, ПСКОВСКАЯ ОБЛАСТЬ, ПСКОВ</p>
            </div>
            <div
              className="info-block"
              style={{
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--gray)",
              }}
            >
              <span className="meta-text info-label">СТОИМОСТЬ_СЪЁМОК</span>
              <p
                className="info-text"
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--blue)",
                }}
              >
                5,000 ₽
              </p>
            </div>
          </div>

          <div className="meta-text" style={{ opacity: 0.5 }}>
            * ФИНАЛЬНАЯ СТОИМОСТЬ МОЖЕТ ОТЛИЧАТЬСЯ В ЗАВИСИМОСТИ ОТ ТРЕБОВАНИЙ
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
