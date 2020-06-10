import React, { useState } from "react";
import { ToolOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;
function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo">
       <h1 style={{margin: 20}}>Extension</h1>
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
            <Link to="/tools/filterFriends">About  2</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Navbar;
