import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SliderData } from "../handheld/Sliderdata";

const MobileTeam = dynamic(() => import("../handheld/MobileTeam"));

const Team: React.FC = () => {
  return (
    <>
      <section className=" shadowmobile | hidden min-h-[50vw] flex-col bg:flex">
        <h1 className="mb-[5vw] text-center text-[6vw] font-bold tracking-[0.15vw] bg:mb-[2vw] bg:text-[2vw]">
          Team
        </h1>
        <div className="hidden h-full items-center justify-center bg:flex select-none ">
          {SliderData.map((slide) => {
            return (
              <div key={slide.id}>
                <a href={slide.link} target="_blank">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={400}
                    height={524}
                    draggable="false"
                    className="box h-[25vw] w-[25vw] object-contain"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </section>
      <MobileTeam />
    </>
  );
};

export default Team;
