import React from "react";
import { Layout, Palette, Search, FileDown } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
function Features() {
      useEffect(() => {
    AOS.init({
      duration: 600, // animation speed (ms)
      once: true,    // scroll karke wapas aane par repeat na ho
    });
  }, []);
  const features = [
    {
      icon: <Layout size={24} className="text-primary" />,
      title: "Professional Templates",
      description:
        "Choose from dozens of ATS-optimized templates designed by resume experts and hiring managers.",
    },
    {
      icon: <Palette size={24} className="text-primary" />,
      title: "Easy Customization",
      description:
        "Personalize colors, fonts, layouts, and sections to match your style and industry requirements.",
    },
    {
      icon: <Search size={24} className="text-primary" />,
      title: "ATS-Friendly",
      description:
        "Get through applicant tracking systems with optimized resume formats that hiring software can read.",
    },
    {
      icon: <FileDown size={24} className="text-primary" />,
      title: "Multiple Export Options",
      description:
        "Download your resume as PDF, DOCX, or share a direct link with your potential employers.",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Background with only LEFT side tilt */}
      <div
        className="absolute inset-0 bg-gradient-to-bl  from-[rgba(45,212,191,0.6)] via-gray-100 to-[rgba(45,212,191,0.15)]"
        style={{
          clipPath: "polygon(0 50px, 100% 0, 100% 100%, 0% 100%)",
          top: "-60px",
          zIndex: 0,
        }}
      ></div>

      {/* Content (Heading + Features) */}
      <div className="relative flex flex-col justify-center items-center flex-grow py-20 sm:py-32 z-10 overflow-x-hidden">
        {/* Heading Section */}
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Why Choose Us</h1>
        <p className=" text-lg sm:text-xl text-center text-gray-500 max-w-xl mx-auto">
          Our platform makes resume creation simple, effective, and tailored to get you noticed.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 mt-16 w-[90%] md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
               data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="glass-card p-6 transition-all shadow-lg hover:shadow-2xl bg-white rounded-lg"
            >
              <div className="mb-4 text-teal-400 p-3 rounded-full inline-block glass">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
