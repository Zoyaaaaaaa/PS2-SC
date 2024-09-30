import React, { useState } from "react";
import { logo, lock, hamburgerMenu, close } from "../assets";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const navigate = useNavigate();

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="w-full h-[80px] bg-white border-b">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        {/* Logo and App Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-[35px]" alt="Logo" />
          <span className="text-xl font-bold text-[#4FD1C5]">TravelEase</span>
        </Link>

        {/* Menu Items for larger screens */}
        <div className="hidden md:flex items-center ">
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/yatras">Yatras</Link>
            </li>
            <li>
              <a href="http://localhost:3001">AI Planner</a>
            </li>
            <li>
              <a href="http://127.0.0.1:5000/">Text-to-Sign</a>
            </li>
            {/* <li>
              <Link to="/dashboard">Dashboard</Link>
            </li> */}
            {/* <li>
              <Link to="/create-journey">Create Journey</Link>
            </li> */}
            <li>
              <Link to="/enroll">Enroll</Link>
            </li>
            <li>
              <Link to="/request-service">Request Service</Link>
            </li>
          </ul>
        </div>

        {/* Profile and Login/Logout buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-full h-8 w-8"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold text-white bg-[#4FD1C5] rounded"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <img src={lock} alt="Lock Icon" />
              <button
                className="border border-[20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
              <button
                className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold"
                onClick={() => loginWithRedirect()}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu for smaller screens */}
        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} alt="Menu Toggle" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          toggle
            ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/" onClick={handleClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/yatras">Yatras</Link>
          </li>
          <li>
            <a href="http://localhost:3001">AI-Planner</a>
          </li>
          <li>
            <a href="http://127.0.0.1:5000/">Text-to-Sign</a>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/enroll" onClick={handleClick}>
              Enroll
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/request-service" onClick={handleClick}>
              Request Service
            </Link>
          </li>

          {/* Mobile Profile and Login/Logout buttons */}
          <div className="flex flex-col my-4 gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="rounded-full h-8 w-8"
                  />
                  <span>{user.name}</span>
                </div>
                <button
                  className="border border-[20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <img src={lock} alt="Lock Icon" />
                <button
                  className="border border-[20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
                <button
                  className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold"
                  onClick={() => loginWithRedirect()}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
