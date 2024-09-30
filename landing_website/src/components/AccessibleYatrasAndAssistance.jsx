import React, { useState } from "react";
import { Calendar, Clock, DollarSign, X } from "lucide-react";

const yatras = [
  {
    id: 1,
    name: "Kedarnath Yatra",
    agency: "Sacred Travels",
    description:
      "Join us for a spiritual journey to Kedarnath with full accessibility options.",
    image:
      "https://images.pexels.com/photos/8190603/pexels-photo-8190603.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2024-10-10",
    time: "8:00 AM",
  },
  {
    id: 2,
    name: "Vaishno Devi Yatra",
    agency: "Pilgrim Ventures",
    description:
      "Experience Vaishno Devi in comfort with tailored accessibility features.",
    image:
      "https://images.pexels.com/photos/2040807/pexels-photo-2040807.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2024-11-05",
    time: "7:00 AM",
  },
  {
    id: 3,
    name: "Haridwar Yatra",
    agency: "Holy Journeys",
    description:
      "A peaceful pilgrimage to Haridwar with all the necessary accommodations.",
    image:
      "https://media.gettyimages.com/id/148409883/photo/ganges.jpg?s=612x612&w=0&k=20&c=Jzi-vE60wRxGMKfPJy2ngcQkXGEhF4uHCbWLHJx77AI=",
    date: "2024-12-12",
    time: "9:00 AM",
  },
];

const volunteers = [
  {
    id: 1,
    name: "John Doe",
    agency: "Helping Hands Travels",
    services: ["Wheelchair support", "Communication assistance"],
    hourlyRate: 25,
  },
  {
    id: 2,
    name: "Jane Smith",
    agency: "Kindred Support",
    services: ["Guided tour assistance", "Translation services"],
    hourlyRate: 30,
  },
  {
    id: 3,
    name: "Raj Patel",
    agency: "Careful Guidance",
    services: ["Medical assistance", "Cultural explanation"],
    hourlyRate: 35,
  },
];

const YatraCard = ({ yatra, onBook, onSpeak }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <img
      src={yatra.image}
      alt={yatra.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{yatra.name}</h3>
      <p className="text-gray-600 mb-2">{yatra.agency}</p>
      <p className="text-gray-600 mb-4">{yatra.description}</p>
      <div className="flex items-center mb-2">
        <Calendar className="w-5 h-5 mr-2 text-teal-600" />
        <span>{yatra.date}</span>
      </div>
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-teal-600" />
        <span>{yatra.time}</span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => onBook(yatra)}
          className="flex-1 bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300 mr-2"
        >
          Book Yatra
        </button>
        <button
          onClick={() => onSpeak(yatra)}
          className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300 ml-2"
        >
          Read Aloud
        </button>
      </div>
    </div>
  </div>
);

const VolunteerCard = ({ volunteer, onBook, onSpeak }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
    <h3 className="text-xl font-semibold mb-2">{volunteer.name}</h3>
    <p className="text-gray-600 mb-2">{volunteer.agency}</p>
    <h4 className="font-semibold mb-2">Services:</h4>
    <ul className="list-disc list-inside mb-4">
      {volunteer.services.map((service, index) => (
        <li key={index} className="text-gray-600">
          {service}
        </li>
      ))}
    </ul>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <DollarSign className="w-5 h-5 mr-1 text-teal-600" />
        <span className="text-lg font-semibold">
          {volunteer.hourlyRate}/hour
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onBook(volunteer)}
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300"
        >
          Book Help
        </button>
        <button
          onClick={() => onSpeak(volunteer)}
          className="bg-gray-300 text-black px-2 py-1 rounded-full hover:bg-gray-400 transition-colors duration-300"
        >
          Read Aloud
        </button>
      </div>
    </div>
  </div>
);

const AccessibleYatrasAndAssistance = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const openYatraModal = (yatra) => {
    setSelectedBooking(yatra);
  };

  const openVolunteerModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setSelectedVolunteer(null);
  };

  const speakText = (item) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = `${item.name} by ${item.agency}. ${item.description}. ${
      item.date
    } at ${item.time || ""}`;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 to-teal-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8">
          <span className="text-teal-600">Accessible</span> Yatras & Assistance
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore accessible yatra experiences and book personalized volunteer
          support for your spiritual journey.
        </p>

        <h2 className="text-4xl font-semibold text-teal-700 mb-6">
          🚩 Upcoming Yatras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {yatras.map((yatra) => (
            <YatraCard
              key={yatra.id}
              yatra={yatra}
              onBook={openYatraModal}
              onSpeak={speakText}
            />
          ))}
        </div>

        <h2 className="text-4xl font-semibold text-teal-700 mb-6">
          🧑‍🤝‍🧑 Volunteer Assistance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteers.map((volunteer) => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              onBook={openVolunteerModal}
              onSpeak={speakText}
            />
          ))}
        </div>

        {/* Booking Modal for Yatra */}
        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                Book {selectedBooking.name}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Booking Modal for Volunteer */}
        {selectedVolunteer && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                Book {selectedVolunteer.name}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibleYatrasAndAssistance;
