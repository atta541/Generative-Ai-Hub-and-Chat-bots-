import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SubscriptionAlert from './SubscriptionAlert';
import AlreadySubscribedAlert from './AlreadySubscribedAlert';

const Navbar = () => {
  const { isAuthenticated, logout, isSubscribed } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);
  const [showAlreadySubscribedAlert, setShowAlreadySubscribedAlert] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubscriptionClick = (event) => {
    event.preventDefault();
    if (isSubscribed) {
      setShowAlreadySubscribedAlert(true);
    } else {
      setShowSubscriptionAlert(true);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-white text-2xl font-bold">Chatbot HUB</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/chatbots">Explore Chatbots</NavLink>
                <button
                  onClick={handleSubscriptionClick}
                  className="text-gray-300 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Buy Subscription
                </button>
                {!isAuthenticated ? (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/chatbots">Explore Chatbots</MobileNavLink>
            <button
              onClick={handleSubscriptionClick}
              className="text-gray-300 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-150 ease-in-out"
            >
              Buy Subscription
            </button>
            {!isAuthenticated ? (
              <>
                <MobileNavLink to="/login">Login</MobileNavLink>
                <MobileNavLink to="/register">Register</MobileNavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-150 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {showSubscriptionAlert && (
        <SubscriptionAlert
          onClose={() => setShowSubscriptionAlert(false)}
        />
      )}

      {showAlreadySubscribedAlert && (
        <AlreadySubscribedAlert
          onClose={() => setShowAlreadySubscribedAlert(false)}
        />
      )}
    </>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`${
        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
      } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`${
        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
      } block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
