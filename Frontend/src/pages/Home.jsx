import React from "react";

function Home() {
  return (
    <>
      <div
        className="flex border-b-4 border-white/10 items-center justify-center flex-col gap-x-20 sm:flex-row px-10 py-10 w-full 
        bg-gradient-to-br from-[rgba(45,212,191,0.15)] via-gray-100 to-[rgba(45,212,191,0.15)] "
      >
        {/* Left Side - Text */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl sm:text-[60px] font-extrabold sm:font-bold">
            Smart Resume <span className="text-teal-400">Analyzer</span>
          </h1>
          <h1 className="text-2xl sm:text-[60px] font-extrabold sm:font-bold">
            <span className="text-teal-400">& Builder with AI</span>
          </h1>
          <p className=" mt-2 sm:mt-5 text-sm sm:text-2xl text-gray-600 sm:w-[500px]">
            Optimize your resume for any job in seconds, Check formatting,
            grammar, ATS keywords & rank instantly
          </p>
        <div className="flex items-start w-full gap-4 sm:gap-20">

          <button className="rounded-lg font-bold text-sm sm:text-xl backdrop-blur-sm
           bg-teal-400 hover:bg-teal-300 border-2 shadow-md 
           border-white-400 text-white py-2 px-4  mt-5 sm:mt-20">
            Upload Resume
          </button>
          <button className="rounded-lg font-bold text-sm sm:text-xl backdrop-blur-sm 
          bg-white/60 hover:bg-gray-100 border-2 shadow-md border-teal-400 
          text-teal-400 py-2 px-6 sm:px-8 mt-5 sm:mt-20">
            Try Sample
          </button>
        </div>
        </div>

        {/* Right Side - Robot with floating Tick */}
        <div className="relative flex justify-end items-end mt-10 sm:mt-30 w-[200px] sm:w-[300px]">
          {/* ✅ Floating Tick Icon */}
          <img
            src="/greenTick.png"
            alt="Tick"
            className="absolute w-8 sm:w-12 top-[18%] left-0 animate-bounce drop-shadow-[0_5px_10px_rgba(34,197,94,0.5)]"
          />

          {/* 🤖 Robot Image */}
          <img
            src="/robot.png"
            alt="Robot"
            className="  sm:w-[300px] drop-shadow-[0_20px_20px_rgba(45,212,191,0.3)]"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
