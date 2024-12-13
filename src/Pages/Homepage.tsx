import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../Helpers/Hooks";
import { RootState } from "../Redux/store";
import { logout } from "../Redux/Slices/authSlice.reducer";
import { ChevronDown, LogOut, User, UserPlus, Menu } from "lucide-react";
import NextTrip from "../Components/NextTrip";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, data } = useSelector((state: RootState) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event:any) => {
      if (!event.target.closest("#dropdown-button") && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 px-6 md:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold">TravelSite</div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:flex space-x-8 absolute md:relative top-full left-0 w-full md:w-auto md:space-x-8 bg-blue-600 md:bg-transparent transition-all duration-200 ease-in-out`}
        >
          <li><Link to="/" className="hover:text-gray-200 block py-2 px-4">Home</Link></li>
          <li><Link to="/flights" className="hover:text-gray-200 block py-2 px-4">Flights</Link></li>
          <li><Link to="/hotels" className="hover:text-gray-200 block py-2 px-4">Hotels</Link></li>
          <li><Link to="/aboutus" className="hover:text-gray-200 block py-2 px-4">About Us</Link></li>

          {!isLoggedIn ? (
            <li className="flex flex-col md:flex-row gap-5">
              <Link to="/signup" className="hover:text-gray-200 flex py-2 px-4">
                <UserPlus className="mr-2" /> <p>Signup</p>
              </Link>
              <Link to="/login" className="hover:text-gray-200 flex py-2 px-4">
                <UserPlus className="mr-2" /> <p>Login</p>
              </Link>
            </li>
          ) : (
            <li className="relative">
              <button
                id="dropdown-button"
                className="flex items-center hover:text-yellow-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen((prev) => !prev);
                }}
              >
                <User className="mr-3 mt-3" />
                <span>{data?.fullName}</span>
                <ChevronDown className={`ml-2 transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white shadow-md rounded-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="inline-block mr-2" /> Profile
                  </Link>
                
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      {/* Main Content with Background Image */}
      <main
        className="flex-grow relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')" }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full absolute top-0 left-0"></div>
        <section className="relative z-10 text-center text-white py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Explore the World with Us</h1>
          <p className="text-lg mb-8 animate-fade-in-delayed">
            Find the best flights and hotels for your next adventure!
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition duration-300">
            Start Your Journey
          </button>
        </section>
      </main>

      {/* Next Trip */}
      <NextTrip />

      {/* Testimonials Section with Animation */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-center text-3xl font-semibold text-blue-800 mb-8 animate-slide-up">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {[
            { quote: "Amazing experience! Found the best deals and had a smooth trip.", name: "Alice W." },
            { quote: "Very easy to book and great customer service. Highly recommended!", name: "John D." },
            { quote: "Excellent platform for finding last-minute deals. Will use again!", name: "Emma R." }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="w-full sm:w-96 md:w-80 p-6 bg-gray-100 rounded-lg shadow-md transform hover:scale-105 transition duration-300 animate-fade-in"
            >
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="text-blue-600 font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
