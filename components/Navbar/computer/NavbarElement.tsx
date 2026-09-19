import { Hrefs } from "../handheld/DropdownItem";
import React from "react";
import { Button } from "../../ui/Button";
const NavbarElement: React.FC = () => {
  return (
    <>
      <div className="hidden bg:block">
        <ul className="flex items-center space-x-[2vw] p-[1vw] text-[1.5vw] font-bold 4xl:p-[2vw]">
          {Hrefs.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <a href={item.href} target="_blank">
                  <Button as="li" variant="navDesktop">
                    {item.name}
                  </Button>
                </a>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default NavbarElement;