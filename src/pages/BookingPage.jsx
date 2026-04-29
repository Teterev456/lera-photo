import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  fetchCategories,
  setPrice,
  setTime,
  setType,
} from "../redux/slices/bookingSlice";
import BookingCalendar from "../components/BookingCalendar";
import Counter from "../components/Counter";
import BookingInfo from "../components/BookingInfo";

const BookingPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authorization);
  const { sessionTypes, chosenTypeId, loading, chosenTime, timeSlots } =
    useSelector((state) => state.booking);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div className="page-section">Загрузка типов съёмки...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-section">
      <div className="panel portfolio-header">
        <h2 className="display-medium overline" style={{ lineHeight: "70px" }}>
          БРОНЬ ФОТОСЕССИИ
        </h2>
        <div className="meta-text">ВЫБЕРИТЕ ДАТУ И ТИП СЪЁМКИ</div>
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
              {sessionTypes && sessionTypes.length > 0 ? (
                sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`session-btn ${
                      chosenTypeId === type.id ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => {
                      dispatch(setType(type.id));
                      dispatch(setPrice());
                    }}
                  >
                    {type.title}
                  </button>
                ))
              ) : (
                <div>Нет доступных категорий</div>
              )}
            </div>

            <div
              className="meta-text"
              style={{ opacity: 0.5, fontSize: "0.9rem", marginTop: 15 }}
            >
              * СТУДИЯ ОПЛАЧИВАЕТСЯ ОТДЕЛЬНО
            </div>
          </div>

          {chosenTypeId === 2 ? <Counter title={"КОЛИЧЕСТВО_ЛЮДЕЙ"} /> : null}

          {chosenTypeId === 3 ? (
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
