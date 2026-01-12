import React from "react";
import { FEATURE_HIGHLIGHTS } from "./FeatureHighlights.constants";
import Container from "@/components/ui/Container";

const FeatureHighlights = () => {
  return (
    <Container className="bg-light">
      <div className="w-full">
        <div
          className="
        grid 
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
        gap-6
      "
        >
          {FEATURE_HIGHLIGHTS.map((item) => (
            <div
              key={`feature-${item.title}`}
              className="flex items-center gap-4 p-4 rounded-lg"
            >
              <div className="bg-primary rounded-full p-3 flex items-center justify-center">
                {React.cloneElement(item.icon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
              <div className="flex flex-col gap-[4px]">
                <h3 className="font-semibold text-black text-base">
                  {item.title}
                </h3>
                <p className="text-gray text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeatureHighlights;
