import React, { useState, useEffect } from "react";
import {
  Hero,
  Navbar,
  Companies,
  Courses,
  Achievement,
  Categories,
  Feedback,
  CTA,
  Footer,
} from "./components";
import "./App.css";
import AccessibleYatrasAndAssistance from "./components/AccessibleYatrasAndAssistance";

const App = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    // In a real application, you'd fetch this data from an API
    const storedJourneys = JSON.parse(localStorage.getItem("journeys")) || [];
    setJourneys(storedJourneys);
  }, []);

  return (
    <div>
      <Hero />
      <Companies />
      <Courses />
      <Achievement />
      <Categories />
      <Feedback />
      <CTA />

      {/* New section to display created journeys */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {/* Available Journeys */}
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeys.map((journey) => (
              <div
                key={journey.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{journey.place}</h3>
                <p className="text-gray-600 mb-2">Date: {journey.date}</p>
                <p className="text-gray-600 mb-4">Price: ${journey.price}</p>
                <p className="text-sm text-gray-500">
                  Journey ID: {journey.id}
                </p>
              </div>
            ))}
          </div> */}
          {/* <AccessibleYatrasAndAssistance /> */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
