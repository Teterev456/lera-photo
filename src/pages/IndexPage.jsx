import React, { useEffect, useState } from "react";
import indexImage from "../assets/img/index.jpg";
import projects from "../assets/data/projects";
import PhotoCard from "../components/PhotoCard";

const IndexPage = ({ setPage }) => {
  const date = new Date();

  return (
    <div className="page-section">
      <header className="hero panel">
        <div className="hero-title-wrapper panel">
          <div className="meta-text system-code">
            SYS.DATE //{" "}
            {date.getDay() + ":" + date.getMonth() + ":" + date.getFullYear()}
          </div>
          <h1 className="display-huge">
            ИНФОРМАЦИЯ
            <br />
            ОБО МНЕ
          </h1>
        </div>

        <div className="hero-image panel">
          <div className="crosshair ch-tl" />
          <div className="crosshair ch-br" />
          <img src={indexImage} alt="Фотограф" />
        </div>

        <div className="hero-info panel">
          <div className="meta-text" style={{ marginBottom: "2rem" }}>
            <p className="meta-text info-text-title">
              <b>
                <i>
                  Добро пожаловать в мир профессиональной фотографии вместе с
                  Лерой!
                </i>
              </b>
            </p>
            <br />
            <p className="meta-text info-text">
              Я — фотограф из Пскова с опытом создания запоминающихся образов и
              живых портретов. За моими работами следят более 300 человек,
              которые ценят искренность и мастерство в каждом кадре.
            </p>
            <br />
            <p className="meta-text info-text">
              Примеры моих работ вы можете посмотреть в специальном разделе
              портретов, где собраны лучшие снимки, демонстрирующие мой
              авторский стиль и подход к фотографии. Доверьте мне ваш образ, и я
              создам фотографии, которые будут радовать вас долгие годы!
            </p>
          </div>
          <div>
            <div className="info-block">
              <span className="meta-text info-label">ОСНОВНОЙ ФОКУС</span>
              <p className="info-text">
                Моя специализация — портретная съемка, где я стараюсь передать
                не просто внешность, а настоящую эмоцию и характер человека.
              </p>
              <br />
              <p className="info-text">
                Доверьте мне ваш образ, и я создам фотографии, которые будут
                радовать вас долгие годы!
              </p>
            </div>
          </div>
          <div className="meta-text" style={{ marginTop: "4rem" }}>
            ЛИСТАЙ_НИЖЕ▼
          </div>
        </div>
      </header>

      <section className="panel portfolio-header">
        <h2 className="display-medium overline">ПРИМЕРЫ РАБОТ</h2>
        <a
          href="#"
          className="meta-text"
          style={{ color: "var(--blue)", textDecoration: "none" }}
          onClick={(e) => {
            e.preventDefault();
            setPage("archive");
          }}
        >
          ПОСМОТРЕТЬ_ВСЕ_РАБОТЫ ↗
        </a>
      </section>

      <section className="featured-grid">
        {projects.slice(-2).map((project) => (
          <PhotoCard key={project.id} {...project} />
        ))}
      </section>
    </div>
  );
};

export default IndexPage;
