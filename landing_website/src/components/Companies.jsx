import React from "react";
import {
  companyLogo1,
  companyLogo2,
  companyLogo3,
  companyLogo4,
} from "../assets";

const Companies = () => {
  return (
    <div className="w-full bg-white py-[50px]">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <h1 className="text-center text-2xl font-bold text-[#000000]">
          Supported by Accessible Travel Leaders
        </h1>
        <p className="text-center text-[#000000] text-xl">
          Leading companies partner with us to ensure accessibility for all
          travelers.
        </p>

        {/* Logos Section */}
        <div className="flex justify-center py-8 md:gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <img src={companyLogo1} alt="Company 1" />
            <img src={companyLogo2} alt="Company 2" />
            <img src={companyLogo3} alt="Company 3" />
            <img src={companyLogo4} alt="Company 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
