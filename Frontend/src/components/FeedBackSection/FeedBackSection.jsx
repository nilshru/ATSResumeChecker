import React from "react";

function FeedBackSection() {
  return (
    <section className="relative w-full">
      {/* Polygon Background */}
     
      <div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(136,0,255,0.6)] via-gray-100 to-[rgba(45,212,191,0.15)]"
        style={{
          clipPath: "polygon(0 0px, 100% 50px, 100% 100%, 0% 100%)",
          top: "-60px",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 z-10 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Share Your Feedback</h2>
        <form className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <input
            type="text"
            placeholder="Current Position"
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <textarea
            placeholder="Your Comment"
            rows="3"
            className="w-full px-4 py-2 rounded-md text-black"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-white text-teal-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default FeedBackSection;
