import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import OrderCard from "../components/OrderCard";
import SortPanel from "../components/SortPanel";
import { fetchAllBookings } from "../redux/slices/adminSlice";
import { fetchCategories } from "../redux/slices/bookingSlice";

const statusMap = {
  НОВЫЕ: "new",
  ПОДТВЕРЖДЁННЫЕ: "confirmed",
  ЗАВЕРШЁННЫЕ: "completed",
  ОТМЕНЁННЫЕ: "cancelled",
};

const sortMap = {
  УБЫВАНИЮ_ID: "-id",
  ВОЗРАСТАНИЮ_ID: "id",
  УБЫВАНИЮ_ДАТЫ: "-chosen_date",
  ВОЗРАСТАНИЮ_ДАТЫ: "chosen_date",
  УБЫВАНИЮ_СТОИМОСТИ: "-price",
  ВОЗРАСТАНИЮ_СТОИМОСТИ: "price",
};

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { sessionTypes } = useSelector((state) => state.booking);
  const { user, isAdmin, loading } = useSelector(
    (state) => state.authorization
  );
  const { bookings, loadingBookings } = useSelector((state) => state.admin);

  const [filterType, setFilterType] = React.useState("ВСЕ");
  const [filterStatus, setFilterStatus] = React.useState("ВСЕ");
  const [sortBy, setSortBy] = React.useState("УБЫВАНИЮ_ID");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    const params = {};
    if (filterType !== "ВСЕ") {
      const category = sessionTypes?.find((t) => t.title === filterType);
      if (category) params.type = category.id;
    }
    if (filterStatus !== "ВСЕ") {
      params.status = statusMap[filterStatus];
    }
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    params.ordering = sortMap[sortBy];

    console.log("Отправка запроса с параметрами:", params);
    dispatch(fetchAllBookings(params));
  }, [
    dispatch,
    filterType,
    filterStatus,
    sortBy,
    debouncedSearch,
    sessionTypes,
  ]);

  const handleFilterType = (type) => setFilterType(type);
  const handleFilterStatus = (status) => setFilterStatus(status);
  const handleSortBy = (sort) => setSortBy(sort);
  const handleSearch = (query) => setSearchQuery(query);

  if (loading) return <div>Загрузка...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  if (loadingBookings)
    return <div className="loading">Загрузка заказов...</div>;

  const date = dayjs(new Date());
  const dateStr = date.format("DD:MM:YYYY");

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + parseFloat(b.price || 0),
    0
  );

  return (
    <div className="page-section">
      <div className="admin-main">
        <aside className="admin-sidebar">
          <h1 className="panel-title">АДМИН_ПАНЕЛЬ</h1>
          <div className="sidebar-section">
            <div className="meta-text section-label meta-text-sm">
              [ СТАТИСТИКА ]
            </div>
            <div className="stat-list">
              <div className="stat-row">
                <span className="stat-label-side">КОЛ-ВО ЗАКАЗОВ</span>
                <span className="stat-value-side highlight">
                  {totalBookings}
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label-side">ПОДТВЕРЖДЕНЫ</span>
                <span className="stat-value-side">{confirmedBookings}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label-side">ОБЩАЯ СТОИМОСТЬ</span>
                <span className="stat-value-side">{totalRevenue} ₽</span>
              </div>
            </div>
          </div>
          <div className="sidebar-section">
            <div className="meta-text section-label meta-text-sm">
              [ ДЕЙСТВИЯ ]
            </div>
            <div className="quick-actions">
              <Link to="/booking" className="action-link">
                <span>НОВАЯ БРОНЬ</span>
                <span className="action-arrow">→</span>
              </Link>
            </div>
          </div>
        </aside>

        <section className="admin-content">
          <div className="filter-pane">
            <span
              className="meta-text"
              style={{ marginBottom: "2rem", color: "var(--blue)" }}
            >
              [ ПАНЕЛЬ_УПРАВЛЕНИЯ ]
            </span>
            <h2 className="content-title">СПИСОК_ФОТОСЕССИЙ</h2>
            <SortPanel
              activeFilterType={filterType}
              activeFilterStatus={filterStatus}
              activeSortBy={sortBy}
              onFilterType={handleFilterType}
              onFilterStatus={handleFilterStatus}
              onSortBy={handleSortBy}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
          </div>
          <div className="orders-scroll-area">
            {bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">∅</div>
                <p className="empty-title">НЕТ_ЗАКАЗОВ</p>
                <p className="empty-subtitle">
                  В истории заказов не найдено бронирований с заданными
                  параметрами
                </p>
                <button
                  className="empty-action"
                  onClick={() => {
                    handleFilterType("ALL");
                    handleFilterStatus("ALL");
                    handleSortBy("-id");
                    handleSearch("");
                  }}
                >
                  ОЧИСТИТЬ ФИЛЬТРЫ
                </button>
              </div>
            ) : (
              bookings.map((order) => (
                <OrderCard
                  key={order.id}
                  booking={order}
                  sessionTypes={sessionTypes}
                />
              ))
            )}
          </div>
          <div className="error-footer">
            <span className="meta-text" style={{ opacity: 0.4, fontSize: 18 }}>
              SYS_DATE // {dateStr}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
