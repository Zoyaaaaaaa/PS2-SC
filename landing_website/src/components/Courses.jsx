import { useState } from "react";
import Slider from "react-slick";
import { Star, X } from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "Luxe Palace",
    image:
      "https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Experience luxury in the heart of the city with full accessibility.",
    rating: 4.8,
    price: 299.99,
    features: ["Wheelchair accessible", "Sign language support"],
  },
  {
    id: 2,
    name: "Seaside Resort",
    image:
      "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Relax by the beach with inclusive amenities for all guests.",
    rating: 4.5,
    price: 199.99,
    features: ["Beachfront access ramps", "Audio description"],
  },
  {
    id: 3,
    name: "Mountain Lodge",
    image:
      "https://images.pexels.com/photos/3075763/pexels-photo-3075763.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Enjoy nature with adaptive equipment and inclusive services.",
    rating: 4.7,
    price: 249.99,
    features: ["Adaptive ski equipment", "Braille signage"],
  },
  {
    id: 4,
    name: "City Center Hotel",
    image:
      "https://images.pexels.com/photos/3678511/pexels-photo-3678511.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Urban comfort with universal design for all visitors.",
    rating: 4.6,
    price: 179.99,
    features: ["Hearing loop systems", "Accessible transport"],
  },
  {
    id: 5,
    name: "Eco Retreat",
    image:
      "https://images.pexels.com/photos/2945692/pexels-photo-2945692.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Sustainable living with accessibility at the forefront.",
    rating: 4.4,
    price: 159.99,
    features: ["Sensory garden", "Quiet spaces"],
  },
  {
    id: 6,
    name: "Historic Inn",
    image:
      "https://images.pexels.com/photos/4785053/pexels-photo-4785053.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Classic charm meets modern accessibility in this unique inn.",
    rating: 4.3,
    price: 189.99,
    features: ["Elevator to all floors", "Assistive listening devices"],
  },
  {
    id: 7,
    name: "Skyline Tower",
    image:
      "https://images.pexels.com/photos/4783702/pexels-photo-4783702.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "High-rise comfort with panoramic views and full accessibility.",
    rating: 4.9,
    price: 329.99,
    features: ["Accessible balconies", "Visual alarms"],
  },
  {
    id: 8,
    name: "Lakeside Cabins",
    image:
      "https://images.pexels.com/photos/4602723/pexels-photo-4602723.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Cozy, accessible cabins perfect for a serene getaway.",
    rating: 4.2,
    price: 139.99,
    features: ["Roll-in showers", "Accessible fishing piers"],
  },
];

const HotelCard = ({ hotel, onViewReviews }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 h-[450px] flex flex-col">
    <img
      src={hotel.image}
      alt={hotel.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
      <p className="text-gray-600 mb-2 flex-grow">{hotel.description}</p>
      <div className="mt-auto">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(hotel.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({hotel.rating})</span>
        </div>
        <p className="text-lg font-bold mb-2">
          ${hotel.price.toFixed(2)} / night
        </p>
        <ul className="text-sm text-gray-600">
          {hotel.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <button
          onClick={onViewReviews}
          className="mt-2 text-sm text-teal-500 underline"
        >
          View Reviews
        </button>
      </div>
    </div>
  </div>
);

const ReviewsModal = ({ hotel, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg relative overflow-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-bold mb-4">Reviews for {hotel.name}</h2>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Feature</th>
            <th className="border px-4 py-2 text-left">Reviews</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Braille Availability</td>
            <td className="border px-4 py-2">
              <ul className="list-disc pl-5">
                <li>“Excellent Braille signage throughout the hotel.”</li>
                <li>“Helpful staff who are trained in Braille.”</li>
              </ul>
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">Wheelchair Accessibility</td>
            <td className="border px-4 py-2">
              <ul className="list-disc pl-5">
                <li>“Easy access ramps and wide doorways.”</li>
                <li>“All floors accessible via elevator.”</li>
              </ul>
            </td>
          </tr>
          {/* Add more categories as needed */}
          <tr>
            <td className="border px-4 py-2">Sign Language Support</td>
            <td className="border px-4 py-2">
              <ul className="list-disc pl-5">
                <li>
                  “Staff trained in sign language for effective communication.”
                </li>
              </ul>
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">Hearing Loop Systems</td>
            <td className="border px-4 py-2">
              <ul className="list-disc pl-5">
                <li>“Hearing loop systems available in conference rooms.”</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Hotels = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-[#E3FCFB] py-16">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="py-4">
          <h1 className="py-3 text-3xl font-bold text-[#4FD1C5]">
            Most Popular{" "}
            <span className="text-[#6D737A]">
              Hotels that will cater to your needs
            </span>
          </h1>
          <p className="text-[#6D737A]">
            Explore accessible travel experiences designed for everyone,
            including wheelchair users and those needing sign language support.
          </p>
        </div>

        <Slider {...settings} className="px-5">
          {hotels.map((hotel) => (
            <div key={hotel.id}>
              <HotelCard
                hotel={hotel}
                onViewReviews={() => setSelectedHotel(hotel)}
              />
            </div>
          ))}
        </Slider>

        {/* Reviews Modal */}
        {selectedHotel && (
          <ReviewsModal
            hotel={selectedHotel}
            onClose={() => setSelectedHotel(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Hotels;
