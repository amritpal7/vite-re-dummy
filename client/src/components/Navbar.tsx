import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import Hamburger from "./Hamburger";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { FaProductHunt } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, currentUser } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-b-2 border-[#264143] shadow-[3px_3px_0px_0px_#e99f4c] p-4 fixed top-0 left-0 w-full z-50 bg-[#eddcd9]">
      <div className="w-full flex items-center px-4">
        {/* Left: Logo */}
        <Link to="/" className="text-[#264143] font-black text-xl flex-1/2">
          <FaProductHunt className="inline-block text-5xl" /> rod 👀
        </Link>

        {/* Center: Hamburger (Hidden on Larger Screens) */}
        <div className="md:hidden">
          <Hamburger toggle={toggleMenu} menuOpen={menuOpen} />
        </div>

        {/* Desktop Menu (Shown on md and larger screens) */}
        <div className="hidden md:flex md:items-center md:space-x-6 text-[#264143] font-semibold">
          <Link
            to="/"
            className="hover:text-[#e99f4c] relative transition-colors duration-300 after:content-[''] after:block after:h-[2px] after:bg-[#e99f4c] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-[#e99f4c] relative transition-colors duration-300 after:content-[''] after:block after:h-[2px] after:bg-[#e99f4c] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link
            to="/products"
            className="hover:text-[#e99f4c] relative transition-colors duration-300 after:content-[''] after:block after:h-[2px] after:bg-[#e99f4c] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Explore
          </Link>

          {/* Profile & Login - Only Visible on Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMenuOpen(prev => !prev)}
                  className="p-2 px-4 text-[#de5499] font-extrabold rounded-md hover:bg-[#de5499] hover:text-white transition-all"
                >
                  <CiUser className="inline-block text-2xl" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {currentUser && currentUser.role === "admin" && (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin-stuff"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </>
                    )}

                    <button
                      onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 px-4 text-[#de5499] font-extrabold rounded-md hover:bg-[#de5499] hover:text-white transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Shown only on small screens) */}
      <div
        className={`fixed top-[70px] left-0 w-full bg-[#eddcd9] shadow-md transition-all duration-300 origin-top z-50 ${
          menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } md:hidden border-b-2 border-[#264143] shadow-[6px_6px_0px_#e99f4c] backdrop-blur-lg rounded-xl`}
      >
        <ul className="flex flex-col text-[#264143] font-semibold space-y-4 p-6">
          <li>
            <Link
              to="/"
              className="hover:text-[#e99f4c] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[#e99f4c] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-[#e99f4c] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Explore
            </Link>
          </li>

          {/* Profile & Login - Inside Mobile Menu */}
          {user ? (
            <li className="pt-4 border-t border-[#264143]">
              <Link
                to="/profile"
                className="block p-2 text-[#de5499] font-extrabold rounded-full hover:bg-[#de5499] hover:text-white transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                <CiUser className="inline-block text-2xl mr-2" />
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="block p-2 text-[#de5499] font-extrabold rounded-full hover:bg-[#de5499] hover:text-white transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
