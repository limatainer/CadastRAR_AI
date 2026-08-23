import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';
import { useAuthValue } from '../contexts/AuthContext';
import Logo from '/logo.png';

const linkBase =
  'relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200';

/** Nav link with a shared-layout pill that slides between active items. */
const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${linkBase} ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive ? (
          <motion.span
            layoutId="navbar-pill"
            className="absolute inset-0 rounded-md bg-purple-600"
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
        ) : null}
        <span className="relative z-10">{children}</span>
      </>
    )}
  </NavLink>
);

export default function Navbar() {
  const { logout } = useAuthenticationSimple();
  const { user } = useAuthValue();

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink className="flex items-center space-x-2" to="/">
            <motion.img
              className="w-10 h-10"
              src={Logo}
              alt="CadastRAR Logo"
              whileHover={{ rotate: 8, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            />
            <span className="text-white text-xl font-bold">CadastRAR</span>
          </NavLink>

          <div className="flex items-center space-x-1">
            {!user ? (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </>
            ) : (
              <>
                <NavItem to="/submissions">Submissions</NavItem>
                <NavItem to="/posts/create">Register</NavItem>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${linkBase} text-gray-300 hover:bg-gray-700 hover:text-white`}
                >
                  Logout
                </motion.button>
              </>
            )}
            <NavItem to="/about">About</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}
