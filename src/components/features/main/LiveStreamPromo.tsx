import React from "react";
import Image from "next/image";
import WaveEffect from "@/components/shared/WaveEffect";
import Section from "@/components/shared/Section";

export default function LiveStreamPromo() {
  return (
    <Section className="relative w-screen overflow-hidden h-[642px] max-[428px]:h-[600px] bg-[#121212]">
      {/* Desktop Layout */}
      <div
        className="hidden min-[429px]:block relative h-full mx-auto"
        style={{ width: "1440px" }}
      >
        {/* Sağ/sol büyük blur elipsler */}
        <div
          className="absolute"
          style={{
            width: "615px",
            height: "406px",
            left: "-120px",
            top: "60px",
            backgroundColor: "#121212",
            filter: "blur(120px)",
            transform: "rotate(90deg)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "615px",
            height: "406px",
            right: "-120px",
            top: "120px",
            backgroundColor: "#121212",
            filter: "blur(120px)",
            transform: "rotate(90deg)",
            borderRadius: "50%",
          }}
        />

        {/* Konser kalabalığı silüeti */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "0px",
            width: "2840px",
            height: "500px",
            left: "1400px",
          }}
        >
          <Image
            src="/Images/Twitch/bg.png"
            alt="Crowd"
            width={1440}
            height={500}
            className="object-cover object-center"
            style={{ opacity: 0.6, filter: "blur(0.3px)" }}
          />
        </div>

        {/* Sol üst Twitch logo ve yazısı */}
        <div
          className="absolute flex items-center gap-2"
          style={{ left: "350px", transform: "rotate(-3.7deg)" }}
        >
          <Image
            src="/Images/Twitch/twitch.svg"
            alt="Twitch"
            width={248}
            height={32}
            style={{ filter: "drop-shadow(0 4px 12px rgba(145,70,255,0.45))" }}
          />
          <span
            className="uppercase"
            style={{
              color: "#9146FF",
              fontWeight: 700,
              letterSpacing: "0.01em",
              fontSize: "20px",
            }}
          ></span>
        </div>

        {/* Dikey beyaz çizgi */}
        <div
          className="absolute"
          style={{
            top: "20px",
            left: "580px",
            width: "2px",
            height: "175px",
            backgroundColor: "#3B3B3B",
            transform: "rotate(-3.7deg)",
          }}
        />

        {/* Başlık bloğu */}
        <div
          className="absolute"
          style={{ left: "600px", transform: "rotate(-3.7deg)" }}
        >
          <div
            className="uppercase"
            style={{
              color: "#FFFFFF",
              fontFamily: "Saira Condensed, sans-serif",
              fontWeight: 300,
              fontSize: "68px",
              lineHeight: 1,
            }}
          >
            HER HAFTA
          </div>
          <div
            className="uppercase"
            style={{
              color: "#F0E74D",
              fontFamily: "Saira Condensed, sans-serif",
              fontWeight: 700,
              fontSize: "68px",
              lineHeight: 1,
              marginTop: "8px",
            }}
          >
            CANLIDAYIZ!
          </div>
          <div
            className="uppercase"
            style={{
              marginTop: "16px",
              color: "#FFFFFF",
              fontFamily: "Saira, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "0.015em",
            }}
          >
            Bizi Takip Edin!
          </div>
        </div>

        {/* Sol figür */}
        <Image
          src="/Images/Twitch/Boy.png"
          alt="Boy"
          width={420}
          height={437}
          className="absolute"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: "20px",
            opacity: 1,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Sağ figür */}
        <Image
          src="/Images/Twitch/girl.png"
          alt="Girl"
          width={303}
          height={531}
          className="absolute"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            right: "176px",
            opacity: 1,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Alt orta buton grubu */}
        <div
          className="absolute left-[650px] -translate-x-1/2 flex items-center justify-center"
          style={{
            top: "220px",
            width: "290px",
            height: "65px",
            background: "#151515",
            border: "1.17px solid #2A2A2A",
            borderRadius: "18.7px",
            transform: "rotate(-4deg)",
            padding: "12px",
            gap: "12px",
          }}
        >
          <button
            className="flex items-center gap-2"
            style={{
              background: "#864CF6",
              color: "#FFFFFF",
              borderRadius: "7px",
              padding: "10px 14px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "0 6px 18px rgba(134,76,246,0.35)",
            }}
          >
            <Image
              src="/vectors/Twitch/hearth.svg"
              alt="Heart"
              width={16}
              height={16}
            />
            Takip Et
          </button>
          <button
            className="flex items-center gap-2"
            style={{
              background: "#222123",
              color: "#FFFFFF",
              borderRadius: "7px",
              padding: "10px 14px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              border: "1px solid #2A2A2A",
            }}
          >
            <Image
              src="/vectors/Twitch/star.svg"
              alt="Star"
              width={16}
              height={16}
            />
            Abone Ol
            <span style={{ fontSize: "12px", opacity: 0.85 }}>▾</span>
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="hidden max-[428px]:block relative h-full w-full px-4">
        {/* Mobile Twitch Branding */}
        <div className="absolute top-20 left-12 z-30  scale-150">
          <Image
            src="/Images/Twitch/twitch.svg"
            alt="Twitch"
            width={120}
            height={16}
            style={{ filter: "drop-shadow(0 4px 12px rgba(145,70,255,0.45))" }}
          />
        </div>

        {/* Mobile Dikey Çizgi */}
        <div
          className="absolute z-30"
          style={{
            top: "85px",
            left: "185px",
            width: "2px",
            height: "85px",
            backgroundColor: "#3B3B3B",
            transform: "rotate(-4deg)",
          }}
        />

        {/* Mobile Main Content */}
        <div className="absolute top-20 left-12 right-4 z-30 scale-120">
          <div className="text-center">
            <h1
              className="text-2xl text-white mb-0"
              style={{
                transform: "translateX(28px) rotate(-4deg)",
                fontFamily: "Saira Condensed, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.015em",
              }}
            >
              HER HAFTA
            </h1>
            <h1
              className="text-2xl text-[#f0e74d] mb-0 font-bold"
              style={{
                transform: "translateX(35px) rotate(-4deg)",
                fontFamily: "Saira Condensed, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.015em",
              }}
            >
              CANLIDAYIZ!
            </h1>

            <p
              className="text-xs text-white mb-4 font-bold"
              style={{
                transform: "translateX(30px) rotate(-4deg)",
                fontFamily: "Saira, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.015em",
              }}
            >
              Bizi Takip Edin!
            </p>

            {/* Mobile Buttons */}
            <div
              className="flex gap-3 justify-center scale-80 mt-6"
              style={{ transform: "translateX(-10px) rotate(-4deg)" }}
            >
              <button
                className="flex items-center gap-2 bg-[#864CF6] text-white px-4 py-2 rounded-lg text-sm font-bold"
                style={{ boxShadow: "0 6px 18px rgba(134,76,246,0.35)" }}
              >
                <Image
                  src="/vectors/Twitch/hearth.svg"
                  alt="Heart"
                  width={14}
                  height={14}
                />
                Takip Et
              </button>
              <button className="flex items-center gap-2 bg-[#222123] text-white px-4 py-2 rounded-lg text-sm font-bold border border-[#2A2A2A]">
                <Image
                  src="/vectors/Twitch/star.svg"
                  alt="Star"
                  width={14}
                  height={14}
                />
                Abone Ol
                <span className="text-xs opacity-85">▾</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Background Elements */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Concert Crowd Background */}
          <div className="absolute bottom-0 left-0 w-full h-[600px]">
            <Image
              src="/Images/Twitch/bg.png"
              alt="Crowd"
              fill
              sizes="100vw"
              className="object-cover object-center"
              style={{ opacity: 1, filter: "blur(1px)" }}
            />
          </div>

          {/* Mobile Characters */}
          <div className="absolute bottom-0 left-0 w-full h-[400px] flex items-end justify-between px-4 pb-8">
            {/* Left Character */}
            <Image
              src="/Images/Twitch/Boy.png"
              alt="Boy"
              width={180}
              height={200}
              className="object-cover scale-125"
            />

            {/* Right Character */}
            <Image
              src="/Images/Twitch/girl.png"
              alt="Girl"
              width={160}
              height={220}
              className="object-cover -mb-12"
            />
          </div>
        </div>
      </div>
      <WaveEffect height={200} />
    </Section>
  );
}
