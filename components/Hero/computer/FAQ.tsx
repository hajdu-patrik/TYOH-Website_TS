import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Faqs } from "./FAQText";

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number>(1);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const fixTypes = {
    placeholder: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
  };

  return (
    <section className=" shadowmobile | mb-[1vw] flex flex-col">
      <div className=" mx-auto max-w-[90vw] overflow-hidden rounded-[3.5vw] px-[0.5vw] pb-[0.5vw] sm:max-w-[80vw] ">
        <h1 className=" mb-[5vw] text-center text-[6vw] font-[700] tracking-[0.15vw] sm:mb-[2vw] sm:text-[2vw]">
          Frequently Asked Questions
        </h1>
        <>
          {Faqs.map((faq) => (
            <Accordion
              open={open === faq.id}
              key={faq.id}
              draggable="false"
              className="questionanimation mb-[1vw] flex flex-col items-start rounded-2xl bg-[#342B22] px-[1vw] py-[0.5vw] font-[450] sm:mb-[0.5vw] sm:items-stretch"
              {...fixTypes}
            >
              {/* Kérdés */}
              <AccordionHeader
                onClick={() => handleOpen(faq.id)}
                className="ml-[4vw] flex w-full items-center justify-between py-[1vw] text-[5vw] font-[600] sm:py-[0.32vw] sm:text-[1.5vw] lg:text-[1.2vw] bg:ml-[1.25vw]"
                {...fixTypes}
              >
                <div className=" shadowmobile | mr-auto text-left sm:mr-0">{faq.question}</div>
                <span className="ml-auto mr-[0.5vw] sm:mr-0">
                  {open === faq.id ? (
                    <ChevronDownIcon className="mr-[1vw] w-[5vw] rotate-180 bg:ml-[0.5vw] bg:w-[1.7vw]" />
                  ) : (
                    <ChevronDownIcon className="mr-[1vw] w-[5vw] bg:ml-[0.5vw] bg:w-[1.7vw]" />
                  )}
                </span>
              </AccordionHeader>
              {/* Válasz */}
              <AccordionBody 
                className=" my-[2vw] rounded-lg px-[2vw] text-justify text-[4vw] font-[300] sm:text-[1.6vw] lg:text-[1.05vw] bg:my-[0.5vw] bg:px-[0.5vw]"
                {...fixTypes}
              >
                <span>{faq.answer}</span>
              </AccordionBody>
            </Accordion>
          ))}
        </>
      </div>
    </section>
  );
};

export default FAQ;