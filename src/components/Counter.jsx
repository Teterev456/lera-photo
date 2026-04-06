import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrice,
  setChosenCountPeople,
  setChosenReportHours,
} from "../redux/slices/bookingSlice";

const Counter = ({ title }) => {
  const dispatch = useDispatch();
  const { chosenCountPeople, chosenReportHours } = useSelector(
    (state) => state.booking
  );

  const [count, setCount] = React.useState(2);

  const minCount = 2;
  const maxCount = 12;

  React.useEffect(() => {
    dispatch(setPrice());
  }, [chosenCountPeople, chosenReportHours]);

  const decrement = () => {
    if (count > minCount) {
      setCount(count - 1);
    }
    const newValue = count;
    dispatch(setChosenCountPeople(newValue));
    dispatch(setChosenReportHours(newValue));
  };

  const increment = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
    const newValue = count;
    dispatch(setChosenCountPeople(newValue));
    dispatch(setChosenReportHours(newValue));
  };

  return (
    <div className="form-group">
      <label className="meta-text">{title}</label>
      <div className="counter">
        <button
          type="button"
          className="counter-btn"
          onClick={() => {
            decrement();
          }}
          disabled={count <= minCount}
        >
          −
        </button>
        <input
          type="number"
          value={count}
          min={minCount}
          max={maxCount}
          readOnly
        />
        <button
          type="button"
          className="counter-btn"
          onClick={() => {
            increment();
          }}
          disabled={count >= maxCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
