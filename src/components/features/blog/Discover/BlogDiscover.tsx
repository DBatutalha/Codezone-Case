"use client";
import DiscoverHeader from "@/components/shared/Discover/DiscoverHeader";
import React, { useState } from "react";
import DiscoverBody from "./DiscoverBody";
import BlogSidebar from "../BlogSidebar";
import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";

export default function BlogDiscover() {
  const [view, setView] = useState<"row" | "grid">("grid");
  return (
    <Section className="relative h-auto">
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <img src="/vectors/Blog/diamond.svg" alt="Discover" />
      </div>
      <Container size="main" className="relative z-10 pt-20! h-full">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <DiscoverHeader setView={setView} />
            <DiscoverBody view={view} />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
