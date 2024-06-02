import { MenuOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Divider, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { IsMobileScreen } from "@/utils/utils";
import NotificationIcon from "@/components/atoms/icons/notification-icon";
import { themeColors } from "@/utils/theme";
import CompanyLogo from "@/components/atoms/logos/company-logo";

type TMainHeaderProps = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  notifications: number;
  children?: React.ReactNode;
};

const MainHeader: React.FC<TMainHeaderProps> = ({
  notifications,
  children
}) => {
  const isMobile = IsMobileScreen();
  return (
    <Header
      style={{
        position: "relative",
        backgroundColor: themeColors.info,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "24px"
      }}
    >
      <Space size={isMobile ? 20 : 60}>
        {isMobile && React.createElement(MenuOutlined)}
        <div
          style={{
            position: "relative",
            zIndex: 1
          }}
        >
          <CompanyLogo />
        </div>

        {!isMobile && children}
      </Space>

      <Space
        size={20}
        align="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <NotificationIcon notifications={notifications} />
        <QuestionCircleOutlined
          rev={""}
          style={{
            display: "block",
            color: "#2D87C6",
            fontSize: "21px"
          }}
          onClick={() => {
            window.open("http://ptm.id/digitalisasishc&t", "_blank");
          }}
        />
      </Space>
      <Divider
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 0,
          borderBottom: "2px solid #ED1B2F",
          margin: 0,
          zIndex: 0
        }}
      />
    </Header>
  );
};

export default MainHeader;
