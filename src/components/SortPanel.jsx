import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SortPanel = ({
  onFilterType,
  onFilterStatus,
  onSortBy,
  activeFilterType,
  activeFilterStatus,
  activeSortBy,
  onSearch,
  searchQuery,
}) => {
  const { sessionTypes } = useSelector((state) => state.booking);
  const typeOptions = ["ВСЕ", ...sessionTypes.map((t) => t.title)];
  const { isAdmin } = useSelector((state) => state.authorization);
  const location = useLocation();
  return (
    <div className="sort-panel">
      <div className="sort-group">
        <span className="sort-label">ФИЛЬТРАЦИЯ_ПО_ТИПУ_СЪЁМОК:</span>
        <div className="sort-options">
          {typeOptions.map((opt) => (
            <button
              key={opt}
              className={`sort-btn ${activeFilterType === opt ? "active" : ""}`}
              onClick={() => onFilterType(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="sort-group">
        <span className="sort-label">СОРТИРОВКА_ПО:</span>
        <select
          className="sort-select"
          value={activeSortBy}
          onChange={(e) => onSortBy(e.target.value)}
        >
          <option>УБЫВАНИЮ_ID</option>
          <option>ВОЗРАСТАНИЮ_ID</option>
          <option>УБЫВАНИЮ_ДАТЫ</option>
          <option>ВОЗРАСТАНИЮ_ДАТЫ</option>
          <option>УБЫВАНИЮ_СТОИМОСТИ</option>
          <option>ВОЗРАСТАНИЮ_СТОИМОСТИ</option>
        </select>
      </div>

      <div className="sort-group">
        <span className="sort-label">ФИЛЬТРАЦИЯ_ПО_СТАТУСУ:</span>
        <div className="sort-options">
          {["ВСЕ", "НОВЫЕ", "ПОДТВЕРЖДЁННЫЕ", "ЗАВЕРШЁННЫЕ", "ОТМЕНЁННЫЕ"].map(
            (opt) => (
              <button
                key={opt}
                className={`sort-btn ${
                  activeFilterStatus === opt ? "active" : ""
                }`}
                onClick={() => onFilterStatus(opt)}
              >
                {opt}
              </button>
            )
          )}
        </div>
      </div>
      {isAdmin && location.pathname !== "/profile" && (
        <div className="search-row">
          <span className="filter-label">ПОИСК:</span>
          <input
            type="text"
            className="search-input"
            placeholder="ВВЕДИТЕ ИМЯ ИЛИ ID..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default SortPanel;
