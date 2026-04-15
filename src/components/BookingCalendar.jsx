import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";

import { setDate } from "../redux/slices/bookingSlice";

dayjs.locale("ru");

const BookingCalendar = () => {
  const dispatch = useDispatch();
  const { chosenDate } = useSelector((state) => state.booking);

  const [currentMonth, setCurrentMonth] = useState(dayjs(new Date()));

  const blockedDates = ["2026-04-12", "2026-04-19", "2026-04-26"];
  const bookedDates = ["2026-04-17", "2026-04-13", "2026-04-08"];

  const getWeeksArray = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    let firstDayOfCalendar = startOfMonth;
    const startDayOfWeek = startOfMonth.day();
    const daysToMonday = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    firstDayOfCalendar = startOfMonth.subtract(daysToMonday, "day");

    let lastDayOfCalendar = endOfMonth;
    const endDayOfWeek = endOfMonth.day();
    const daysToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
    lastDayOfCalendar = endOfMonth.add(daysToSunday, "day");

    const weeks = [];
    let currentDay = firstDayOfCalendar;

    while (
      currentDay.isBefore(lastDayOfCalendar) ||
      currentDay.isSame(lastDayOfCalendar, "day")
    ) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = currentDay.add(i, "day");
        const dateStr = day.format("YYYY-MM-DD");
        const isCurrentMonth = day.month() === currentMonth.month();

        let status = "";
        if (!isCurrentMonth) {
          status = "disabled";
        } else {
          const isBlocked = blockedDates.includes(dateStr);
          const isBooked = bookedDates.includes(dateStr);
          const isPast = day.isBefore(dayjs(), "day");

          if (isBlocked || isPast) status = "disabled";
          else if (isBooked) status = "booked";
          else status = "available";
        }

        week.push({
          day: day.date(),
          status: status,
          date: day,
          isCurrentMonth: isCurrentMonth,
        });
      }
      weeks.push(week);
      currentDay = currentDay.add(7, "day");
    }

    return weeks;
  };

  const goPrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    setDate(null);
  };

  const goNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
    setDate(null);
  };

  const weeks = getWeeksArray();

  return (
    <div className="form-group">
      <label className="meta-text">ВЫБОР_ДАТЫ</label>
      <div className="calendar-grid">
        <div className="calendar-header meta-text">
          <span onClick={goPrevMonth} style={{ cursor: "pointer" }}>
            ◄
          </span>
          <span>{currentMonth.format("MMMM YYYY").toUpperCase()}</span>
          <span onClick={goNextMonth} style={{ cursor: "pointer" }}>
            ►
          </span>
        </div>
        <div className="calendar-days">
          {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((d) => (
            <div key={d} className="day-label meta-text">
              {d}
            </div>
          ))}

          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((item, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`day ${item.status} ${
                    chosenDate === item.date.format("DD-MM-YYYY") &&
                    item.status === "available"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    if (item.status === "available") {
                      dispatch(setDate(item.date.format("DD-MM-YYYY")));
                    }
                  }}
                >
                  {item.day}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
