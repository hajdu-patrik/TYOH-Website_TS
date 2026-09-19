import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Hrefs } from "./DropdownItem";
import React, { useState, useRef } from "react";
import useOutsideClick from "./Sidebarclose";
import { Button } from "../../ui/Button";

const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSidebarButton = () => {
    setOpen(!open);
  };
  const menuRef = useRef<HTMLDivElement>(undefined);
  useOutsideClick(menuRef, () => {
    setOpen(false);
  });
  return (
    // A <nav> lecserélve <div>-re
    <div className="flex bg:hidden">
      <div
        className={`${
          open
            ? "floating absolute bottom-0 m-0 min-h-screen w-[75%] p-5 pt-10"
            : "h-screen w-0"
        } absolute inset-0 bg-[#1b282b] pt-5 opacity-97 shadow-2xl shadow-[#005B61] transition-[width,padding] duration-300`}
        ref={menuRef}
      >
        <Button onClick={handleSidebarButton}>
          {!open ? (
            <Bars3Icon className="ml-5 mt-2 h-8 w-8 font-extrabold" />
          ) : (
            <XMarkIcon className="mt-2 ml-4 h-8 w-8 font-extrabold" />
          )}
        </Button>
        <ul
          className={`mt-[8vw] flex flex-col space-y-[140vw] overflow-hidden text-xl font-medium text-white`}
        >
          <li>
            {Hrefs.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <Button as="a" variant="navMobile" href={item.href}>
                    <span className="font-bold italic">{item.name}</span>
                  </Button>
                </React.Fragment>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;