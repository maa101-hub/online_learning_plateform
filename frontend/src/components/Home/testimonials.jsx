// TestimonialsSlider.jsx
import React from "react";
import Slider from "react-slick";
import { testimonials } from "./testimonialsData";

const TestimonialsSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed: 1500,
    speed: 800,
    rows: 2,
    slidesPerRow: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          rows: 1,
          slidesPerRow: 1
        }
      }
    ]
  };

  return (
    <div id="testimonials" className="max-w-full mx-auto py-6 px-6 overflow-clip bg-amber-600">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        What Our Students Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((student, index) => (
          <div key={index} className="p-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{student.name}</h4>
                  <p className="text-sm text-indigo-500">{student.course}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-auto">“{student.feedback}”</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsSlider;
