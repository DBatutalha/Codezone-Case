import React from "react";
import ContentFeed from "./ContentFeed/ContentFeed";
import Sidebar from "./Sidebar/Sidebar";
import Section from "@/components/shared/Section";
import Container from "@/components/shared/Container";

export default function ContentDiscovery() {
  return (
    <Section className="min-h-screen">
      <Container
        size="main"
        className="grid grid-cols-3 gap-16 mobile-grid-3 max-[428px]:grid-cols-1 max-[428px]:gap-4"
      >
        <div className="col-span-2 max-[428px]:col-span-1">
          <ContentFeed />
        </div>
        <div className="col-span-1 flex flex-col min-h-full py-8 max-[428px]:py-4">
          <Sidebar />
        </div>
      </Container>
    </Section>
  );
}
