const Footer: React.FC = () => {
  return (
    <footer className=" shadowmobile | footeranimation flex flex-col items-center py-2 sm:flex-row sm:justify-between sm:space-y-0">
      <div className="text-center text-[4vw] font-extralight md:ml-32 md:text-right bg:ml-24 bg:text-[1.5vw]">
        &copy; Copyright 2023 -{" "}
        <abbr title="The Yard Of Horror" className="no-underline">
          TYOH
        </abbr>
        - All rights reserved
      </div>
      <a
        href="mailto:theyardofhorror@gmail.com"
        className="px-2 text-[4vw] font-extralight hover:underline sm:mr-24 sm:text-[1.5vw] md:mr-32"
      >
        Contact Us
      </a>
    </footer>
  );
};

export default Footer;
