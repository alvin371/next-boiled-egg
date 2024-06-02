import React from "react";
import { cva } from "class-variance-authority";

// Define the typography styles using cva
const typographyStyles = cva(
  "font-sans", // base class
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-xl",
        xl: "text-2xl"
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold"
      },
      color: {
        primary: "text-blue-600",
        secondary: "text-gray-600",
        danger: "text-red-600",
        success: "text-green-600"
      }
    },
    defaultVariants: {
      size: "medium",
      weight: "normal",
      color: "primary"
    }
  }
);

// Define a union type for the allowed HTML elements
type AsProp = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

// Define the prop types
interface TitleTypographyProps {
  children: React.ReactNode;
  as?: AsProp;
  size?: "small" | "medium" | "large" | "xl";
  weight?: "light" | "normal" | "medium" | "bold";
  color?: "primary" | "secondary" | "danger" | "success";
}

const TitlePage: React.FC<TitleTypographyProps> = ({
  children,
  as: Tag = "h1",
  size = "medium",
  weight = "normal",
  color = "primary",
  ...props
}) => {
  return (
    <Tag className={typographyStyles({ size, weight, color })} {...props}>
      {children}
    </Tag>
  );
};

export default TitlePage;
