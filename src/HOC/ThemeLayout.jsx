import React from "react";
import HeaderTemplate from "./HeaderTemplate/HeaderTemplate";
import SidebarTemplate from "./SidebarTemplate/SidebarTemplate";

export default function ThemeLayout(props) {
  return (
    <>
      <HeaderTemplate />
      <props.Component />
      <SidebarTemplate />
    </>
  );
}
