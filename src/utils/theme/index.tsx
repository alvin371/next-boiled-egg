import { RowProps, SpaceProps } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import type { CSSProperties } from "react";

const themeColors = {
  primary: "#2D87C6",
  secondary: "",
  success: "",
  warning: "",
  error: "#FF4D4F",
  info: "#FFF"
};

const darkThemeColors = {
  primary: "#001213"
};

const iconActionTableStyle: CSSProperties = {
  color: themeColors.primary,
  fontSize: "14px"
};

const sidebarThemeConfig: ThemeConfig = {
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

const defaultGutter: RowProps["gutter"] = [16, 16];

const defaultSizeSpace: SpaceProps["size"] = "middle";

const globalThemeConfig: ThemeConfig = {
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

export {
  themeColors,
  darkThemeColors,
  sidebarThemeConfig,
  defaultGutter,
  defaultSizeSpace,
  globalThemeConfig,
  iconActionTableStyle
};
