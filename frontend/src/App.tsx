import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthenticationSimple } from './hooks/useAuthenticationSimple';
import { AuthProvider } from './contexts/AuthContext';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Search from './components/Search';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Submissions from './pages/Submissions';
import Registration from './pages/Registration';
import Edit from './pages/Edit';
import Details from './pages/Details';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

const App = () => {
  const { user, isLoading } = useAuthenticationSimple();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider value={{ user: user || null }}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/submissions"
                element={user ? <Submissions /> : <Navigate to="/login" />}
              />
              <Route path="/search" element={<Search />} />
              <Route
                path="/posts/create"
                element={user ? <Registration /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <Edit /> : <Navigate to="/login" />}
              />
              <Route path="/posts/:id" element={<Details />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/submissions" />}
              />
              <Route
                path="/register"
                element={!user ? <Signup /> : <Navigate to="/submissions" />}
              />
              <Route
                path="/forgot-password"
                element={!user ? <ForgotPassword /> : <Navigate to="/submissions" />}
              />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
