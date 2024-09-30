import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const staticData = {
    ongoing: [
      { id: 1, place: "Paris", date: "2024-01-10" },
      { id: 2, place: "Rome", date: "2024-02-15" },
    ],
    past: [
      { id: 3, place: "New York", date: "2023-06-20" },
      { id: 4, place: "Tokyo", date: "2023-09-01" },
    ],
    upcoming: [
      { id: 5, place: "London", date: "2024-03-12" },
      { id: 6, place: "Dubai", date: "2024-04-18" },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Agency Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Ongoing Journeys</h2>
        <ul className="space-y-2">
          {staticData.ongoing.map((journey) => (
            <li key={journey.id} className="p-4 bg-gray-100 rounded-md shadow">
              {journey.place} on {journey.date}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Past Journeys</h2>
        <ul className="space-y-2">
          {staticData.past.map((journey) => (
            <li key={journey.id} className="p-4 bg-gray-100 rounded-md shadow">
              {journey.place} on {journey.date}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Upcoming Journeys</h2>
        <ul className="space-y-2">
          {staticData.upcoming.map((journey) => (
            <li key={journey.id} className="p-4 bg-gray-100 rounded-md shadow">
              {journey.place} on {journey.date}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/create-journey">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Create a New Journey
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
