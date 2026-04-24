import React from "react";
import { useDispatch } from "react-redux";

import { addToast } from "../redux/slices/toastSlice";

const ContactPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addToast({
        type: "booking",
        bookingId: "MESSAGE_WAS_SENT",
        message: "Ваше сообщение отправлено",
        extraMessage:
          "При необходимости ответ придет на вашу электронную почту",
      })
    );
  };

  return (
    <div className="page-section">
      <div className="contact-container">
        <div className="contact-left panel">
          <div
            className="meta-text"
            style={{ marginBottom: "1rem", color: "var(--blue)" }}
          ></div>
          <h2 className="display-huge-white">ВОПРОСЫ И ПРЕДЛОЖЕНИЯ</h2>
          <p className="meta-text" style={{ opacity: 0.5, marginTop: "2rem" }}>
            ТЕКУЩИЙ_СТАТУС: ПРИЁМ ПРЕДЛОЖЕНИЙ
          </p>

          <div style={{ marginTop: "4rem" }}>
            <div className="info-block">
              <span className="meta-text info-label">РАСПОЛОЖЕНИЕ</span>
              <p className="info-text">РОССИЯ, ПСКОВСКАЯ ОБЛАСТЬ, ПСКОВ</p>
            </div>

            <div className="info-block" style={{ marginTop: "3rem" }}>
              <span className="meta-text info-label">СПОСОБЫ_СВЯЗИ</span>
              <div className="social-links-small">
                <a
                  href="https://www.instagram.com/ph.lerya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-text"
                >
                  ↗ ИНСТАГРАМ
                </a>
                <a
                  href="https://vk.com/phlerya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-text"
                >
                  ↗ ВКОНТАКТЕ
                </a>
                <p>+7 (911) 366-80-71</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div
              className="meta-text"
              style={{ marginBottom: "2rem", color: "var(--blue)" }}
            >
              [ ОТПРАВИТЬ ВОПРОС ]
            </div>

            <div className="input-group">
              <label className="meta-text">ВАШЕ_ПОЛНОЕ_ИМЯ</label>
              <input type="text" placeholder="Введите ваше имя..." required />
            </div>

            <div className="input-group">
              <label className="meta-text">ВАША_ЭЛЕКТРОННАЯ_ПОЧТА</label>
              <input
                type="email"
                placeholder="Введите вашу эл. почту..."
                required
              />
            </div>

            <div className="input-group">
              <label className="meta-text">ТИП_СЪЁМОК</label>
              <select required defaultValue="">
                <option value="" disabled>
                  Выберите тип съёмки...
                </option>
                <option value="INDIVIDUAL">ИНДИВИДУАЛЬНАЯ</option>
                <option value="COLLECTIVE">ГРУППОВАЯ</option>
                <option value="REPORTAGE">РЕПОРТАЖНАЯ</option>
              </select>
            </div>

            <div className="input-group">
              <label className="meta-text">СООБЩЕНИЕ</label>
              <textarea
                rows="5"
                placeholder="Опишите ваше предложение или задайте вопрос..."
                required
              />
            </div>

            <button
              type="submit"
              className="login-submit"
              style={{ marginBottom: 0 }}
            >
              ОТПРАВИТЬ →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
