import React from "react";
import Categories from "./Categories";
import CTO from "./CTO";

export default function Sidebar() {
  return (
    <>
      <div className="hidden min-[429px]:block">
        <Categories />
      </div>
      <CTO />
    </>
  );
}
