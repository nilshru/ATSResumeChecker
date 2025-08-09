import React from "react";
import { generateBubbles } from "../../utils/bubbleUtils";

function Main() {
  const bubbles = generateBubbles(30);

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center flex-col gap-x-20 sm:flex-row px-10  w-full 
        bg-gradient-to-br from-[rgba(45,212,191,0.3)] via-gray-100 to-[rgba(45,212,190,0.16)] overflow-hidden
        "
        style={{ marginTop: '-100px' }}
      >
        {/* Bubble Background */}
        <div className="bubbles">
          {bubbles.map((bubble) => (
            <span
              key={bubble.id}
              className="bubble"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.left}%`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`,
              }}
            ></span>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/60 via-transparent to-teal-50/40 z-0"></div>


        {/* Left Side - Text */}
        <div className="flex flex-col items-start relative z-10">
          <h1 className=" font-ubuntu text-2xl sm:text-[80px] font-extrabold  sm:font-bold">
            Smart Resume <span className="text-teal-400">Analyzer</span>
          </h1>
          <h1 className="  font-ubuntu text-2xl sm:text-[60px] font-extrabold sm:font-bold">
            <span className="text-teal-400">& Builder with AI</span>
          </h1>
          <p className=" font-ubuntu mt-2 sm:mt-5 text-sm sm:text-2xl text-gray-500 sm:w-[550px]">
            Optimize your resume for any job in seconds, Check formatting,
            grammar, ATS keywords & rank instantly
          </p>

          <div className="flex items-start w-full gap-4 sm:gap-20">
            <button
              className="rounded-lg font-bold text-sm sm:text-xl backdrop-blur-sm
           bg-teal-400 hover:bg-teal-300 border-2 shadow-lg 
           border-white-400 text-white py-2 px-4  mt-5 sm:mt-20  shadow-teal-300/50"
            >
              Upload Resume
            </button>
            <button
              className="rounded-lg font-bold text-sm sm:text-xl backdrop-blur-sm 
          bg-white/60 hover:shadow-lg border-2 shadow-md hover:bg-white border-teal-400 
          text-teal-400 py-2 px-6 sm:px-8 mt-5 sm:mt-20 shadow-teal-300/50"
            >
              Try Sample
            </button>
          </div>
        </div>

        {/* Right Side - Robot with floating Tick */}
        <div className="relative flex justify-end items-end mt-10 sm:mt-30 w-[200px] sm:w-[300px] z-10">
          <img
            src="/greenTick.png"
            alt="Tick"
            className="absolute w-8 sm:w-12 top-[18%] left-0 float-slow drop-shadow-[0_5px_10px_rgba(34,197,94,0.5)]"
          />
          <img
            src="/robot.png"
            alt="Robot"
            className="sm:w-[300px] drop-shadow-[0_20px_20px_rgba(45,212,191,0.3)]"
          />
        </div>
      </div>
    </>
  );
}

export default Main;
