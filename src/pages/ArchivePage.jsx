import React from "react";
import work1 from "../assets/img/work1.jpg";
import work2 from "../assets/img/work2.jpg";
import work3 from "../assets/img/work3.jpg";
import work4 from "../assets/img/work4.jpg";
import work5 from "../assets/img/work5.jpg";

const ArchivePage = () => {
  const projects = [
    {
      id: 1,
      code: "В ПОМЕЩЕНИИ",
      type: "ИНДИВИДУАЛЬНАЯ СЪЁМКА",
      title: "СЕРЬЁЗНАЯ_ВЕРОНИКА",
      image: work1,
    },
    {
      id: 2,
      code: "УЛИЧНАЯ",
      type: "ИНДИВИДУАЛЬНАЯ СЪЁМКА",
      title: "ДАРЬЯ_И_ЧЕМОДАН",
      image: work2,
    },
    {
      id: 3,
      code: "УЛИЧНАЯ",
      type: "ГРУППОВАЯ СЪЁМКА",
      title: "НИКИТА_И_НАСТЯ",
      image: work3,
    },
    {
      id: 4,
      code: "УЛИЧНАЯ",
      type: "РЕПОРТАЖНАЯ СЪЁМКА",
      title: "ВЫСТУПЛЕНИЕ",
      image: work4,
    },
    {
      id: 5,
      code: "УЛИЧНАЯ",
      type: "ИНДИВИДУАЛЬНАЯ СЪЁМКА",
      title: "ВАДИМ_И_НОЯБРЬ",
      image: work5,
    },
  ];

  return (
    <div className="page-section">
      <div className="panel portfolio-header">
        <h2 className="display-medium overline">ПОРТФОЛИО</h2>
        <div className="meta-text">
          КОЛИЧЕСТВО_РАБОТ:
          {projects.map((project) =>
            projects.length == project.id + 1 ? project.id + 1 : ""
          )}
        </div>
      </div>

      <section className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card panel">
            <img src={project.image} alt={project.type} />
            <div className="project-overlay">
              <div className="project-meta-top meta-text">
                <span>[{project.id}]</span>
                <span>{project.code}</span>
              </div>
              <div>
                <div
                  className="meta-text"
                  style={{ marginBottom: "0.5rem", color: "var(--white)" }}
                >
                  {project.type}
                </div>
                <h3 className="project-title">
                  {project.title.split(" ")[0]}
                  <br />
                  {project.title.split(" ")[2] || project.title.split(" ")[1]}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ArchivePage;
