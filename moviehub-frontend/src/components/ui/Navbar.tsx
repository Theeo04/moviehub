import { useState } from "react";
import { HiMenu, HiX, HiChevronDown, HiSun, HiMoon } from "react-icons/hi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-600
                       backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-3xl font-extrabold cursor-pointer select-none
                       transform transition-transform duration-300 hover:scale-110 flex items-center gap-2">
          🎬 MovieHub
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-10 items-center text-white font-semibold">
          <span className="cursor-pointer hover:underline hover:underline-offset-4 transition">
            Home
          </span>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 cursor-pointer hover:underline hover:underline-offset-4 transition"
            >
              Movies <HiChevronDown className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full mt-2 bg-white text-gray-900 rounded-md shadow-lg w-40 py-2">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">Popular</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">New Releases</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">Top Rated</a>
              </div>
            )}
          </div>

          <span className="cursor-pointer hover:underline hover:underline-offset-4 transition">
            About
          </span>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="ml-6 p-1 rounded-md hover:bg-white/20 transition"
          >
            {darkMode ? <HiSun className="text-yellow-300 w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobile}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white font-semibold">
          <a href="#" className="block px-6 py-3 border-t border-white/20 hover:bg-white/20">
            Home
          </a>

          <button
            onClick={toggleDropdown}
            className="w-full text-left flex items-center justify-between px-6 py-3 border-t border-white/20 hover:bg-white/20"
          >
            Movies
            <HiChevronDown className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="bg-white/10">
              <a href="#" className="block px-10 py-2 hover:bg-white/20">Popular</a>
              <a href="#" className="block px-10 py-2 hover:bg-white/20">New Releases</a>
              <a href="#" className="block px-10 py-2 hover:bg-white/20">Top Rated</a>
            </div>
          )}

          <a href="#" className="block px-6 py-3 border-t border-white/20 hover:bg-white/20">
            About
          </a>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="w-full text-left px-6 py-3 border-t border-white/20 hover:bg-white/20 flex items-center gap-2"
          >
            {darkMode ? <HiSun className="text-yellow-300 w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
            Dark Mode
          </button>
        </nav>
      )}
    </header>
  );
}
