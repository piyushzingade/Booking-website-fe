import Footer from "../Components/Footer";

function Aboutus() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TravelSite</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:text-yellow-300 text-lg transition duration-200">
                  Back to Homepage
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-16 bg-gradient-to-br from-white to-gray-100">
        <div className="container mx-auto px-4">
          <section className="bg-white bg-opacity-95 text-gray-800 py-12 rounded-lg shadow-lg">
            <h2 className="text-5xl font-extrabold text-center text-teal-600 mb-10">
              About Us
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              <section className="md:w-1/2 px-4 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-4 text-blue-600">TravelSite</h3>
                <h4 className="text-xl text-teal-500 font-semibold mb-4">
                  Contact Us: 913-686-5327 | Email: support@travelsite.com
                </h4>
                <p className="leading-relaxed mb-6">
                  At Travelsite, we're passionate about making your travel dreams a reality. We’re your one-stop shop for all your travel needs, offering a wide range of hotel and flight booking options to destinations around the globe.
                </p>

                <h3 className="text-2xl font-semibold mb-3 text-blue-500">Our Commitment to You</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>Personalized Service:</strong> Our dedicated team is committed to providing personalized assistance, guiding you through every step of your booking process.</li>
                  <li><strong>Best Deals:</strong> We scour the internet to find the best deals on hotels and flights, ensuring you get the most value for your money.</li>
                  <li><strong>Hassle-Free Booking:</strong> Our user-friendly platform makes booking your travel plans a breeze.</li>
                  <li><strong>24/7 Support:</strong> Our customer support team is available around the clock to answer your questions and assist with any issues.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3 text-blue-500">Why Choose Travelsite?</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>Extensive Network:</strong> We have access to a vast network of hotels and airlines, offering a wide range of options to suit every budget and preference.</li>
                  <li><strong>Secure Transactions:</strong> Your personal information and payment details are safe with us. We use the latest security measures to protect your data.</li>
                  <li><strong>Expert Advice:</strong> Our travel experts can provide personalized recommendations based on your interests and budget.</li>
                </ul>

                <p className="leading-relaxed mt-6">
                  Whether you're planning a romantic getaway, a family vacation, or a business trip, Travelsite is your trusted partner. Book your next adventure with us today!
                </p>
              </section>

              <div className="md:w-1/2 px-4">
                <img
                  src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?cs=srgb&dl=pexels-freestockpro-3278215.jpg&fm=jpg"
                  alt="Travel Experience"
                  className="rounded-lg shadow-lg w-full h-auto object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Aboutus;
