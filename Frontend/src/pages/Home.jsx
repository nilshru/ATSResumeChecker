import React from "react";

function Home() {
  return (
    <>
      <div className="flex justify-between flex-col sm:flex-row px-10 py-10 w-full">
        {/* Left Side - Text */}
        <div className="flex flex-col items-start">
          <h1 className=" text-2xl sm:text-[50px] text-white font-bold">
            Smart Resume Analyzer
          </h1>
          <h1 className=" text-2xl sm:text-[50px] text-white font-bold">
            & Builder with AI
          </h1>
          <p className="text-white mt-5 sm:text-[20px] sm:w-[500px]">Optimize your resume for any 
            job in seconds, Check formating, grammar, ATS keywords & rank instantly
          </p>

          <button className="rounded-lg backdrop-blur-sm bg-orange-300 hover:bg-orange-600 border-2 shadow-md border-white-400 text-white py-2 px-4 mt-20">
            Upload Resume
          </button>

        </div>

        {/* Right Side - Image with shadow */}
        <div className="flex justify-end">

          <img
            className="w-[300px] drop-shadow-[0_5px_5px_rgba(0,251,255,0.5)]"
            src="/robot.png"
            alt="Robot"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
