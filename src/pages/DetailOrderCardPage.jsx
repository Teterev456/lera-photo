import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getBookingById,
  getBookingMessages,
  sendBookingMessage,
  updateBookingNotes,
  updateBookingStatus,
} from "../services/api";
import dayjs from "dayjs";
import { fetchCategories } from "../redux/slices/bookingSlice";

const DetailOrderCardPage = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.authorization);
  const { sessionTypes } = useSelector((state) => state.booking);

  const [booking, setBooking] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [adminNotes, setAdminNotes] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getBookingById(orderId);
        dispatch(fetchCategories());
        setBooking(response.data);
        setStatus(response.data.status);
        setAdminNotes(response.data.manager_comment || "");
      } catch (error) {
        console.error("Ошибка загрузки заказа:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    const fetchMessages = async () => {
      try {
        const res = await getBookingMessages(orderId);
        setMessages(res.data);
      } catch (err) {
        console.error("Ошибка загрузки сообщений:", err);
      }
    };
    fetchMessages();
  }, [orderId, status, dispatch, navigate]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await sendBookingMessage(orderId, newMessage);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  const handleSaveNotes = async () => {
    try {
      await updateBookingNotes(orderId, adminNotes);
      console.log("Notes saved");
    } catch (error) {
      console.error("Ошибка сохранения заметок:", error);
    }
  };

  const changeStatus = async (newStatus) => {
    try {
      await updateBookingStatus(orderId, newStatus);
      setStatus(newStatus.toLowerCase());
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };

  if (loading) return <div className="loading">Загрузка заказа...</div>;
  if (!booking) return <div>Заказ не найден</div>;

  const category = sessionTypes?.find((t) => t.id === booking.type);
  const categoryTitle = category ? category.title : "НЕИЗВЕСТНАЯ";
  const clientName = booking.user_name || booking.user?.username || "Клиент";

  const dayjsDate = dayjs(booking.chosen_date);
  const formatted = dayjsDate.format("DD-MM-YYYY");
  const isDisabled = status === "completed" || status === "cancelled";
  const isConfirmed =
    status === "completed" || status === "cancelled" || status === "confirmed";
  return (
    <div className="page-section">
      <main className="order-main">
        <section className="order-info-panel">
          <div className="panel-header">
            <Link to="/dashboard/" className="back-link">
              ← ВЕРНУТЬСЯ
            </Link>
            <div className="header-row">
              <span className="meta-text">ID: {booking.id}</span>
              <div className={`status-badge ${booking.status.toLowerCase()}`}>
                {status?.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="panel-content">
            <div className="meta-text section-label meta-text-sm">
              [ ДАННЫЕ ]
            </div>
            <div className="detail-row">
              <div className="detail-label">ЛОГИН КЛИЕНТА</div>
              <div className="detail-value">{clientName}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ЭЛ. ПОЧТА</div>
              <div className="detail-value mono">
                {booking.user_email || "не указана"}
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ТИП ФОТОСЕССИИ</div>
              <div className="detail-value">{categoryTitle}</div>
            </div>

            {category && category.id === 2 && (
              <div className="detail-row">
                <div className="detail-label">КОЛ-ВО ЛЮДЕЙ</div>
                <div className="detail-value mono">
                  {booking.chosen_count_people}
                </div>
              </div>
            )}

            {category && category.id === 3 && (
              <div className="detail-row">
                <div className="detail-label">ДЛИТЕЛЬНОСТЬ РЕПОРТАЖА</div>
                <div className="detail-value mono">
                  {booking.chosen_report_hours} ч.
                </div>
              </div>
            )}

            <div className="detail-row">
              <div className="detail-label">ДАТА И ВРЕМЯ</div>
              <div className="detail-value mono">
                {booking.chosen_time} / {formatted}
              </div>
            </div>

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

            <div className="detail-row last">
              <div className="detail-label">СТОИМОСТЬ</div>
              <div className="detail-value price-large">{booking.price} ₽</div>
            </div>
          </div>
        </section>

        <section className="order-chat-panel">
          <div className="panel-header">
            <div className="meta-text section-label meta-text-sm">
              [ СПИСОК СООБЩЕНИЙ ]
            </div>
            <h2 className="panel-title">ЧАТ</h2>
          </div>
          <div className="chat-container">
            <div className="message-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${
                    msg.is_admin ? "msg-admin" : "msg-client"
                  }`}
                >
                  <div className="msg-meta">
                    {msg.author_name}
                    {" // "}
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <div className="chat-input-wrapper">
                <textarea
                  className="chat-textarea"
                  placeholder="Напишите сообщение для клиента..."
                  rows="3"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="chat-send-btn" onClick={handleSendMessage}>
                  ОТПРАВИТЬ
                </button>
              </div>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section className="order-admin-panel">
            <div className="panel-header">
              <div className="meta-text section-label meta-text-sm">
                [ ДОП ФУНКЦИИ ]
              </div>
              <h2 className="panel-title">УПРАВЛЕНИЕ ЗАКАЗОМ</h2>
            </div>
            <div className="panel-content">
              <div className="section-label">Ваши заметки</div>
              <textarea
                className="admin-notes"
                placeholder="Заметки видны только вам..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
              <button className="save-notes-btn" onClick={handleSaveNotes}>
                Сохранить заметку <span>→</span>
              </button>

              <div className="section-label status-actions-label">
                Упраление статусом заказа
              </div>
              <div className="action-group">
                <button
                  disabled={isDisabled}
                  style={{
                    cursor: isDisabled ? "default" : "pointer",
                  }}
                  className={`btn-action ${
                    status === "completed" ? "completed" : ""
                  }`}
                  onClick={() => changeStatus("completed")}
                >
                  ОТМЕТИТЬ КАК ВЫПОЛНЕННЫЙ ЗАКАЗ <span>→</span>
                </button>
                <button
                  disabled={isConfirmed}
                  style={{
                    cursor: isConfirmed ? "default" : "pointer",
                  }}
                  className={`btn-action ${
                    status === "confirmed" ? "confirmed" : ""
                  }`}
                  onClick={() => changeStatus("confirmed")}
                >
                  ОТМЕТИТЬ КАК ПОДТВЕРЖДЁННЫЙ ЗАКАЗ <span>→</span>
                </button>
                <button
                  disabled={isDisabled}
                  style={{
                    cursor: isDisabled ? "default" : "pointer",
                  }}
                  className={`btn-action ${
                    status === "cancelled" ? "danger" : ""
                  }`}
                  onClick={() => changeStatus("cancelled")}
                >
                  ОТМЕНИТЬ ЗАКАЗ <span>×</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DetailOrderCardPage;
