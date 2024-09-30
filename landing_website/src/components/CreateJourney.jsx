import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";

const CreateJourney = () => {
  const { register, handleSubmit, reset } = useForm();
  const [date, setDate] = useState(new Date());

  const onSubmit = (data) => {
    const newJourney = {
      ...data,
      date: date.toISOString().split("T")[0],
      id: uuidv4(),
    };

    const existingJourneys = JSON.parse(localStorage.getItem("journeys")) || [];
    const updatedJourneys = [...existingJourneys, newJourney];
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));

    console.log("Journey Created:", newJourney);
    alert(`Journey created successfully! Journey ID: ${newJourney.id}`);
    reset();
    setDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create a New Journey
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination:
            </label>
            <input
              {...register("place")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price:
            </label>
            <input
              {...register("price")}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date:
            </label>
            <Calendar
              className="border rounded-lg p-2 w-full"
              onChange={setDate}
              value={date}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            Create Journey
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJourney;
