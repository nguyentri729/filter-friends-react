import React, { useState } from "react";

import "./NavBar.css";

import {
  ToolOutlined,
  HomeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navbar({ user, cbRouter }) {
  const [collapsed, setCollapsed] = useState(false);
  const Link = ({ to, children }) => {
   
    return <a onClick = {() => {
      cbRouter(to)
    }}>{children}</a>;
  };
  const uid = user.uid ? user.uid : "4";
  const name = user.name ? user.name : "Login First  ";

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="header">
        <Avatar
          size={100}
          src={
            "//graph.facebook.com/" +
            uid +
            "/picture?type=large&width=100&height=100"
          }
          alt="Profile Photo"
        />
        <a
          href={"https://fb.me/" + uid}
          target="_blank"
          rel="noreferrer"
          className="name"
        >
          {name}
          <CheckCircleOutlined style={{ color: "green", margin: 3 }} />
        </a>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<ToolOutlined />} title="Tools">
          <Menu.Item key="3">
            <Link to="/tools/filterFriends">Filter Friends</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/tools/filterFriends">About 1 </Link>
          </Menu.Item>
          <Menu.Item key="35">
            <Link to="/tools/filterFriends">About 2</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}



export default Navbar
