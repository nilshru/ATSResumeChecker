import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Upload, FileText, Brain, Download } from "lucide-react";

function Works() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const steps = [
    {
      icon: <FileText size={24} className="text-teal-300" />,
      title: "Paste Job Description",
      desc: "Provide the target job description for accurate ATS scoring.",
    },
    {
      icon: <Upload size={24} className="text-teal-300" />,
      title: "Upload Resume",
      desc: "Select your resume in PDF or DOCX format to start the analysis.",
    },
    {
      icon: <Brain size={24} className="text-teal-300" />,
      title: "AI Analyzes",
      desc: "Our AI checks format, grammar, and keyword match instantly.",
    },
    {
      icon: <Download size={24} className="text-teal-300" />,
      title: "Get Results",
      desc: "Get ATS-friendly resume suggestions in seconds.",
    },
  ];

  return (
    <section className="relative w-full">
      {/* Polygon Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[rgb(231,220,18)] via-gray-100 to-[rgba(45,212,191,0.0)]"
        style={{
          clipPath: "polygon(0 0, 100% 50px, 100% 100%, 0% 100%)",
          top: "-60px",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 pt-10 pb-20 px-6 sm:px-12 text-white">
        <div className="max-w-8xl mx-auto text-center">
          <h2
            className="text-3xl md:text-6xl font-extrabold mb-6 text-black "
            data-aos="fade-down"
          >
            How It Works
          </h2>
          <p
            className="text-lg sm:text-xl text-center text-gray-600 max-w-xl mx-auto mb-14"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Follow these simple steps to optimize your resume and boost your
            chances of getting shortlisted.
          </p>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className="bg-white backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500 transform hover:scale-105 cursor-pointer flex flex-col justify-between text-center"
                style={{ minHeight: "320px" }}
              >
                <div className="mb-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-teal-200 shadow-lg mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black drop-shadow-md">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-muted-foreground">{step.desc}</p>
                <div className="mt-5 text-teal-400 font-bold text-lg">
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Works;
