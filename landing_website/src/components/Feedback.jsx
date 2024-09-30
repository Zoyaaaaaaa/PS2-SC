import React from "react";
import Slider from "react-slick";
import FeedbackCard from "./FeedbackCard";

const Feedback = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white py-12 md:py-32">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="py-4">
          <h1 className="py-3 text-2xl md:text-3xl font-bold">
            Feedback from{" "}
            <span className="text-[#4FD1C5]">People with Disabilities</span>
          </h1>
          <p className="text-[#6D737A]">
            Here’s what our users say about their experiences.
          </p>
        </div>

        <Slider {...settings}>
          <FeedbackCard feedback="This platform has made traveling so much easier for me. The accessibility features are outstanding!" />
          <FeedbackCard feedback="I love how I can find hotels that cater to my needs. It truly feels like I’m being considered." />
          <FeedbackCard feedback="The AI trip planner is a game-changer! It understands my requirements perfectly." />
        </Slider>
      </div>
    </div>
  );
};

export default Feedback;
