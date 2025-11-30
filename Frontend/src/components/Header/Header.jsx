import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User, LogOut, ChevronDown, FileText, LayoutTemplate, BarChart } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const firstName = profile?.username?.split(" ")[0] || "User";
  const userInitial = firstName.charAt(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm py-3"
          : "bg-white/80 backdrop-blur-lg py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="ATS" className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
            <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
              Resume<span className="text-teal-600">Qualify</span>
            </span>
          </Link>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
              Home
            </NavLink>
            <NavLink to="/atschecker" className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
              ATS Scanner
            </NavLink>
            <NavLink to="/templates" className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
              Templates
            </NavLink>
          </div>

          {/* --- DESKTOP ACTIONS --- */}
          <div className="hidden md:flex items-center gap-4">
            {user && profile ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all bg-white"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                    {userInitial}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{firstName}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                      <User size={16} /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 text-left">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
                  Log in
                </Link>
                <Link to="/signup" className="text-sm font-bold text-white bg-slate-900 hover:bg-black px-5 py-2.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2">
          <div className="px-4 py-6 space-y-4">
            
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}>
               <div className="p-1 bg-slate-200 rounded text-slate-600"><LayoutTemplate size={16}/></div> Home
            </NavLink>
            <NavLink to="/atschecker" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}>
               <div className="p-1 bg-slate-200 rounded text-slate-600"><BarChart size={16}/></div> ATS Scanner
            </NavLink>
            <NavLink to="/templates" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}>
               <div className="p-1 bg-slate-200 rounded text-slate-600"><FileText size={16}/></div> Templates
            </NavLink>

            <div className="pt-4 border-t border-slate-100">
              {user && profile ? (
                <>
                  <div className="flex items-center gap-3 px-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold uppercase">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{profile.username}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[150px]">{profile.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 mb-2">
                     <User size={18} /> My Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 text-left">
                     <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-4">
                  <Link to="/login" className="w-full text-center py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm">
                    Log In
                  </Link>
                  <Link to="/signup" className="w-full text-center py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md">
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;