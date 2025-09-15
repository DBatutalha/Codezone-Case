import Title from "@/components/shared/Title";
import { klips } from "@/data/constants";
import React from "react";
import Link from "next/link";
import KlipRow from "./KlipRow";
import Section from "@/components/shared/Section";
import Container from "@/components/shared/Container";

export default function Klip() {
  return (
    <Section className="h-auto  relative">
      <div className="absolute -top-4 right-0  -z-10">
        <img
          src="/Images/Klips/bg-icon.svg"
          alt="Discover"
          className="w-full h-full object-cover"
        />
      </div>
      <Container size="main">
        <Title title="Klips" icon="/Images/Klips/play.svg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {klips.map((klip) => {
            return <KlipRow key={klip.title} klip={klip} />;
          })}
        </div>
        <Link href="/blog">
          <button className="bg-white text-black font-saira-bold text-lg px-10 py-3 shadow-xl button-custom-shape flex items-center justify-center gap-2 relative min-w-[140px] mx-auto mt-16 hover:bg-gray-100 transition-colors duration-300">
            Daha Fazla Gör
          </button>
        </Link>
      </Container>
    </Section>
  );
}
