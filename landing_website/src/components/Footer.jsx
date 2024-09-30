import React from "react";
import { logo } from "../assets";
import {
  FaFacebookF,
  FaDribbble,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-white py-12 md:py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-5 grid-cols-1 gap-8 max-w-[600px] px-4 md:px-0">
        {/* Contact Us */}
        <div className="col-span-2">
          <img src={logo} className="h-[25px]" alt="Logo" />
          <h3 className="text-2xl font-bold mt-10">Contact Us</h3>
          <p className="py-2 text-[#6D737A]">Call : +123 400 123</p>
          <p className="py-2 text-[#6D737A]">
            Praesent nulla massa, hendrerit vestibulum gravida in, feugiat
            auctor felis.
          </p>
          <p className="py-2 text-[#363A3D]">Email: example@mail.com</p>
          <div className="flex gap-4 py-4">
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaFacebookF size={25} className="text-[#4DC39E]" />
            </div>
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaDribbble size={25} className="text-[#4DC39E]" />
            </div>
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaLinkedinIn size={25} className="text-[#4DC39E]" />
            </div>
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaInstagram size={25} className="text-[#4DC39E]" />
            </div>
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaBehance size={25} className="text-[#4DC39E]" />
            </div>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-2xl font-bold">Explore</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2">Home</li>
            <li className="py-2">About</li>
            <li className="py-2">Course</li>
            <li className="py-2">Blog</li>
            <li className="py-2">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-2xl font-bold">Category</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2">Design</li>
            <li className="py-2">Development</li>
            <li className="py-2">Marketing</li>
            <li className="py-2">Business</li>
            <li className="py-2">Lifestyle</li>
            <li className="py-2">Photography</li>
            <li className="py-2">Music</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold">Subscribe</h3>
          <p className="py-2 text-[#6D737A]">
            Praesent nulla massa, hendrerit vestibulum gravida in, feugiat
            auctor felis.
          </p>
          <form className="py-4">
            <input
              className="bg-[#F2F3F4] p-4 w-full rounded"
              placeholder="Email here"
            />
            <button className="w-full my-4 px-5 py-3 rounded-md bg-[#4FD1C5] text-white font-medium">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
