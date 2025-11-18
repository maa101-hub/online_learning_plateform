import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const subjects = [
  {
    title: "Computer Science",
    description: "Learn programming, data structures, and algorithms.",
    image: "/images/cs.jpg",
  },
  {
    title: "Mathematics",
    description: "Master algebra, calculus, and more.",
    image: "/images/math.jpg",
  },
  {
    title: "Physics",
    description: "Understand motion, energy, and the universe.",
    image: "/images/physics.jpg",
  },
  {
    title: "Biology",
    description: "Explore life sciences from cells to ecosystems.",
    image: "/images/bio.jpg",
  },
  {
    title: "English",
    description: "Improve grammar, writing, and communication.",
    image: "/images/english.jpg",
  },
];

const SubjectSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white py-12 max-w-screen overflow-clip">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Our Streams</h2>
        <Slider {...settings}>
          {subjects.map((subject, idx) => (
            <div key={idx} className="px-3 h-full ">
              <div className="bg-indigo-50 h-[240px] rounded-xl shadow-md overflow-hidden transition transform hover:scale-105">
               
                <div className="p-4 h-full">
                  <h3 className="text-xl font-semibold text-indigo-700 text-center">{subject.title}</h3>
                  <img src={subject.image} alt={subject.title} className="w-full h-36 object-cover" />
                  <p className="text-gray-600 text-sm mt-2">{subject.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SubjectSlider;
