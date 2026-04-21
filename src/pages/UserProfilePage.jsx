import React from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import BookedItem from "../components/BookedItem";
import { fetchUserBookings } from "../redux/slices/profileSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const { userBookings, loading } = useSelector((state) => state.profile);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return <div>Загрузка заказов...</div>;

  const date = dayjs(new Date());
  const dateStr = date.format("DD:MM:YYYY");
  return (
    <div className="page-section">
      <div className="content-container-profile">
        <section className="section-left">
          <div
            className="system-alert meta-text meta-text-sm"
            style={{ color: "var(--white)" }}
          >
            SYS_USER // EDIT_MODE
            <br />
            AUTH: GRANTED
          </div>
          <div className="crosshair ch-tr"></div>

          <h1 className="display-huge-white" style={{ marginTop: "15px" }}>
            ПРОФИЛЬ
            <br />
            КЛИЕНТА
          </h1>

          <form style={{ maxWidth: 400 }}>
            <div className="profile-form-group">
              <label
                className="profile-form-label meta-text-sm"
                style={{ marginTop: "25px" }}
              >
                01_ИМЯ_ПОЛЬЗОВАТЕЛЯ
              </label>
              <input
                type="text"
                className="profile-form-input"
                defaultValue="ALEXANDER VORONOV"
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label meta-text-sm">
                02_АДРЕС_ЭЛЕКТРОННОЙ_ПОЧТЫ
              </label>
              <input
                type="email"
                className="profile-form-input"
                defaultValue="A.VORONOV@SYSTEM.NET"
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label meta-text-sm">
                03_НОМЕР_ТЕЛЕФОНА
              </label>
              <input
                type="text"
                className="profile-form-input"
                defaultValue="+7 999 034-12-89"
              />
            </div>
            <button type="submit" className="save-btn">
              СОХРАНИТЬ
            </button>
          </form>
        </section>

        <section className="section-right">
          <div className="bookings-pane">
            <span className="meta-text section-label meta-text-sm">
              [ АКТИВНЫЕ_ЗАКАЗЫ ]
            </span>
            <h2 className="section-title">ВАШИ_СЪЁМКИ</h2>

            <div className="booking-list">
              {userBookings.length === 0 ? (
                <p>У вас пока нет заказов.</p>
              ) : (
                userBookings.map((booking) => <BookedItem key={booking.id} />)
              )}
            </div>
          </div>

          <div className="error-footer">
            <span
              className="meta-text"
              style={{
                opacity: 0.4,
                fontSize: 18,
              }}
            >
              SYS_DATE // {dateStr}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;
