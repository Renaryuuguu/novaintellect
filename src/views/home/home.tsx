import type { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Image, Layout, Menu, theme } from "antd";
import Logo from "@/asset/ChatGPT Image 2025年4月25日 20_39_40.png";
const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  {
    key: "ecc99324-b79c-41b1-bb0a-33cd0dda7262",
    label: "ecc99324-b79c-41b1-bb0a-33cd0dda7262",
  },
];
const Home: FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    console.log("click ", key);
    navigate(key);
  };
  return (
    <Layout hasSider>
      <Sider style={siderStyle} collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Image src={Logo} preview={false} height={128} width={128} />
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined
                style={{
                  color: "red",
                }}
              />
            ) : (
              <MenuFoldOutlined
                style={{
                  color: "red",
                }}
              />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
