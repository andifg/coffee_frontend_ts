// import {  UserOutlined } from "@ant-design/icons";
// import { Menu } from "antd";
import { Image, Row, Col } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import AddIcon from "./AddIcon";

const HeaderBar = () => {
  return (
    <div>
      <>
        <Row className="navbar">
          <Col className="navbar-left" span={6}>
            <AddIcon />
          </Col>
          <Col span={12}>
            <Image preview={false} src="/logo-no-background.png" />
          </Col>
          <Col className="navbar-right" span={6}>
            <MenuOutlined
              className="icon-right"
              style={{
                fontSize: "32px",
                color: "#374151",
                marginLeft: "auto",
              }}
            />
          </Col>
        </Row>
      </>
    </div>
  );
};

export default HeaderBar;
