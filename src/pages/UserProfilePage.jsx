import React from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import BookedItem from "../components/BookedItem";
import { fetchUserBookings } from "../redux/slices/profileSlice";
import { fetchCategories } from "../redux/slices/bookingSlice";
import { setUser } from "../redux/slices/authorizationSlice";
import { addToast } from "../redux/slices/toastSlice";
import { updateUserProfile } from "../services/api";
import SortPanel from "../components/SortPanel";

const statusMap = {
  НОВЫЕ: "new",
  ПОДТВЕРЖДЁННЫЕ: "confirmed",
  ЗАВЕРШЁННЫЕ: "completed",
  ОТМЕНЁННЫЕ: "cancelled",
};

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const { userBookings, loading } = useSelector((state) => state.profile);
  const { sessionTypes } = useSelector((state) => state.booking);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings());
      dispatch(fetchCategories());
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await updateUserProfile({ username, email });
      dispatch(setUser(response.data));
      dispatch(
        addToast({
          type: "success",
          bookingId: "PROFILE_UPDATED",
          message: "Профиль успешно обновлён",
          extraMessage: "Ваши данные успешно обновлены.",
        })
      );
    } catch (error) {
      console.error("Ошибка обновления:", error);
      dispatch(
        addToast({
          type: "error",
          errorMessage: error.response?.data?.detail || "Ошибка обновления",
          errorCode: error.response?.status,
        })
      );
    } finally {
      setIsSaving(false);
    }
  };

  const [filterType, setFilterType] = React.useState("ВСЕ");
  const [filterStatus, setFilterStatus] = React.useState("ВСЕ");
  const [sortBy, setSortBy] = React.useState("УБЫВАНИЮ_ID");

  const filteredAndSortedBookings = React.useMemo(() => {
    if (!userBookings) return [];

    let result = [...userBookings];

    if (filterType !== "ВСЕ") {
      const categoryId = sessionTypes.find((t) => t.title === filterType)?.id;
      if (categoryId) {
        result = result.filter((b) => b.type === categoryId);
      }
    }

    if (filterStatus !== "ВСЕ") {
      const statusValue = statusMap[filterStatus];
      if (statusValue) {
        result = result.filter((b) => b.status === statusValue);
      }
    }
    switch (sortBy) {
      case "УБЫВАНИЮ_ID":
        result.sort((a, b) => b.id - a.id);
        break;
      case "ВОЗРАСТАНИЮ_ID":
        result.sort((a, b) => a.id - b.id);
        break;
      case "УБЫВАНИЮ_ДАТЫ":
        result.sort(
          (a, b) => new Date(b.chosen_date) - new Date(a.chosen_date)
        );
        break;
      case "ВОЗРАСТАНИЮ_ДАТЫ":
        result.sort(
          (a, b) => new Date(a.chosen_date) - new Date(b.chosen_date)
        );
        break;
      case "УБЫВАНИЮ_СТОИМОСТИ":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "ВОЗРАСТАНИЮ_СТОИМОСТИ":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;

      default:
        break;
    }

    return result;
  }, [userBookings, filterType, filterStatus, sortBy, sessionTypes]);

  const handleFilterType = (type) => setFilterType(type);
  const handleFilterStatus = (status) => setFilterStatus(status);
  const handleSortBy = (value) => setSortBy(value);

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

          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 400, marginTop: "25px" }}
          >
            <div className="profile-form-group">
              <label className="profile-form-label meta-text-sm">
                01_ИМЯ_ПОЛЬЗОВАТЕЛЯ
              </label>
              <input
                type="text"
                className="profile-form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label meta-text-sm">
                02_АДРЕС_ЭЛЕКТРОННОЙ_ПОЧТЫ
              </label>
              <input
                type="email"
                className="profile-form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? "СОХРАНЕНИЕ..." : "СОХРАНИТЬ"}
            </button>
          </form>
        </section>

        <section className="section-right">
          <div className="bookings-panel">
            <span className="meta-text section-label meta-text-sm">
              [ АКТИВНЫЕ ЗАКАЗЫ ]
            </span>
            <h2 className="section-title">ВАШИ ФОТОСЕССИИ</h2>
            <SortPanel
              onFilterType={handleFilterType}
              onFilterStatus={handleFilterStatus}
              onSortBy={handleSortBy}
              activeFilterType={filterType}
              activeFilterStatus={filterStatus}
              activeSortBy={sortBy}
            />
            <div className="booking-list">
              {filteredAndSortedBookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">∅</div>
                  <p className="empty-title">НЕТ_ЗАКАЗОВ</p>
                  <p className="empty-subtitle">
                    В вашей истории заказов не найдено бронирований с заданными
                    параметрами
                  </p>
                  <Link to="/booking" className="empty-action">
                    ОФОРМИТЬ БРОНЬ →
                  </Link>
                </div>
              ) : (
                filteredAndSortedBookings.map((booking) => (
                  <BookedItem key={booking.id} booking={booking} />
                ))
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
