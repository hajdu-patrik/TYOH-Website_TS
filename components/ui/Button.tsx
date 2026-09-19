import React from "react";

/**
 * Single reusable button/link-button component. The visual variants below are
 * copied verbatim (byte-for-byte) from the class strings that already existed
 * at their respective call sites (Navbar desktop links, Navbar mobile links,
 * Footer contact link) - no new variant, colour, spacing or design is
 * introduced here, this only centralises markup that was duplicated.
 *
 * Polymorphic `as` prop: renders whatever element the call site needs
 * (`a`, `li`, `button`, ...), forwards refs and all native props for that
 * element, and defaults `type="button"` when it renders a real `<button>`
 * (native default absent a `type` prop) - this project has no <form>
 * elements, so a button whose implicit type used to be "submit" behaves
 * identically either way; making it explicit only prevents accidental form
 * submission if one is ever added around it later.
 */

type ButtonVariant = "navDesktop" | "navMobile" | "footerLink";

const VARIANT_CLASS_NAMES: Record<ButtonVariant, string> = {
  // components/Navbar/computer/NavbarElement.tsx - originally on the <li> inside the nav <a>
  navDesktop: "  shadowmobile | navanimation p-2 transition-transform",
  // components/Navbar/handheld/MobileNavbar.tsx - originally on each nav <a>
  navMobile: " shadowmobile | navanimation mb-2 flex items-center border-none py-2 px-4 text-xl",
  // components/Footer/Footer.tsx - originally on the mailto <a>
  footerLink: "px-2 text-[4vw] font-extralight hover:underline sm:mr-24 sm:text-[1.5vw] md:mr-32",
};

type AsProp<C extends React.ElementType> = { as?: C };

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type ButtonOwnProps = { variant?: ButtonVariant };

export type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C, ButtonOwnProps>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;

export const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = "button">(
    { as, variant, className, children, ...rest }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component: React.ElementType = as || "button";
    const resolvedClassName = variant ? VARIANT_CLASS_NAMES[variant] : className;
    const extraProps: Record<string, unknown> = { ...rest };
    if (Component === "button" && extraProps.type === undefined) {
      extraProps.type = "button";
    }
    return (
      <Component ref={ref} className={resolvedClassName} {...extraProps}>
        {children}
      </Component>
    );
  }
) as unknown as ButtonComponent;

(Button as unknown as { displayName?: string }).displayName = "Button";
