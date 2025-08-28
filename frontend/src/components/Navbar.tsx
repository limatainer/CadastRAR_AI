import { NavLink } from 'react-router-dom';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';
import { useAuthValue } from '../contexts/AuthContext';
import Logo from '/logo.png';

export default function Navbar() {
  const { logout } = useAuthenticationSimple();
  const { user } = useAuthValue();

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink className="flex items-center space-x-2" to="/">
            <img className="w-10 h-10" src={Logo} alt="CadastRAR Logo" />
            <span className="text-white text-xl font-bold">CadastRAR</span>
          </NavLink>
          
          <div className="flex items-center space-x-1">
            {!user ? (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/submissions" 
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  Submissions
                </NavLink>
                <NavLink 
                  to="/posts/create" 
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  Register
                </NavLink>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
