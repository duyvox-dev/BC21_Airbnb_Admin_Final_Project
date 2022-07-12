import React from "react";
import HeaderTemplate from "./HeaderTemplate/HeaderTemplate";
import SidebarTemplate from "./SidebarTemplate/SidebarTemplate";

export default function ThemeLayout(props) {
  return (
    <>
      <HeaderTemplate />
      <div className="pt-20">
        <props.Component />
      </div>
      <SidebarTemplate />
    </>
  );
}
