import React from "react";
import { createPortal } from "react-dom";

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const hasMultiple = images.length > 1;

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {hasMultiple && (
          <button className="lightbox-nav prev" onClick={onPrev}>
            ‹
          </button>
        )}
        <img
          src={images[currentIndex]}
          alt={`Съёмка ${currentIndex + 1}`}
          className="lightbox-image"
        />
        {hasMultiple && (
          <button className="lightbox-nav next" onClick={onNext}>
            ›
          </button>
        )}
        <button className="lightbox-close" onClick={onClose}>
          ✕
        </button>
        {hasMultiple && (
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
