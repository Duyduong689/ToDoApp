import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="headerWrapper">
        <div className="showOnMobile" onClick={showDrawer}>
          <MenuOutlined />
        </div>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
          }}
        >
          <img
            width="auto"
            height="32"
            src="https://geekup.vn/Icons/geekup-logo-general.svg"
            alt="logo"
          />
          <span className="hideOnMobile" style={{ fontWeight: "500" }}>
            Test
          </span>
        </Link>
        <Link
          to="todo"
          style={{
            textDecoration: "none",
            cursor: "",
          }}
          className="hideOnMobile"
          onClick={(e) => {
            if (location.pathname == "/todo") {
              e.preventDefault();
            }
          }}
        >
          To do
        </Link>
        <Drawer
          placement={"left"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"left"}
          width={256}
          closeIcon={<MenuOutlined />}
        >
          <div>
            <div
            className="drawerContentWrapper"
              onClick={(e) => {
                if (location.pathname == "/todo") {
                  e.preventDefault();
                } else {
                  navigate("/todo");
                }
              }}
            >
              To do
            </div>
          </div>
        </Drawer>
      </div>
      <Divider style={{ margin: "0px" }} />
    </>
  );
}

export default Header;
