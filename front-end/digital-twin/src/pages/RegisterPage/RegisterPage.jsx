import React from "react";
import Form_register from "./_components/Form-register.jsx";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/../components/ui/carousel.js";
import { Card, CardContent } from "@/../components/ui/card.js";
import { CheckCircle2 } from "lucide-react";

import img1 from "@/assets/wallpepar.jpg";
import img2 from "@/assets/wallpepar.jpg";
import img3 from "@/assets/wallpepar.jpg";

export default function RegisterPage() {
  const slides = [img1, img2, img3];

  return (
    <div
      className="
        min-h-screen grid grid-cols-1 md:grid-cols-2
        place-items-stretch
        bg-gradient-to-br from-[#324158] via-[#357066] to-[#75A7BD]
        text-white
      "
    >
      <div
        className="
          w-full flex items-center justify-center p-6 md:p-10
          bg-white/90 backdrop-blur
          md:rounded-r-[28px]
        "
      >
        <div className="w-full max-w-2xl">
          <Form_register />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Carousel className="absolute inset-0 h-full">
          <CarouselContent className="-ml-0 h-full">
            {slides.map((src, i) => (
              <CarouselItem key={i} className="basis-full pl-0 h-full">
                <Card className="h-full rounded-none border-0">
                  <CardContent className="p-0 h-full">
                    <img
                      src={src}
                      alt={`Destaque ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-[#324158]/85 via-[#6CB7BD]/60 to-[#34D1B7]/50
            mix-blend-multiply
          "
        />

        <div
          className="
            relative z-10 h-full w-full
            flex items-center justify-center
            p-8 md:p-12 lg:p-16
          "
        >
          <div className="max-w-xl">
            <span
              className="
                inline-block px-3 py-1 text-xs font-semibold tracking-wide
                rounded-full
                bg-[#34D1B7] text-[#324158]
                mb-4
              "
            >
              Novo por aqui?
            </span>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Bem-vindo ao seu{" "}
              <span className="text-[#feffff]">hub de monitoramento</span>.
            </h1>

            <p className="mt-3 text-white/90 text-base">
              Crie sua conta e acompanhe processos com clareza, segurança e
              rapidez — tudo em um só lugar.
            </p>

            <ul className="mt-6 space-y-2">
              {[
                "Visão unificada de prazos e andamentos",
                "Alertas inteligentes e atualizações em tempo real",
                "Relatórios elegantes prontos para compartilhar",
              ].map((t, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0" />
                  <span className="text-white/95">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-xl px-4 py-2
                  bg-white/90 text-[#324158] font-medium
                  shadow-sm ring-1 ring-white/40
                "
              >
                Comece agora — é rápido e gratuito ✨
              </div>
            </div>

            <div className="mt-10 h-1 w-40 rounded-full bg-gradient-to-r from-[#6CB7BD] via-[#34D1B7] to-[#75A7BD]" />
          </div>
        </div>

        <div className="hidden md:block absolute left-0 top-0 h-full w-px bg-white/20" />
      </div>
    </div>
  );
}
