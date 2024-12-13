import { Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Denied from "./Pages/Denied";
import NotFound from "./Pages/NotFound";
import Aboutus from "./Pages/Aboutus";
import ProfilePage from "./Components/ProfilePage";
import FlightsSearchPage from "./Components/FlightsSearchPage";
import HotelsSearchPage from "./Components/HotelsSearchPage";
import FlightDetailsPage from "./Components/FlightDetailsPage";
import HotelDetailsPage from "./Components/HotelDetailsPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/flights" element={<FlightsSearchPage />} />
        <Route path="/hotels" element={<HotelsSearchPage />} />
        <Route path="/flights/:flightId" element={<FlightDetailsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
