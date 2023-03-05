import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);


const Navbar = () => (
  <div className="wrapper">
    <div className="App">
      <a className="logo" href="localhost:8080">Coffee App</a>
    </div>
  </div>
);

export default Navbar;
