import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeToast } from "../../redux/slices/toastSlice";
import BookingSuccessToast from "./BookingSuccessToast";
import ErrorToast from "./ErrorToast";

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="toast-container">
      {toasts.map((toast) =>
        toast.type === "booking" ? (
          <BookingSuccessToast
            key={toast.id}
            isVisible={true}
            onClose={() => dispatch(removeToast(toast.id))}
            bookingId={toast.bookingId}
          />
        ) : (
          <ErrorToast
            key={toast.id}
            isVisible={true}
            onClose={() => dispatch(removeToast(toast.id))}
            errorCode={toast.errorCode}
          />
        )
      )}
    </div>
  );
};

export default ToastContainer;
