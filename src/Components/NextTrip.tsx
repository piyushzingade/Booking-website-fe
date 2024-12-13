import { useState } from "react";

export default function NextTrip() {
  const [visibleHotels, setVisibleHotels] = useState([false, false, false]);
  const [visibleFlights, setVisibleFlights] = useState([false, false, false]);

  const handleHotelVisibility = (index: number) => {
    setVisibleHotels((prevVisible) =>
      prevVisible.map((item, i) => (i === index ? true : item))
    );
  };

  const handleFlightVisibility = (index: number) => {
    setVisibleFlights((prevVisible) =>
      prevVisible.map((item, i) => (i === index ? true : item))
    );
  };

  return (
    <section className="bg-white py-12">
      {/* Popular Hotels Section */}
      <div className="text-center mb-10">
        <p className="text-lg font-medium text-gray-600">
          EXPLORE ACCOMMODATIONS
        </p>
        <h2 className="text-3xl font-bold text-blue-800 mt-2">
          Popular Hotels
        </h2>
        <p className="text-gray-500 mt-3">
          Discover top hotels to make your stay comfortable
        </p>
      </div>
      <div className="flex justify-center items-center space-x-6 px-6 mb-16">
        {["GraceHotel", "RoyalMansour", "CapellaUbud"].map((hotel, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHotelVisibility(index)}
            className={`relative w-1/3 overflow-hidden group cursor-pointer transition-opacity duration-500 rounded-lg shadow-lg ${
              visibleHotels[index]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src={`./src/Assets/hotels/${hotel}.png`}
              alt={hotel}
              className="w-full h-64 object-cover rounded-md transform transition-transform duration-500 group-hover:scale-105"
            />
            <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-blue-800 font-semibold px-4 py-1 rounded-full text-center">
              {hotel}
            </h3>
          </div>
        ))}
      </div>

      {/* Popular Flights Section */}
      <div className="text-center mb-10">
        <p className="text-lg font-medium text-gray-600">YOUR NEXT JOURNEY</p>
        <h2 className="text-3xl font-bold text-blue-800 mt-2">
          Popular Flight Destinations
        </h2>
        <p className="text-gray-500 mt-3">
          Explore popular destinations and plan your trip
        </p>
      </div>
      <div className="flex justify-center items-center space-x-6 px-6">
        {["NewYork", "Paris", "Tokyo"].map((city, index) => (
          <div
            key={index}
            onMouseEnter={() => handleFlightVisibility(index)}
            className={`relative w-1/3 overflow-hidden group cursor-pointer transition-opacity duration-500 rounded-lg shadow-lg ${
              visibleFlights[index]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src={`./src/Assets/flights/${city}.png`}
              alt={city}
              className="w-full h-64 object-cover rounded-md transform transition-transform duration-500 group-hover:scale-105"
            />
            <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-blue-800 font-semibold px-4 py-1 rounded-full text-center">
              {city}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}