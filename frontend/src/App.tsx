import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useAuthenticationSimple } from './hooks/useAuthenticationSimple';
import { useEntitlement } from './hooks/useEntitlement';
import { AuthProvider } from './contexts/AuthContext';
import { page } from './lib/motion';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Spinner from './components/Spinner';

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
import Upgrade from './pages/Upgrade';

const AnimatedRoutes = ({
  user,
  entitlement,
}: {
  user: ReturnType<typeof useAuthenticationSimple>['user'];
  entitlement: ReturnType<typeof useEntitlement>;
}) => {
  const location = useLocation();

  const createElement = (el: React.ReactNode, requireAuth: boolean, requirePaid: boolean) => {
    if (requireAuth && !user) return <Navigate to="/login" replace />;
    if (requirePaid && user && entitlement.status !== 'paid' && entitlement.status !== 'loading') {
      return <Navigate to="/upgrade" replace />;
    }
    return el;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={page}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/upgrade"
            element={
              user ? <Upgrade entitlement={entitlement} /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/submissions" element={createElement(<Submissions />, true, false)} />
          <Route path="/search" element={<Search />} />
          <Route path="/posts/create" element={createElement(<Registration />, true, true)} />
          <Route path="/posts/edit/:id" element={createElement(<Edit />, true, true)} />
          <Route path="/posts/:id" element={<Details />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/submissions" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Signup /> : <Navigate to="/submissions" replace />}
          />
          <Route
            path="/forgot-password"
            element={!user ? <ForgotPassword /> : <Navigate to="/submissions" replace />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const { user, isLoading } = useAuthenticationSimple();
  const entitlement = useEntitlement(user?.uid ?? null);

  if (isLoading || entitlement.status === 'loading') {
    return (
      <div className="page-center min-h-screen bg-[var(--bg)]">
        <Spinner label="Loading application" />
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider value={{ user: user || null }}>
        <BrowserRouter>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="flex flex-col min-h-screen">
            <Navbar entitlement={entitlement} />
            <main id="main" className="flex-1">
              <AnimatedRoutes user={user} entitlement={entitlement} />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </MotionConfig>
  );
};

export default App;
