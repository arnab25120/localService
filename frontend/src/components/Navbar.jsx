import { useState } from "react"; 
import { NavLink, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import useAuthStore from "../store/useAuthStore.js"; 
import ConfirmModal from "./ConfirmModal.jsx"; 
import axiosInstance from "../services/axiosInstance.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/users/logout");
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };
  
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "relative text-blue-600 font-semibold transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 after:rounded-full"
      : "relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:transform hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";
  
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with enhanced styling */}
            <NavLink 
              to="/" 
              className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                HazzleFree
              </span>
            </NavLink>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <NavLink to="/" className={navLinkStyle}>
                  <span className="flex items-center space-x-1">
                    <span>Home</span>
                  </span>
                </NavLink>
                
                <NavLink to="/services" className={navLinkStyle}>
                  <span className="flex items-center space-x-1">
                    <span>Services</span>
                  </span>
                </NavLink>
                
                {!user && (
                  <>
                    <NavLink to="/login" className={navLinkStyle}>
                      <span className="flex items-center space-x-1">
                        <span>Login</span>
                      </span>
                    </NavLink>
                    <NavLink 
                      to="/register" 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
                    >
                      Register
                    </NavLink>
                  </>
                )}
                
                {user?.role === "provider" && (
                  <NavLink
                    to="/provider/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "relative text-blue-600 font-semibold transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 after:rounded-full"
                        : "relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:transform hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                    }
                  >
                    <span className="flex items-center space-x-1">
                      <span>Provider Dashboard</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </span>
                  </NavLink>
                )}
                
                {user?.isAdmin && (
                  <NavLink to="/admin/dashboard" className={navLinkStyle}>
                    <span className="flex items-center space-x-1">
                      <span>Admin</span>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </span>
                  </NavLink>
                )}
                
                {user && (
                  <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                    <NavLink to="/change-password" className={navLinkStyle}>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2v6a2 2 0 01-2 2H9a9 9 0 11-9-9V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h6" />
                        </svg>
                        <span>Change Password</span>
                      </span>
                    </NavLink>
                    
                    <button
                      onClick={() => setShowModal(true)}
                      className="group flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-all duration-300 hover:transform hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                    
                    {/* User Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-3 border-t border-gray-100">
              <NavLink 
                to="/" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/services" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </NavLink>
              
              {!user && (
                <>
                  <NavLink 
                    to="/login" 
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
              
              {user?.role === "provider" && (
                <NavLink
                  to="/provider/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Provider Dashboard
                </NavLink>
              )}
              
              {user?.isAdmin && (
                <NavLink 
                  to="/admin/dashboard" 
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </NavLink>
              )}
              
              {user && (
                <>
                  <NavLink 
                    to="/change-password" 
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Change Password
                  </NavLink>
                  
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <ConfirmModal
        isOpen={showModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          handleLogout();
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Navbar;