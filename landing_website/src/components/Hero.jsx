import React from "react";
import imagebg from "../assets/imagebg.png"; // Update with the correct image path if necessary
import { AiOutlineSearch } from "react-icons/ai";

const Hero = () => {
  return (
    <div className="w-full bg-white py-12 md:py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0">
        {/* Text Section */}
        <div className="flex flex-col justify-start gap-6">
          <p className="py-2 text-2xl md:text-3xl text-[#4FD1C5] font-medium">
            YOUR TRAVEL COMPANION
          </p>

          <h1 className="md:leading-[80px] py-4 md:text-7xl text-4xl font-semibold">
            Explore <span className="text-[#4FD1C5]">Accessible</span> Travel
            for <span className="text-[#4FD1C5]">All</span>
          </h1>

          <p className="py-4 text-lg md:text-xl text-gray-600">
            Discover destinations and services for all accessibility needs, from
            wheelchair support to sign language.
          </p>

          <form className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md flex justify-between">
            <input
              className="bg-white flex-1 text-lg md:text-xl"
              type="text"
              placeholder="Where do you want to go?"
            />
            <button>
              <AiOutlineSearch
                size={24}
                className="icon"
                style={{ color: "#000" }}
              />
            </button>
          </form>
        </div>

        {/* Hero Image */}
        <img
          src={imagebg}
          className="md:w-[550px] w-[400px] transform md:translate-x-[-20px] translate-x-0"
          alt="Accessible Travel"
        />
      </div>
    </div>
  );
};

export default Hero;
