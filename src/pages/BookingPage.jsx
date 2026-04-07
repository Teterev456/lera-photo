import React from "react";
import BookingCalendar from "../components/BookingCalendar";
import Counter from "../components/Counter";
import { useDispatch, useSelector } from "react-redux";
import {
  clearInfo,
  setAllPhoto,
  setPrice,
  setTime,
  setType,
} from "../redux/slices/bookingSlice";
import BookingInfo from "../components/BookingInfo";

const BookingPage = () => {
  const dispatch = useDispatch();

  const {
    chosenType,
    chosenDate,
    chosenTime,
    price,
    sessionTypes,
    timeSlots,
    chosenReportHours,
  } = useSelector((state) => state.booking);

  const [includeAllPhotos, setIncludeAllPhotos] = React.useState(false);

  React.useEffect(() => {
    dispatch(setAllPhoto(includeAllPhotos));
    dispatch(setPrice());
  }, [includeAllPhotos]);

  const handleBooking = () => {
    if (chosenType != "РЕПОРТАЖНАЯ") {
      alert(
        `Booking confirmed!\nDate: ${chosenDate}\nTime: ${chosenTime} — ${
          parseInt(chosenTime) + 2
        }:00\nType: ${chosenType}\nPrice: ${price * 10}00 ₽`
      );
    } else {
      alert(
        `Booking confirmed!\nDate: ${chosenDate}\nTime: ${chosenTime} — ${
          (parseInt(chosenTime) + chosenReportHours) % 24
        }:00\nType: ${chosenType}\nPrice: ${price * 10}00 ₽`
      );
    }

    dispatch(clearInfo());
    dispatch(setPrice());
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
            <Counter title={"ДЛИТЕЛЬНОСТЬ_СЪЁМКИ_В_ЧАСАХ"} />
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

          <div className="form-group checkbox-group">
            <label className="checkbox-label booking-checkbox">
              <input
                type="checkbox"
                checked={includeAllPhotos}
                onChange={(e) => {
                  setIncludeAllPhotos(e.target.checked);
                }}
              />
              <span className="meta-text" style={{ opacity: 1 }}>
                ПОЛУЧИТЬ ВСЕ ИСХОДНЫЕ ИЗОБРАЖЕНИЯ
              </span>
            </label>
            <p
              className="meta-text"
              style={{ marginTop: "0.5rem", opacity: 0.5, fontSize: "0.9rem" }}
            >
              + 1,000 ₽ — Исходные фотографии в полном объеме оплачиваются
              дополнительно
            </p>
          </div>

          <button
            className="book-btn"
            disabled={
              chosenType === "-" || chosenDate === "-" || chosenTime === "-"
                ? true
                : false
            }
            onClick={handleBooking}
          >
            ПОДТВЕРДИТЬ →
          </button>
        </div>

        <BookingInfo />
      </div>
    </div>
  );
};

export default BookingPage;
