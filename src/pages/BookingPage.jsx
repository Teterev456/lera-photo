import React from "react";
import BookingCalendar from "../components/BookingCalendar";
import Counter from "../components/Counter";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setPrice, setTime, setType } from "../redux/slices/bookingSlice";
import BookingInfo from "../components/BookingInfo";

const BookingPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authorization);
  const { chosenType, chosenTime, sessionTypes, timeSlots } = useSelector(
    (state) => state.booking
  );

  if (!user) {
    return <Navigate to="/*" replace />;
  }

  return (
    <div className="page-section">
      <div className="panel portfolio-header">
        <h2 className="display-medium overline">БРОНЬ ФОТОСЕССИИ</h2>
        <div className="meta-text">ВЫБЕРИТЕ ДАТУ И ТИП_СЪЁМКИ</div>
      </div>

      <div className="booking-container">
        <div className="booking-form panel">
          <div
            className="meta-text"
            style={{ marginBottom: "2rem", color: "var(--blue)" }}
          >
            [ ЗАБРОНИРУЙТЕ ВАШИ СЪЁМКИ ПРЯМО СЕЙЧАС ]
          </div>

          <div className="form-group">
            <label className="meta-text">ТИП_СЪЁМОК</label>
            <div className="session-options">
              {sessionTypes.map((type) => (
                <button
                  key={type}
                  className={`session-btn ${
                    chosenType === type ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    dispatch(setType(type));
                    dispatch(setPrice());
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <div
              className="meta-text"
              style={{ opacity: 0.5, fontSize: "0.9rem", marginTop: 15 }}
            >
              * СТУДИЯ ОПЛАЧИВАЕТСЯ ОТДЕЛЬНО
            </div>
          </div>

          {chosenType === "ГРУППОВАЯ" ? (
            <Counter title={"КОЛИЧЕСТВО_ЛЮДЕЙ"} />
          ) : null}

          {chosenType === "РЕПОРТАЖНАЯ" ? (
            <Counter title={"ДЛИТЕЛЬНОСТЬ_СЪЁМОК_В_ЧАСАХ"} />
          ) : null}

          <BookingCalendar />

          <div className="form-group">
            <label className="meta-text">ВРЕМЯ</label>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${chosenTime === time ? "active" : ""}`}
                  type="button"
                  onClick={() => dispatch(setTime(time))}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <BookingInfo />
      </div>
    </div>
  );
};

export default BookingPage;
