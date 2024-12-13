import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import hotelDetails from "../mockJSONFiles/hotels.json"; 
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { RootState } from "../Redux/store";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  amenities: string[];
  price_per_night: number;
  description: string;
  images: string[];
  contact_info: {
    phone: string;
    email: string;
    address: string;
  };
  reviews: Review[];
}

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>(); 
  const hotel: Hotel | undefined = hotelDetails.find((h) => h.id === parseInt(hotelId!));

  const {isLoggedIn} = useSelector((state : RootState) => state.auth);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-75">
        <p className="text-gray-600 text-2xl">Hotel not found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://www.holidify.com/images/cmsuploads/compressed/87694465_20220223165946.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div> {/* Overlay */}
      
      <div className="relative z-10 p-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full bg-black p-10 rounded-lg shadow-lg opacity-75">
          <h2 className="text-5xl font-bold text-white mb-6 text-center">
            {hotel.name}
          </h2>
          <p className="text-center text-white text-2xl mb-6">{hotel.location}</p>
          <p className="text-yellow-500 text-center font-semibold text-xl mb-6">
            Rating: {hotel.rating} / 5
          </p>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-white mb-4">Description</h3>
            <p className="text-white text-lg leading-relaxed">{hotel.description}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-white mb-4">Amenities</h3>
            <ul className="flex flex-wrap gap-4 text-white text-lg">
              {hotel.amenities.map((amenity, index) => (
                <li key={index} className="bg-white-50 px-4 py-2 rounded-lg">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-white mb-4">Image Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {hotel.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${hotel.name} image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-white mb-4">Contact Information</h3>
            <div className="flex flex-col space-y-3 text-white text-lg">
              <p className="flex items-center">
                <FaPhone className="mr-2 text-blue-500" /> {hotel.contact_info.phone}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" /> {hotel.contact_info.email}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> {hotel.contact_info.address}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-white mb-4">Customer Reviews</h3>
            {hotel.reviews.length > 0 ? (
              <div className="space-y-6">
                {hotel.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm opacity-85">
                    <p className="font-semibold text-blue-800 text-lg">{review.user}</p>
                    <p className="text-yellow-500 text-lg">Rating: {review.rating} / 5</p>
                    <p className="text-gray-700 text-lg">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-lg">No reviews available.</p>
            )}
          </div>

          <p className="text-3xl font-bold text-white mb-8 text-center">
            Price per Night: ${hotel.price_per_night}
          </p>

          <button onClick={()=> (isLoggedIn) ? toast.success("Booking Successfully Completed!") : toast.error("Please Login to proceed booking!")} className="w-full bg-blue-600 text-white py-4 text-2xl rounded-lg font-bold hover:bg-blue-700 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;