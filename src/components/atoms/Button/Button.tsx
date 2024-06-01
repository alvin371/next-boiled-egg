import { Button as AntdButton, ButtonProps } from "antd";
import React from "react";
import Link from "next/link";
import { IsMobileScreen } from "@/utils/utils";

export type TProps = ButtonProps & {
  icon?: React.ReactNode;
  responsive?: boolean;
};

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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      {...rest}
    >
      {showChildren && children}
    </AntdButton>
  );
};

export default Button;
