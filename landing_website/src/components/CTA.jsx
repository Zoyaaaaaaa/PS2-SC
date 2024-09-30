import React from "react";
import { cta } from "../assets";

const CTA = () => {
  return (
    <div className="w-full bg-[#E3FCFB] py-12 md:py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center px-4 md:px-0">
        <img
          src="https://img.freepik.com/free-vector/people-with-different-disabilities-waving-hand_107791-12541.jpg?size=626&ext=jpg&ga=GA1.1.668285453.1724958645&semt=ais_hybrid"
          className="w-[300px] md:w-[650px] mx-auto"
          alt="Accessible travel"
        />

        <div>
          <h1 className="py-2 text-2xl md:text-3xl font-semibold">
            Join <span className="text-[#4FD1C5]">World's largest</span>{" "}
            Accessible travel guide for people with disabilities.
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Be a part of the community!
          </p>
          <button className="max-w-full my-4 px-8 py-5 rounded-md bg-[#4FD1C5] text-white font-bold">
            Sign Up For Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
