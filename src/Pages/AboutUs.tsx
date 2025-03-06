import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-start pt-10 -mt-10">
      <div className="max-w-5xl bg-blue-500 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-red-300 mb-4">
          About Us
        </h1>
        
        <p className="text-lg text-white leading-relaxed text-center mb-4">
          Welcome to our world of <span className="font-semibold">Philately and Postal History</span>. 
          We are passionate about preserving and sharing the rich heritage of stamps, letters, and postal artifacts 
          that tell the fascinating stories of human communication across centuries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-700 mt-2">
              We aim to connect collectors, historians, and enthusiasts by providing valuable resources, expert insights, 
              and a platform to explore and appreciate rare and significant postal items.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-900">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 text-left">
              <li>Curated collections of rare and historical stamps.</li>
              <li>Detailed research and insights on postal history.</li>
              <li>A vibrant community for philatelists worldwide.</li>
              <li>Authenticity and trust in every item we showcase.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-900">Join Our Community</h2>
            <p className="text-gray-700 mt-2">
              Whether you're a seasoned collector or just beginning your journey, we invite you to explore, learn, and 
              share your passion for stamps and postal history with us.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/contact-us")}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
