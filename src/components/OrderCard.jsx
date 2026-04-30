import React from "react";

const OrderCard = ({ booking, sessionTypes }) => {
  const { id, status, user_name, type, price, chosen_date, chosen_time } =
    booking;
  const category = sessionTypes?.find(
    (typeCategory) => typeCategory.id === type
  );
  const categoryTitle = category ? category.title : "НЕИЗВЕСТНАЯ";
  return (
    <div key={id} className="order-card">
      <div className="order-info-main">
        <div className="order-header-row">
          <span className="order-id">ID: {id}</span>
          <div className={`status-badge ${status.toLowerCase()}`}>{status}</div>
        </div>
        <h3 className="client-name">{user_name}</h3>
        <div className="order-details-row">
          <span className="detail-pill">{categoryTitle}</span>
          <span className="detail-pill">YY-MM-DD: {chosen_date}</span>
          <span className="detail-pill">{chosen_time}</span>
          <span className="detail-pill price">{price} ₽</span>
        </div>
      </div>
      <button className="view-btn">OPEN →</button>
    </div>
  );
};

export default OrderCard;
