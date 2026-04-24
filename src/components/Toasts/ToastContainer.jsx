import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeToast } from "../../redux/slices/toastSlice";
import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="toast-container">
      {toasts.map((toast) =>
        toast.type === "booking" ? (
          <SuccessToast
            key={toast.id}
            isVisible={true}
            onClose={() => dispatch(removeToast(toast.id))}
            bookingId={toast.bookingId}
            message={toast.message}
            extraMessage={toast.extraMessage}
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
