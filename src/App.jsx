import {Routes,Route,BrowserRouter,Navigate,useLocation,} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Scan from './components/Scan.jsx';
import Login from './components/LoginComponent.jsx';
import SignIn from './components/SignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './components/DashBoard.jsx';
import ScanHistory from './components/ScanHistory.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile.jsx';
import ScanTypeSelector from './components/ScanTypeSelector.jsx';
import BackButton from './pages/BackButton.jsx';

function AppContent() {
  const location = useLocation();

  // ✅ Routes where back button should appear
  const showBackButtonOn = [
    '/home',
    '/aboutUs',
    '/contactUs',
    '/select-scan',
    '/scan',
    '/dashboard',
    '/history',
    '/profile',
    '/login',
    '/signin',
  ];

  const shouldShowBackButton = showBackButtonOn.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
  
      <Header />
      {shouldShowBackButton && (
  <div className="relative">
    <BackButton />
  </div>
)}
      <main className="flex-grow pt-36 sm:pt-28 md:pt-40 lg:pt-44">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/select-scan"
            element={
              <PrivateRoute>
                <ScanTypeSelector />
              </PrivateRoute>
            }
          />
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
      <ScrollToTopButton />
      <Toaster position="top-right" />
      
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}