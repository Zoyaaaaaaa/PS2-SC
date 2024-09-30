import React, { useState } from 'react';
import { FaHotel, FaSignLanguage, FaLanguage, FaExclamationTriangle, FaRobot, FaRoute, FaMapMarkedAlt, FaTimes } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-xl" onClick={onClick}>
    <div className="text-[#4FD1C5] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Modal = ({ feature, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{feature.title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>
      </div>
      <div className="text-[#4FD1C5] mb-4">{feature.icon}</div>
      <p className="text-gray-700 mb-4">{feature.fullDescription}</p>
    </div>
  </div>
);

const AccessibilityFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: <FaHotel size={40} />,
      title: "Accessibility-Based Hotel Recommendations",
      description: "Find hotels that cater to your accessibility needs.",
      fullDescription: "Our advanced algorithm analyzes hotels based on various accessibility criteria, including wheelchair ramps, elevator access, visual and auditory aids, and more. We provide personalized recommendations to ensure that every traveler finds accommodations that perfectly suit their specific needs, making your stay comfortable and stress-free."
    },
    {
      icon: <FaSignLanguage size={40} />,
      title: "Sign Language Detection",
      description: "Our system can detect sign language for seamless communication.",
      fullDescription: "Using cutting-edge computer vision technology, our app can recognize and interpret sign language in real-time. This feature bridges communication gaps, allowing deaf and hard-of-hearing users to interact more easily with hotel staff, tour guides, and other service providers, enhancing the overall travel experience."
    },
    {
      icon: <FaLanguage size={40} />,
      title: "Text-to-Sign Language",
      description: "Convert text to sign language for better accessibility.",
      fullDescription: "Our innovative text-to-sign language converter transforms written text into animated sign language avatars. This feature makes written information, such as hotel policies, tour descriptions, or menu items, accessible to deaf travelers who prefer sign language, ensuring that crucial information is available to all users regardless of their hearing ability."
    },
    {
      icon: <FaExclamationTriangle size={40} />,
      title: "SOS for Emergency",
      description: "Quick access to emergency services while traveling.",
      fullDescription: "With just one tap, our SOS feature connects travelers to local emergency services, provides their exact location, and alerts emergency contacts. It also includes pre-set medical information and accessibility needs, ensuring that first responders are fully informed. This feature offers peace of mind to travelers with disabilities and their families."
    },
    {
      icon: <FaRobot size={40} />,
      title: "Voice Chatbot",
      description: "AI-powered assistance through voice commands.",
      fullDescription: "Our sophisticated AI chatbot understands and responds to voice commands, making it easier for users with mobility or visual impairments to access information and services. From booking reservations to getting local recommendations, the chatbot provides hands-free, intelligent assistance throughout your journey."
    },
    {
      icon: <FaRoute size={40} />,
      title: "AI Trip Planner",
      description: "Intelligent planning tool for accessible travel.",
      fullDescription: "Our AI Trip Planner considers your accessibility needs, preferences, and travel style to create personalized itineraries. It suggests accessible attractions, restaurants, and transportation options, and can adjust plans in real-time based on weather, crowd levels, or unexpected closures, ensuring a smooth and enjoyable trip for all travelers."
    },
    {
      icon: <FaMapMarkedAlt size={40} />,
      title: "Maps Integration",
      description: "Navigate with accessibility in mind.",
      fullDescription: "Our integrated maps feature not only provides navigation but also highlights accessible routes, entrances, and facilities. It includes information on sidewalk conditions, curb cuts, and elevation changes, helping travelers with mobility challenges plan their routes effectively. The feature also allows users to contribute and update accessibility information, creating a community-driven resource for accessible travel."
    }
  ];

  return (
    <div className="bg-[#E3FCFB]  py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our <span className="text-[#4FD1C5]">Features</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            We offer innovative solutions to enhance accessibility for all travelers.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              onClick={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </div>
      {selectedFeature && (
        <Modal 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
};

export default AccessibilityFeatures;