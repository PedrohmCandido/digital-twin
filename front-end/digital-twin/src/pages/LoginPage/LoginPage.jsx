import React from "react";
import Form_login from "./_components/Form-login.jsx";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/../components/ui/carousel.js";
import { Card, CardContent } from "@/../components/ui/card.js";

import img1 from "@/assets/wallpepar.jpg";
import img2 from "@/assets/wallpepar.jpg";
import img3 from "@/assets/wallpepar.jpg";

export default function LoginPage() {
  const slides = [img1, img2, img3];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 place-items-center px-4">
      <div>
        <Carousel className="w-full max-w-md md:max-w-lg">
          <CarouselContent className="ml-2">
            {slides.map((src, i) => (
              <CarouselItem key={i} className="pl-2 basis-full">
                <Card className="overflow-hidden rounded-xl">
                  <CardContent className="p-0">
                    <img
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className="w-full h-[320px] md:h-[420px] object-cover block"
                      loading="eager"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div className="w-full flex items-center justify-center py-6">
        <Form_login />
      </div>
    </div>
  );
}
