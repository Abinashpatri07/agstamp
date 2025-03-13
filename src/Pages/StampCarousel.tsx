import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface Stamp {
  name: string;
  image: string;
}

interface StampCarouselProps {
  stampCategories: Stamp[];
}

const StampCarousel: React.FC<StampCarouselProps> = ({ stampCategories }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
   responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <h2 className="font-bold text-red-300 text-center mb-6">
        Displaying Different Stamp Categories
      </h2>
      <Slider {...settings}>
        {stampCategories.map((stamp, index) => (
          <div
            key={index}
            className={`bg-blue-700 rounded-lg shadow-lg overflow-hidden text-center p-4 transition-transform duration-300 ${
              hoveredIndex === index ? "scale-110" : "scale-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={stamp.image}
              alt={stamp.name}
              className="w-full h-40 object-contain rounded-md"
            />
            <h3 className="text-[10px] md:text-sm lg:text-lg font-semibold mt-3">{stamp.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StampCarousel;
