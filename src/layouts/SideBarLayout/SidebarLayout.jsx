import PropTypes from "prop-types";
import React from "react";
import SidebarHeader from "./SidebarHeader/SidebarHeader";

SidebarLayout.propTypes = {
  children: PropTypes.element,
};

export function SidebarLayout(props) {
  const { children } = props;
  return (
        <>
          <SidebarHeader />
          {children}
        </>
  );
}