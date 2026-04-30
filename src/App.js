import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import ArchivePage from "./pages/ArchivePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ToastContainer from "./components/Toasts/ToastContainer";
import "./App.css";
import UserProfilePage from "./pages/UserProfilePage";
import { setLoading, setUser } from "./redux/slices/authorizationSlice";
import { getCurrentUser } from "./services/api";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authorization);

  React.useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUser(response.data));
      } catch (error) {
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };
    restoreUser();
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

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
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/dashboard" element={<AdminDashboardPage />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
