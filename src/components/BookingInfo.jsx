import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearInfo,
  setAllPhoto,
  setExtraInfo,
  setPrice,
} from "../redux/slices/bookingSlice";

const BookingInfo = () => {
  const dispatch = useDispatch();

  const {
    chosenType,
    chosenDate,
    chosenTime,
    price,
    chosenReportHours,
    extraInfo,
  } = useSelector((state) => state.booking);

  const [includeAllPhotos, setIncludeAllPhotos] = React.useState(false);
  const [text, setText] = React.useState();

  React.useEffect(() => {
    dispatch(setAllPhoto(includeAllPhotos));
    dispatch(setPrice());
    dispatch(setExtraInfo(text));
  }, [includeAllPhotos, text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chosenType != "РЕПОРТАЖНАЯ") {
      alert(
        `Заказ подтверждён!\nДата: ${chosenDate}\nВремя: ${chosenTime} — ${
          parseInt(chosenTime) + 2
        }:00\nТип фотосессии: ${chosenType}\nСтоимость: ${price} ₽\nВаше сообщение: ${extraInfo}`
      );
    } else {
      alert(
        `Заказ подтверждён!\nДата: ${chosenDate}\nВремя: ${chosenTime} — ${
          (parseInt(chosenTime) + chosenReportHours) % 24
        }:00\nТип фотосессии: ${chosenType}\nСтоимость: ${price} ₽\nВаше сообщение: ${extraInfo}`
      );
    }
    dispatch(clearInfo());
    setText("");
    setIncludeAllPhotos(false);
    dispatch(setPrice());
  };

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
            {(chosenTime === "-" ? "-" : null) ||
              (chosenReportHours > 2 &&
              chosenTime !== "-" &&
              chosenType === "РЕПОРТАЖНАЯ"
                ? `${chosenTime} — ${
                    (parseInt(chosenTime) + chosenReportHours) % 24
                  }:00`
                : `${chosenTime} — ${parseInt(chosenTime) + 2}:00`)}
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
            {price === 0 ? "0 ₽" : `${price} ₽`}
          </p>
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label
              className="meta-text"
              style={{ color: "var(--blue)", fontWeight: "700" }}
            >
              ВАШИ_ПОЖЕЛАНИЯ
            </label>
            <textarea
              rows="5"
              placeholder="Дополнительная информация к фотосессии..."
              required
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              type="submit"
              className="book-btn"
              style={{ marginTop: "2rem" }}
              disabled={
                chosenType === "-" || chosenDate === "-" || chosenTime === "-"
                  ? true
                  : false
              }
            >
              ПОДТВЕРДИТЬ →
            </button>
          </div>
        </form>
      </div>

      <div
        className="meta-text"
        style={{
          opacity: 0.5,
          textAlign: "end",
          marginTop: "3rem",
          marginBottom: "2rem",
        }}
      >
        * ФИНАЛЬНАЯ СТОИМОСТЬ МОЖЕТ ОТЛИЧАТЬСЯ В ЗАВИСИМОСТИ ОТ ВЫБРАННЫХ
        ТРЕБОВАНИЙ
      </div>
    </div>
  );
};

export default BookingInfo;
