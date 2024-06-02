"use client";

import React, { Suspense, useContext, useMemo, useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { ConfigProvider, Menu, MenuProps, Spin } from "antd";
import { usePathname } from "next/navigation";
import MainHeader from "@/components/organism/header/layout-with-header";
import {
  darkThemeColors,
  sidebarThemeConfig,
  themeColors
} from "@/utils/theme";
import Link from "next/link";
import { ThemeContext } from "@/context/theme";

type TBreadcrumbsItem = {
  label: string;
  path: string;
};

type MenuItem = Required<MenuProps>["items"][number];

export type TBackOfficeLayoutProps = {
  title?: string;
  children: React.ReactNode;
  breadcrumbs?: TBreadcrumbsItem[];
  topActions?: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    key: "1",
    // TODO: make commons for route
    label: <Link href={"/dashboard"}>Dashboard</Link>,
    icon: <DashboardOutlined rev={""} />
  }
];

const BackOfficeLayout: React.FC<TBackOfficeLayoutProps> = ({
  children,
  title,
  breadcrumbs,
  topActions
}) => {
  const pathname = usePathname();
  const { isDarkMode } = useContext(ThemeContext);
  const bgSiderLayoutColor = isDarkMode
    ? darkThemeColors?.primary
    : themeColors?.info;

  const activeMenuKey =
    menuItems.find((item) => item?.key === pathname)?.key || "1";

  const defaultOpenedKey = useMemo(
    () =>
      menuItems.find((item) => {
        if (item && "children" in item) {
          const openedMenuItem = item.children?.find((chil) => {
            return chil?.key === activeMenuKey;
          });
          return openedMenuItem !== undefined;
        }
        return false;
      })?.key as string,
    [menuItems, activeMenuKey]
  );

  const [collapsed, setCollapsed] = useState(false);
  // TODO: handle logout if session expired
  // TODO: signout if session expired
  return (
    <>
      <Suspense fallback={<Spin />}>
        {/* WIP:  Adjusment Layout will be waiting for admiral*/}
        <MainHeader
          notifications={1}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        >
          <ConfigProvider theme={sidebarThemeConfig}>
            <Menu
              items={menuItems}
              style={{
                backgroundColor: bgSiderLayoutColor
              }}
              mode="horizontal"
              defaultOpenKeys={[defaultOpenedKey]}
              defaultSelectedKeys={[String(activeMenuKey)]}
              disabledOverflow
            />
          </ConfigProvider>
        </MainHeader>
        {children}
      </Suspense>
    </>
  );
};

export default BackOfficeLayout;
