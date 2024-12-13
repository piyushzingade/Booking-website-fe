import React, { useState } from "react";
import flightsData from "../mockJSONFiles/flights.json"; // Ensure this path and file structure are correct
import { Link } from "react-router-dom";

// Define the structure of a flight based on JSON data
interface Flight {
  flight_id: number;
  flight_number: string;
  airline: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

// Explicitly type `flightsData` to ensure TypeScript can interpret it correctly
const typedFlightsData: Flight[] = flightsData as Flight[];

const FlightsSearchPage: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true); // Mark that a search has been initiated
    const filteredFlights = typedFlightsData.filter((flight) => {
      const flightDate = new Date(flight.departure_time).toISOString().split("T")[0];
      return (
        flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
        (date ? flightDate === date : true)
      );
    });
    setResults(filteredFlights);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center p-6"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg')`
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg p-8 bg-black bg-opacity-70 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-blue-200 mb-6 text-center">Find Your Perfect Flight</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter origin city or airport"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination city or airport"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.length > 0 ? (
          results.map((flight) => (
            <Link to={`/flights/${flight.flight_id}`} key={flight.flight_id} className="block">
              <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {flight.airline} - {flight.flight_number}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">From:</span> {flight.origin}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">To:</span> {flight.destination}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">Departure:</span> {new Date(flight.departure_time).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-800">Arrival:</span> {new Date(flight.arrival_time).toLocaleString()}
                  </p>
                  <p className="text-blue-700 font-semibold text-lg mt-4">Price: ${flight.price}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          hasSearched && (
            <p className="text-center text-white text-lg mt-10">No flights found matching your criteria.</p>
          )
        )}
      </div>
    </div>
  );
};

export default FlightsSearchPage;
