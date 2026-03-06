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

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- LOAD THEME ---------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  /* ---------------- APPLY THEME ---------------- */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    logOut().then(() => {
      setIsProfileMenuOpen(false);
    });
  };

  /* ---------------- PROFILE IMAGE FIX ---------------- */
  const getProfileImage = () => {
    if (imageError || !user?.photoURL) {
      const name = encodeURIComponent(
        user?.displayName || user?.email || "User"
      );

      return `https://ui-avatars.com/api/?name=${name}&background=2563eb&color=ffffff&size=128`;
    }

    return user.photoURL;
  };

  /* ---------------- NAV LINKS ---------------- */
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        isScrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md"
          : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {allLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    onError={() => setImageError(true)}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Login
              </NavLink>
            )}

            {/* CTA Button */}
            <NavLink
              to="/rider"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
            >
              Be a Rider
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;