import { useState } from "react";
import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user state
    navigate("/login"); // ✅ Redirect to login page
  };
  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
        {/* Logo */}
        <a className="flex items-center text-gray-900">
          <span className="ml-3 text-xl font-bold">Post-it</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-base items-center">
          <a href="#" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            About
          </a>
          <a href="#" className="hover:text-blue-500">
            Post
          </a>

          {/* User Info and Logout Button */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-semibold">
                {user.fullName}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="#" className="hover:text-blue-500">
              Sign In / Sign Up
            </a>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 p-5">
          <ul className="flex flex-col space-y-4 text-center">
            <li>
              <a href="#" className="block text-gray-900 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-900 hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-900 hover:text-blue-500">
                Post
              </a>
            </li>
            <li>
              {user ? (
                <div>
                  <span className="text-blue-600 font-semibold">
                    {user.fullName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="block w-full mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a href="#" className="block text-gray-900 hover:text-blue-500">
                  Sign In / Sign Up
                </a>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};


NavBar.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
  })
};

export default NavBar;
