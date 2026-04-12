import { useState, useEffect } from "react";
import Logo from "./Logo";
import { NavLink } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [imageError, setImageError] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply theme immediately
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsProfileMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfileImage = () => {
    if (!user) return "";
    if (imageError || !user.photoURL) {
      const name = encodeURIComponent(user.displayName || user.email || "User");
      return `https://ui-avatars.com/api/?name=${name}&background=2563eb&color=ffffff&size=128`;
    }
    return user.photoURL;
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/send-parcel", label: "Send Parcel" },
    { to: "/rider", label: "Be a Rider" },
    { to: "/coverage", label: "Coverage" },
  ];

  const userLinks = user
    ? [
        { to: "/dashboard/my-parcels", label: "My Parcels" },
        { to: "/dashboard", label: "Dashboard" },
      ]
    : [];

  const allLinks = [...navLinks, ...userLinks];

  const bgImageUrl =
    "https://t4.ftcdn.net/jpg/03/59/94/55/360_F_359945582_AoAGhekxCJiGVQdlsAPHuqmGJ8sbhPth.jpg";

  return (
    <nav
      style={{
        backgroundImage: `url('${bgImageUrl}')`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-black/80 via-black/70 to-black/60 shadow-lg border-b border-white/10 dark:border-white/5 backdrop-blur-2xl"
          : "bg-gradient-to-r from-black/75 via-black/65 to-black/55 border-b border-white/10 dark:border-white/5 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-white dark:from-blue-300 dark:via-cyan-300 dark:to-white bg-clip-text text-transparent">
              SwiftParcel
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {allLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500/30 text-blue-200 backdrop-blur-lg border border-blue-400/30"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-200 hover:bg-white/15 hover:text-white transition-all duration-200 backdrop-blur-lg"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/15 transition-all duration-200 backdrop-blur-lg"
                >
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    onError={() => setImageError(true)}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
                  />
                  <svg
                    className="w-4 h-4 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/10 dark:bg-gray-900/30 rounded-xl shadow-xl border border-white/30 py-2 backdrop-blur-2xl">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-white truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-500/20 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/15 hover:text-white rounded-lg transition-all duration-200 backdrop-blur-lg"
              >
                Login
              </NavLink>
            )}

            <NavLink
              to="/rider"
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full shadow-lg shadow-blue-500/50 transition-all duration-200 transform hover:scale-105"
            >
              Be a Rider
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-200 hover:bg-white/15 hover:text-white transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-200 hover:bg-white/15 hover:text-white transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/5 dark:bg-gray-900/5 backdrop-blur-xl border-t border-white/10 dark:border-white/5">
          <div className="px-4 py-4 space-y-1">
            {allLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500/30 text-blue-200 backdrop-blur-lg border border-blue-400/30"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <img
                      src={getProfileImage()}
                      alt="Profile"
                      onError={() => setImageError(true)}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  Login
                </NavLink>
              )}

              <NavLink
                to="/rider"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-lg transition-all duration-200"
              >
                Be a Rider
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
