"use client";
import React from "react";
import { Layout, Menu, theme } from "antd";
import CompanyLogo from "@/components/atoms/logos/company-logo";
import { IsMobileScreen } from "@/utils/utils";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const items = new Array(4).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`
}));
export type TFrontOfficeLayoutProps = {
  children: React.ReactNode;
};

const FrontOfficeLayout: React.FC<TFrontOfficeLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const isMobile = IsMobileScreen();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {isMobile && React.createElement(MenuOutlined)}
        <CompanyLogo />

        {!isMobile && (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
          />
        )}
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: 24
          }}
        >
          {children}
        </div>
      </Content>
      <Footer className="text-center">Footer Copyright</Footer>
    </Layout>
  );
};

export default FrontOfficeLayout;
