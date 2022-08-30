import PropTypes from "prop-types";
import React from "react";
import AdminHeader from "./AdminHeader/AdminHeader";

AdminLayout.propTypes = {
  children: PropTypes.element,
};

export function AdminLayout(props) {
  const { children } = props;
  return (
        <>
            <AdminHeader/>
          {children}
        </>
  );
}