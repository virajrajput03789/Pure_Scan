import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Scan from './components/Scan.jsx';
import Login from './components/Login.jsx'; // ✅ FIXED CASE
import SignIn from './components/SignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './components/DashBoard.jsx';
import ScanHistory from './components/ScanHistory.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx'; // ✅ NEW
import { Toaster } from 'react-hot-toast'; // ✅ NEW
import Profile from './components/Profile.jsx'; // ✅ NEW

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route
              path="/scan"
              element={
                <PrivateRoute>
                  <Scan />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <ScanHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton /> {/* ✅ Floating scroll button */}
        <Toaster position="top-right" /> {/* ✅ Toast notifications */}
      </BrowserRouter>
    </div>
  );
}

export default App;