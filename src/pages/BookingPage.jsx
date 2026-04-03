import React, { useState } from "react";

const BookingPage = () => {
  const [sessionType, setSessionType] = useState("ИНДИВИДУАЛЬНАЯ");
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("13:00");

  const sessionTypes = ["ИНДИВИДУАЛЬНАЯ", "ГРУППОВАЯ", "РЕПОРТАЖНАЯ"];
  const timeSlots = ["10:00", "13:00", "16:00", "19:00"];

  // Calendar data - October 2024
  const days = [
    { day: "30", status: "disabled" },
    { day: "1", status: "available" },
    { day: "2", status: "" },
    { day: "3", status: "available" },
    { day: "4", status: "" },
    { day: "5", status: "" },
    { day: "6", status: "available" },
    { day: "7", status: "" },
    { day: "8", status: "available" },
    { day: "9", status: "" },
    { day: "10", status: "booked" },
    { day: "11", status: "" },
    { day: "12", status: "" },
    { day: "13", status: "available" },
    { day: "14", status: "" },
    { day: "15", status: "available" },
    { day: "16", status: "" },
    { day: "17", status: "" },
    { day: "18", status: "available" },
    { day: "19", status: "" },
    { day: "20", status: "booked" },
    { day: "21", status: "booked" },
    { day: "22", status: "" },
    { day: "23", status: "available" },
    { day: "24", status: "" },
    { day: "25", status: "" },
    { day: "26", status: "available" },
    { day: "27", status: "" },
    { day: "28", status: "booked" },
    { day: "29", status: "" },
    { day: "30", status: "" },
    { day: "31", status: "available" },
  ];

  const handleBooking = () => {
    alert(
      `Booking confirmed!\nDate: ${selectedDate} OCTOBER 2024\nTime: ${selectedTime} — ${
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

          <div className="form-group">
            <label className="meta-text">ВЫБОР_ДАТЫ</label>
            <div className="calendar-grid">
              <div className="calendar-header meta-text">
                <span>◄</span>
                <span>МАРТ 2026</span>
                <span>►</span>
              </div>
              <div className="calendar-days">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <div key={d} className="day-label meta-text">
                    {d}
                  </div>
                ))}
                {days.map((item, idx) => (
                  <div
                    key={idx}
                    className={`day ${item.status} ${
                      selectedDate === item.day && item.status === "available"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      item.status === "available" && setSelectedDate(item.day)
                    }
                  >
                    {item.day}
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              <p className="info-text">{selectedDate} МАРТ 2026</p>
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
