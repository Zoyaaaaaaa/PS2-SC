import React from "react";
import { achievement } from "../assets";
import { SlGraduation } from "react-icons/sl";
import { FiVideo } from "react-icons/fi";
import { SlPeople } from "react-icons/sl";

const Achievement = () => {
  return (
    <div className="w-full bg-white py-12 md:py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0">
        <div className="flex flex-col justify-center">
          <h1 className="md:leading-[72px] text-3xl md:text-5xl font-bold">
            Our <span className="text-[#4FD1C5]">Achievements</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            We are committed to providing accessible travel solutions for
            everyone.
          </p>

          <div className="grid grid-cols-2 py-8 md:py-16 gap-4">
            <div className="flex py-4">
              <div className="p-4 bg-[#E9F8F3] rounded-xl">
                <SlGraduation size={30} className="text-[#4FD1C5]" />
              </div>
              <div className="px-3">
                <h1 className="text-xl md:text-2xl font-semibold">500+</h1>
                <p className="text-[#6D737A]">Accessible Tours</p>
              </div>
            </div>
            <div className="flex py-4">
              <div className="p-4 bg-[#FFFAF5] rounded-xl">
                <FiVideo size={30} className="text-[#FFC27A]" />
              </div>
              <div className="px-3">
                <h1 className="text-xl md:text-2xl font-semibold">2,000+</h1>
                <p className="text-[#6D737A]">Videos for Accessibility</p>
              </div>
            </div>
            <div className="flex py-4">
              <div className="p-4 bg-[#FFEEF0] rounded-xl">
                <SlGraduation size={30} className="text-[#ED4459]" />
              </div>
              <div className="px-3">
                <h1 className="text-xl md:text-2xl font-semibold">30,000+</h1>
                <p className="text-[#6D737A]">Travelers Supported</p>
              </div>
            </div>
            <div className="flex py-4">
              <div className="p-4 bg-[#F0F7FF] rounded-xl">
                <SlPeople size={30} className="text-[#0075FD]" />
              </div>
              <div className="px-3">
                <h1 className="text-xl md:text-2xl font-semibold">100,000+</h1>
                <p className="text-[#6D737A]">Community Members</p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={achievement}
          className="m-auto w-full md:order-last order-first md:w-[450px]"
          alt="Achievements"
        />
      </div>
    </div>
  );
};

export default Achievement;
