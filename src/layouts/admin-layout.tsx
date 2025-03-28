"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
const { Header, Sider, Content } = Layout;

import classes from "./admin-layout.module.scss";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentPath = usePathname();
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(["/"]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setSelectedMenuItems([currentPath]);
  }, [currentPath]);

  console.log("selectedMenuItems", selectedMenuItems);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenuItems}
          items={[
            {
              key: "/expense-calculator",
              icon: <UserOutlined />,
              label: (
                <Link href="/expense-calculator" rel="noopener noreferrer">
                  Expense Calculator
                </Link>
              ),
            },
            {
              key: "/todo-list",
              icon: <VideoCameraOutlined />,
              label: (
                <Link href="/todo-list" rel="noopener noreferrer">
                  Todo List
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
