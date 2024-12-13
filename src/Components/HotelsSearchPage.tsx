import React, { useState } from "react";
import hotelsData from "../mockJSONFiles/hotels.json";
import { Link } from "react-router-dom";

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  amenities: string[];
  price_per_night: number;
}

const HotelsSearchPage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minRating, setMinRating] = useState<number | undefined>();
  const [results, setResults] = useState<Hotel[]>([]);

  const handleSearch = () => {
    // Filter hotels based on search criteria
    const filteredHotels = hotelsData.filter((hotel) => {
      return (
        hotel.location.toLowerCase().includes(location.toLowerCase()) &&
        (maxPrice ? hotel.price_per_night <= maxPrice : true) &&
        (minRating ? hotel.rating >= minRating : true)
      );
    });
    setResults(filteredHotels);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
      style={{
        backgroundImage: `url('https://d27s5h82rwvc4v.cloudfront.net/uploads/63e0ae31497191675669041.jpg')`,
      }}
    >
      {/* Search Form */}
      <div className="bg-black bg-opacity-70 w-full max-w-lg p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-blue-200 mb-6 text-center">Find Your Ideal Hotel</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city or location"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Maximum Price per Night</label>
            <input
              type="number"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter max price"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Minimum Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              value={minRating || ""}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter min rating (0-5)"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Search Hotels
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.length > 0 ? (
          results.map((hotel) => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="block">
              <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">Location:</span> {hotel.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">Rating:</span> {hotel.rating} / 5
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">Amenities:</span> {hotel.amenities.join(", ")}
                  </p>
                  <p className="text-blue-700 font-semibold text-lg mt-4">Price per Night: ${hotel.price_per_night}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-white text-lg mt-10">No hotels found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default HotelsSearchPage;