import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import PhotoCard from "../components/PhotoCard";
import projects from "../assets/data/projects";
import Lightbox from "../components/Lightbox";
import { addToast } from "../redux/slices/toastSlice";

const ArchivePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [lightboxState, setLightboxState] = React.useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = React.useCallback(
    (projectId, imageIndex = 0) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        dispatch(
          addToast({
            type: "error",
            errorMessage: `Фотосессия с ID ${projectId} не найдена`,
            errorCode: "PROJECT_NOT_FOUND",
          })
        );
        setSearchParams({});
        return false;
      }
      if (!project.images?.length) {
        dispatch(
          addToast({
            type: "error",
            errorMessage: "У проекта нет изображений",
            errorCode: "NO_IMAGES",
          })
        );
        return false;
      }
      let validIdx = imageIndex;
      if (validIdx < 0 || validIdx >= project.images.length) {
        dispatch(
          addToast({
            type: "error",
            errorMessage: `Изображение №${imageIndex} отсутствует, открыто первое`,
            errorCode: "INVALID_IMAGE_INDEX",
          })
        );
        validIdx = 0;
      }
      setLightboxState({
        isOpen: true,
        images: project.images,
        currentIndex: validIdx,
      });
      setSearchParams({ project: projectId, image: validIdx });
      return true;
    },
    [dispatch, setSearchParams]
  );

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, images: [], currentIndex: 0 });
    setSearchParams({});
  };

  React.useEffect(() => {
    const pid = searchParams.get("project");
    if (!pid) return;
    const projectId = Number(pid);
    const imageIndex = Number(searchParams.get("image")) || 0;
    openLightbox(projectId, imageIndex);
  }, [searchParams, openLightbox]);

  const goPrev = () => {
    setLightboxState((prev) => {
      const newIndex =
        prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1;
      setSearchParams({
        project: searchParams.get("project"),
        image: newIndex,
      });
      return { ...prev, currentIndex: newIndex };
    });
  };

  const goNext = () => {
    setLightboxState((prev) => {
      const newIndex =
        prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0;
      setSearchParams({
        project: searchParams.get("project"),
        image: newIndex,
      });
      return { ...prev, currentIndex: newIndex };
    });
  };

  return (
    <div className="page-section">
      <div className="panel portfolio-header">
        <h2 className="display-medium overline">ПОРТФОЛИО</h2>
        <div className="meta-text">
          КОЛИЧЕСТВО_РАБОТ:
          {projects.map((project) =>
            projects.length === project.id + 1 ? project.id + 1 : ""
          )}
        </div>
      </div>

      <section className="portfolio-grid">
        {projects.map((project) => (
          <PhotoCard
            key={project.id}
            image={project.images[0]}
            onOpen={() => openLightbox(project.id, 0)}
            {...project}
          />
        ))}
        {lightboxState.isOpen && (
          <Lightbox
            images={lightboxState.images}
            currentIndex={lightboxState.currentIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </section>
    </div>
  );
};

export default ArchivePage;
