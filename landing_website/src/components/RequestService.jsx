import React from "react";
import { useForm } from "react-hook-form";

const RequestService = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Service requested:", data);

    // Simulate sending an email to the agency
    setTimeout(() => {
      console.log("Email sent to agency:", data);
    }, 1000);

    alert(
      "Service request sent successfully! We've notified the agency and they will contact you soon."
    );
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Request a Service
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type:
            </label>
            <input
              {...register("service")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., 24/7 Care, Travel Guide"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message:
            </label>
            <textarea
              {...register("message")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Additional details about your request"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition duration-300 transform hover:scale-105"
          >
            Request Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestService;
