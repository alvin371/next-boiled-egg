import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import React from "react";
import { cva } from "class-variance-authority";

interface IToggleButton {
  isActivityVisible: boolean;
  //   eslint-disable-next-line no-unused-vars
  setIsActivityVisible: (value: boolean) => void;
  widgetWidth: string;
  //   eslint-disable-next-line no-unused-vars
  setWidgetWidth: (value: string) => void;
  onClick?: () => void;
}

const buttonStyles = cva(
  "bg-[#006cb8] rounded-l-lg h-8 w-7 absolute top-2.5 right-0 flex items-center justify-center z-10 cursor-pointer"
);

const ToggleButton: React.FC<IToggleButton> = (props) => {
  const toggleActivityVisibility = () => {
    if (props.onClick) {
      props.onClick();
    }

    props.setIsActivityVisible(!props.isActivityVisible);
    props.setWidgetWidth(props.isActivityVisible ? "100%" : "1800px");
  };

  return (
    <div className={buttonStyles()} onClick={toggleActivityVisibility}>
      {props.isActivityVisible ? (
        <LeftSquareOutlined rev={""} className="text-white" />
      ) : (
        <RightSquareOutlined rev={""} className="text-white" />
      )}
    </div>
  );
};

export default ToggleButton;
