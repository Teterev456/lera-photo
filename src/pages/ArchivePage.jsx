import React from "react";

import PhotoCard from "../components/PhotoCard";
import projects from "../assets/data/projects";

const ArchivePage = () => {
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
          <PhotoCard {...project} />
        ))}
      </section>
    </div>
  );
};

export default ArchivePage;
