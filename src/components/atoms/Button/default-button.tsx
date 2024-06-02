import { Button as AntdButton, ButtonProps } from "antd";
import React from "react";
import Link from "next/link";
import { IsMobileScreen } from "@/utils/utils";
import { cva } from "class-variance-authority";

export type TProps = ButtonProps & {
  icon?: React.ReactNode;
  responsive?: boolean;
};

const buttonStyles = cva("flex items-center justify-center", {
  variants: {
    responsive: {
      true: "hidden md:flex",
      false: "flex"
    }
  },
  defaultVariants: {
    responsive: true
  }
});

const Button: React.FC<TProps> = ({
  icon,
  responsive = true,
  children,
  href,
  ...rest
}) => {
  const isMobile = IsMobileScreen();
  const showChildren = isMobile ? responsive && !icon : true;

  if (href) {
    return (
      <Link href={href}>
        <AntdButton
          icon={icon}
          className={buttonStyles({
            responsive: isMobile ? responsive : false
          })}
          {...rest}
        >
          {showChildren && children}
        </AntdButton>
      </Link>
    );
  }

  return (
    <AntdButton
      icon={icon}
      className={buttonStyles({ responsive: isMobile ? responsive : false })}
      {...rest}
    >
      {showChildren && children}
    </AntdButton>
  );
};

export default Button;
