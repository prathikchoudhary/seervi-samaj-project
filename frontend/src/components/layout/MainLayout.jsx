import React, { useState, useEffect } from "react";
import { Logo,Loader } from "../index"
import {
  HomeOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Modal, Dropdown, message } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon) {
  return { key, icon, label };
}

const items = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Member Add", "/member-add", <UsergroupAddOutlined />),
  getItem("Settings", "/settings", <SettingOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "You will need to log in again to access your account.",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      okType: "danger",
      centered: true,
      onOk() {
        message.success("Logged out successfully");
        navigate("/login");
      },
    });
  };

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      navigate("/profile");
    } else if (key === "settings") {
      navigate("/settings");
    } else if (key === "logout") {
      showLogoutConfirm();
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "My Profile",
        },
        {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutIcon style={{ color: "red" }} />,
          label: <span style={{ color: "red" }}>Logout</span>,
        },
      ]}
    />
  );
  // Loder component to show while loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
        {loading && <Loader />}
        <Layout style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <Header
        style={{
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Logo className="h-13" />
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
              marginLeft: "auto",
              cursor: "pointer",
            }}
          >
            U
          </Avatar>
        </Dropdown>
      </Header>

      {/* SIDEBAR + CONTENT */}
      <Layout>
        {/* SIDEBAR */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: "white",
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}  // highlight active route
            items={items}
            onClick={({ key }) => navigate(key)} // navigation
          />
        </Sider>

        {/* CONTENT */}
        <Layout style={{ padding: "16px", background: "#fafafa" }}>
          <Content
            style={{
              padding: 24,
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Outlet /> {/* Dynamic content here */}
          </Content>
        </Layout>
      </Layout>
        </Layout>
    </>
    
  );
};

export default MainLayout;
