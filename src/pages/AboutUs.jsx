import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header'; // Optional if you want header here

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
     
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-3xl font-semibold text-green-600 mb-2">
            About Smart Food Analyzer
          </h1>

          <p className="text-gray-700 leading-relaxed">
            Smart Food Analyzer is built to help
            people make better food choices. It scans food items, evaluates
            their nutritional quality, and helps users stay aware of what they
            consume daily.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our goal is to simplify food awareness using modern technology and
            science-backed nutrition data — so that choosing healthy products
            becomes effortless.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower everyone to eat smarter, live better, and understand
              food in a way that promotes lifelong wellness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Why Choose Us
            </h2>
            <ul className="list-disc list-inside text-left inline-block text-gray-700 space-y-2">
              <li>Instant product scanning and nutrition analysis</li>
              <li>AI-based health recommendations</li>
              <li>Trusted data and ingredient breakdown</li>
              <li>Minimal design, easy to use interface</li>
              <li>100% privacy-focused — no data sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To build a world where food transparency is universal, and every
              individual can make healthy decisions with confidence.
            </p>
          </section>
        </div>
      </div>

     
    </div>
  );
};

export default AboutUs;