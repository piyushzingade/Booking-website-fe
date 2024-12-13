import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useAppDispatch } from "../Helpers/Hooks";
import { updateProfile, logout, getUserData } from "../Redux/Slices/authSlice.reducer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../Assets/backgroundimage-profile.jpg"; 

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.auth);
  const [fullName, setFullName] = useState(data?.fullName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const handleProfileUpdate = () => {
    dispatch(updateProfile([user?.id, { fullName, email, phoneNumber }]));
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await dispatch(getUserData()).unwrap();
      setUser(userData);
    };
    loadUserData();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 max-w-lg mx-auto w-80">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          User Profile
        </h1>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <button
            onClick={handleProfileUpdate}
            className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <Link
            to="/"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Back To Home
          </Link>

        </div>
      </div>
    </div>
  );
}
