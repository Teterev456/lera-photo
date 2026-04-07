import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import ArchivePage from "./pages/ArchivePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

const App = () => {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
