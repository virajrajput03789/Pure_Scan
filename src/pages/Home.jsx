import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold text-green-600">
            Eat Smarter. Live Better.
          </h1>
          <p className="text-lg text-gray-700">
            PureScan Helps You To Scan a Food Products Barcode And Understand Their Nutritional Value, And Make Informed Choices — Instantly.
          </p>
          <Link
            to="/scan"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition"
          >
            Start Scanning
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img src="/scanItem1.jpg" alt="Scan" className="mx-auto w-15 h-15 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Scan Products</h3>
            <p className="text-gray-600 mt-2">Instant barcode scanning for food items and cosmetics.</p>
          </div>
          <div>
            <img src="/HealthScores.jpg" alt="Score" className="mx-auto w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Health Score</h3>
            <p className="text-gray-600 mt-2">Get a clear score based on nutrition, additives, and ingredients.</p>
          </div>
          <div>
            <img src="/PrivacyFirst.jpg" alt="Privacy" className="mx-auto w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Privacy First</h3>
            <p className="text-gray-600 mt-2">No ads, no data sharing — your health, your control.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Join the Movement</h2>
        <p className="text-gray-700 mb-6">
          Thousands are choosing smarter food habits every day. Be part of the change.
        </p>
        <Link
          to="/aboutUs"
          className="inline-block bg-green-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
        >
          Learn More
        </Link>
      </section>

      
    </div>
  );
};

export default Home;
