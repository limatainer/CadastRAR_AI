import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthenticationSimple } from './hooks/useAuthenticationSimple';
import { AuthProvider } from './contexts/AuthContext';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Search from './components/Search';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Submissions from './pages/Submissions';
import Registration from './pages/Registration';
import Edit from './pages/Edit';
import Details from './pages/Details';


const App = () => {
  const { user, isLoading } = useAuthenticationSimple();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthProvider value={{ user: user || null }}>
      <BrowserRouter>
        <Navbar />
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
