import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50,
    }}
    spin
  />
);
function LoadingSpinner() {
  return (
    <Spin
      style={{
        width: "100%",
        height: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      indicator={antIcon}
    />
  );
}

export default LoadingSpinner;
