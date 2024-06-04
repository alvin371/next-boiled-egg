"use client";
import React from "react";
import { Layout, Menu, Space, theme } from "antd";
import { IsMobileScreen } from "@/utils/utils";
import { WalletIcon } from "@/components/atoms";
import { ShoppingCartOutlined, WalletOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: 1,
    label: "Home",
  },
  {
    key: 2,
    label: "About",
  },
  {
    key: 3,
    label: "Contact",
  },
  {
    key: 4,
    label: "Services",
  },
];
export type TFrontOfficeLayoutProps = {
  children: React.ReactNode;
};

const FrontOfficeLayout: React.FC<TFrontOfficeLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isMobile = IsMobileScreen();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!isMobile && (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={menuItems}
          />
        )}
        <Space>
          <ShoppingCartOutlined style={{ color: "white", fontSize: "20px" }} />
          <WalletOutlined style={{ color: "white", fontSize: "20px" }} />
        </Space>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: 24,
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
