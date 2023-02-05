import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Photo1 from "../img/photo1.jpg";
import Photo2 from "../img/photo2.jpg";
import Photo3 from "../img/photo3.jpg";
import Photo4 from "../img/photo4.jpg";
import Photo5 from "../img/photo5.jpg";
import Photo6 from "../img/photo6.jpg";

function Slider() {
  const sliderImages = [
    {
      url: Photo1,
    },
    {
      url: Photo2,
    },
    {
      url: Photo3,
    },
    {
      url: Photo4,
    },
    {
      url: Photo5,
    },
    {
      url: Photo6,
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === sliderImages.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? sliderImages.length - 1 : current - 1);
  };

  // slidebar auto change

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === sliderImages.length - 1 ? 0 : current + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="max-w-[1400px] h-[680px] w-full m-auto py-16 px-4 realtive group">
      <div
        style={{ backgroundImage: `url(${sliderImages[current].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 "
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[%50] left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[%50] right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}

export default Slider;
