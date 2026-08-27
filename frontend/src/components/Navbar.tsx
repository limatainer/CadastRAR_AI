import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthenticationSimple } from '@/hooks/useAuthenticationSimple';
import { useAuthValue } from '@/contexts/useAuthValue';
import { useThemeValue } from '@/contexts/useThemeValue';
import { Entitlement } from '@/hooks/useEntitlement';
import {
  SunIcon,
  MoonIcon,
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Logo from '/logo.png';

const linkBase =
  'relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const navLinkClasses =
  'block rounded-md px-4 py-2.5 text-base font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${linkBase} ${isActive ? 'text-[var(--accent-fg)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive ? (
          <motion.span
            layoutId="navbar-pill"
            className="absolute inset-0 rounded-md bg-[var(--accent)]"
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
        ) : null}
        <span className="relative z-10">{children}</span>
      </>
    )}
  </NavLink>
);

export default function Navbar({ entitlement }: { entitlement: Entitlement }) {
  const { logout } = useAuthenticationSimple();
  const { user } = useAuthValue();
  const { theme, toggle } = useThemeValue();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink className="flex items-center space-x-2 focus-ring rounded-md" to="/">
            <motion.img
              className="w-10 h-10"
              src={Logo}
              alt="CadastRAR Logo"
              whileHover={{ rotate: 8, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
            <span className="font-bold text-xl text-[var(--fg)]">CadastRAR</span>
          </NavLink>

          <div className="flex items-center space-x-1">
            {entitlement.status === 'trial' && entitlement.daysLeft !== null && (
              <span className="text-xs text-[var(--fg-muted)] mr-2 hidden sm:inline">
                {entitlement.daysLeft === 1 ? '1 day' : `${entitlement.daysLeft} days`} free
              </span>
            )}
            <div className="hidden sm:flex items-center space-x-2">
              <NavItem to="/">Home</NavItem>
              {user ? (
                <NavItem to="/submissions">My Records</NavItem>
              ) : (
                <>
                  <NavItem to="/login">Login</NavItem>
                  <NavItem to="/register">Sign Up</NavItem>
                </>
              )}
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-[var(--fg)]" />
              ) : (
                <MoonIcon className="w-5 h-5 text-[var(--fg)]" />
              )}
            </button>
            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-md text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors ml-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Logout"
                title="Logout"
              >
                <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Open menu"
              aria-expanded={open}
            >
              {open ? (
                <XMarkIcon className="w-6 h-6 text-[var(--fg)]" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-[var(--fg)]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="sm:hidden overflow-hidden border-t border-[var(--glass-border)]"
          >
            <div className="px-4 py-3 space-y-1 bg-[var(--surface)]">
              <NavLink to="/" onClick={close} className={navLinkClasses}>
                Home
              </NavLink>
              {user ? (
                <NavLink to="/submissions" onClick={close} className={navLinkClasses}>
                  My Records
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" onClick={close} className={navLinkClasses}>
                    Login
                  </NavLink>
                  <NavLink to="/register" onClick={close} className={navLinkClasses}>
                    Sign Up
                  </NavLink>
                </>
              )}
              <NavLink to="/about" onClick={close} className={navLinkClasses}>
                How it works
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
