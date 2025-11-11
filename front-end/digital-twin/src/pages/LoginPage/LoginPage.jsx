import React from "react";
import Form_login from "./_components/Form-login.jsx";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/../components/ui/carousel.js";

import img1 from "@/assets/wallpepar.jpg";
import img2 from "@/assets/wallpepar.jpg";
import img3 from "@/assets/wallpepar.jpg";

export default function LoginPage() {
  const slides = [img1, img2, img3];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 place-items-center px-4">
      <div className="w-full flex items-center justify-center py-6">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {slides.map((src, i) => (
              <CarouselItem
                key={i}
                className="flex items-center justify-center"
              >
                <img
                  src={src}
                  className="w-full h-[420px] object-cover rounded-xl shadow-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full flex items-center justify-center py-6">
        <Form_login />
      </div>
    </div>
  );
}
