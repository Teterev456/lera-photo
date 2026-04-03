import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import ArchivePage from "./pages/ArchivePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("index");

  const renderPage = () => {
    switch (currentPage) {
      case "index":
        return <IndexPage setPage={setCurrentPage} />;
      case "archive":
        return <ArchivePage />;
      case "booking":
        return <BookingPage />;
      case "login":
        return <LoginPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <IndexPage />;
    }
  };

  return (
    <div className="site-wrapper">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <main className="main-content">{renderPage()}</main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;
