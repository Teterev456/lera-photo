import React from "react";
import { useDispatch } from "react-redux";

import { addToast } from "../redux/slices/toastSlice";
import { sendContactMessage } from "../services/api";

const ContactPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendContactMessage(formData);
      dispatch(
        addToast({
          type: "success",
          bookingId: "MESSAGE_WAS_SENT",
          message: "Ваше сообщение отправлено",
          extraMessage:
            "При необходимости ответ придет на вашу электронную почту",
        })
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          errorMessage: "Ошибка отправки. Попробуйте позже.",
          errorCode: error,
        })
      );
    } finally {
      setIsSending(false);
    }
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
                <p className="meta-text">+7 (911) 366-80-71</p>
              </div>
              <p
                className="meta-text "
                style={{ opacity: 0.5, marginTop: "0.5rem", fontSize: "16px" }}
              >
                НОМЕР ТЕЛЕФОНА ДЛЯ СВЯЗИ В МЕССЕНДЖЕРАХ
              </p>
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
              <label className="meta-text">ВАШЕ_ИМЯ</label>
              <input
                type="text"
                name="name"
                minLength={2}
                maxLength={100}
                value={formData.name}
                placeholder="Введите ваше имя..."
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="meta-text">ВАША_ЭЛЕКТРОННАЯ_ПОЧТА</label>
              <input
                type="email"
                name="email"
                maxLength={254}
                value={formData.email}
                placeholder="Введите вашу эл. почту..."
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="meta-text">СООБЩЕНИЕ</label>
              <textarea
                rows="5"
                name="message"
                minLength={20}
                maxLength={2000}
                style={{ maxHeight: "660px" }}
                value={formData.message}
                placeholder="Опишите ваше предложение или задайте вопрос..."
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-submit"
              style={{ marginBottom: 0 }}
              disabled={isSending}
            >
              {isSending ? "ОТПРАВКА..." : "ОТПРАВИТЬ →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
