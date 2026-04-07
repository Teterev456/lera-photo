import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BookingInfo = () => {
  const dispatch = useDispatch();

  const { chosenType, chosenDate, chosenTime, price } = useSelector(
    (state) => state.booking
  );

  return (
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
          <p className="info-text">{chosenDate}</p>
        </div>
        <div className="info-block">
          <span className="meta-text info-label">ВРЕМЯ</span>
          <p className="info-text">
            {chosenTime === "-"
              ? "-"
              : `${chosenTime} — ${parseInt(chosenTime) + 2}:00`}
          </p>
        </div>
        <div className="info-block">
          <span className="meta-text info-label">ТИП</span>
          <p className="info-text">
            {chosenType === "-" ? "-" : `${chosenType} СЪЁМКА`}{" "}
          </p>
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
            {price === 0 ? "0 ₽" : `${price * 10}00 ₽`}
          </p>
        </div>
      </div>

      <div className="meta-text" style={{ opacity: 0.5 }}>
        * ФИНАЛЬНАЯ СТОИМОСТЬ МОЖЕТ ОТЛИЧАТЬСЯ В ЗАВИСИМОСТИ ОТ ВЫБРАННЫХ
        ТРЕБОВАНИЙ
      </div>
    </div>
  );
};

export default BookingInfo;
