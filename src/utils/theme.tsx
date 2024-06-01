import { RowProps, SpaceProps } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import type { CSSProperties } from "react";

export const themeColors = {
  primary: "#2D87C6",
  secondary: "",
  success: "",
  warning: "",
  error: "#FF4D4F",
  info: "#FFF"
};

export const darkThemeColors = {
  primary: "#001213"
};

export const iconActionTableStyle: CSSProperties = {
  color: themeColors.primary,
  fontSize: "14px"
};

export const sidebarThemeConfig: ThemeConfig = {
  components: {
    Menu: {
      itemColor: "#001213",
      itemSelectedColor: "#FF6868",
      itemHoverBg: "#525CEB",
      itemHoverColor: "#FF6868",
      itemSelectedBg: "#001213",
      fontSize: 14,
      horizontalItemSelectedColor: "#FF6868"
    }
  }
};

export const defaultGutter: RowProps["gutter"] = [16, 16];

export const defaultSizeSpace: SpaceProps["size"] = "middle";

export const globalThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: themeColors.primary
  },
  components: {
    Table: {
      controlItemBgActive: "#E6FFFB",
      controlItemBgActiveHover: "#E6FFFB"
    }
  }
};
