import PropTypes from "prop-types";
import React from "react";
import SidebarHeader from "../SideBarLayout/SidebarHeader/SidebarHeader";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

ProfileLayout.propTypes = {
  children: PropTypes.element,
};

export function ProfileLayout(props) {
  const { children } = props;
  return (
        <>
          <SidebarHeader />
          <ProfileHeader />
          {children}
        </>
  );
}