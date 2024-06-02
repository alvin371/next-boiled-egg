import { MenuProps } from "antd";

export interface LayoutWithHeaderProps {
  children: React.ReactNode;
  header: {
    brandLogo: React.ReactNode;
    menu: React.ReactNode;
  };
  sidebar: {
    width: number;
    defaultSelectedKeys: string[];
    defaultOpenKeys: string[];
    menu: MenuProps["items"];
    theme: "light" | "dark";
  };
}

export interface IHeaderContentProps {
  brandLogo: React.ReactNode;
  menu: React.ReactNode;
  toggleSidebar?: () => void;
  onClick?: () => void;
}
