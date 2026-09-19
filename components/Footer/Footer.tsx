import { Button } from "../ui/Button";

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
      <Button
        as="a"
        variant="footerLink"
        href="mailto:theyardofhorror@gmail.com"
      >
        Contact Us
      </Button>
    </footer>
  );
};

export default Footer;
