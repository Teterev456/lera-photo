import React from "react";

const PhotoCard = ({ id, image, code, type, title, images, onOpen }) => {
  return (
    <article key={id} className="project-card panel" onClick={onOpen}>
      <img src={image} alt={type} />
      <div className="project-overlay">
        <div className="project-meta-top meta-text">
          <span>[{id}]</span>
          <span>{code}</span>
        </div>
        <div>
          <div
            className="meta-text"
            style={{ marginBottom: "0.5rem", color: "var(--white)" }}
          >
            {type}
          </div>
          <h3 className="project-title">
            {title.split(" ")[0]}
            <br />
            {title.split(" ")[2] || title.split(" ")[1]}
          </h3>
        </div>
      </div>
    </article>
  );
};

export default PhotoCard;
