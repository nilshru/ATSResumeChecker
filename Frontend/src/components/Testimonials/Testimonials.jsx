import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { generateBubbles } from "../../utils/bubbleUtils";

function Testimonials() {
    const bubbles = generateBubbles(30);
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  const testimonials = [
    {
      text: "Got my dream job after optimizing with Resume Qualify!",
      name: "Amit Sharma",
      role: "Software Engineer",
      company: "TCS",
    },
    {
      text: "Resume Qualify increased my interview calls by 3x. Highly recommended!",
      name: "Priya Singh",
      role: "Data Analyst",
      company: "Capgemini",
    },
    {
      text: "Super easy to use and highly effective for ATS optimization.",
      name: "Rahul Verma",
      role: "Product Manager",
      company: "Infosys",
    },
    {
      text: "My resume finally stands out. Got calls within a week!",
      name: "Sneha Gupta",
      role: "UI/UX Designer",
      company: "Wipro",
    },
  ];

  const companies = [
    "/tcs-logo.png",
    "/capgemini-logo.png",
    "/infosys-logo.png",
    "/wipro-logo.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    ltr: true, 
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="relative w-full">
      {/* Polygon Background */}
     
      <div
        className="absolute inset-0 bg-gradient-to-bl from-[rgba(0,242,255,0.6)] via-gray-100 to-[rgba(45,212,191,0.15)]"
        style={{
          clipPath: "polygon(0 50px, 100% 0, 100% 100%, 0% 100%)",
          top: "-60px",
          zIndex: 0,
        }}
      ></div>

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


      {/* Content */}
      <div className="relative z-10 pt-16 pb-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-extrabold mb-10 text-black drop-shadow-lg"
            data-aos="fade-down"
          >
            What Our Users Say
          </h2>

          <div dir="rtl">
  <Slider {...settings}>
    {testimonials.map((t, i) => (
      <div key={i} className="px-4 max-w-7xl sm:max-w-xl">
        <div
          className="bg-white backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
          data-aos="fade-up"
        >
          <FaQuoteLeft className="text-teal-400 text-3xl mb-4" />
          <p className="text-gray-700 italic mb-4 leading-relaxed">
            "{t.text}"
          </p>
          <p className="font-bold text-black">{t.name}</p>
          <p className="text-gray-500 text-sm">
            {t.role} @ {t.company}
          </p>
        </div>
      </div>
    ))}
  </Slider>
</div>

          {/* Trust Logos */}
          <div className="mt-16">
            <h3
              className="text-xl font-semibold mb-6 text-black"
              data-aos="fade-up"
            >
              Trusted by Candidates Shortlisted in
            </h3>
            <div
              className="flex flex-wrap justify-center gap-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {companies.map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Company Logo"
                  className="h-12 sm:h-16 object-contain opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
