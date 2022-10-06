import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AdminHeader from "./AdminHeader/AdminHeader";

AdminLayout.propTypes = {
  children: PropTypes.element,
};

export function AdminLayout(props) {
  const { children } = props;
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const userInfoDashboard = userInfoState?.data?.decentralization;

  if(userInfoDashboard !== "admin") return <Navigate to={"/"}/>

  return (
        <>
            <AdminHeader/>
          {children}
        </>
  );
}