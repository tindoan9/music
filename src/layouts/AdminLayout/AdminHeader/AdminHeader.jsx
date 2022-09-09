import {
  AlignRightOutlined,
  AppstoreFilled,
  AreaChartOutlined,
  FormOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Image } from "antd";
import { useSelector } from "react-redux";


export default function AdminHeader() {
  const userInfoState = useSelector((state) => state.user.userInfoState);

  const infoAdmin = userInfoState?.data;

  return (
    <>
      <div className="sidebar__dashboard">
        <div className="sidebar__menu">
          <div className="sidebar__item">
            <NavLink to={"/dashboard/home"}>
              <p>
                <AreaChartOutlined />
              </p>
            </NavLink>
            <NavLink to={"/dashboard/postsong"}>
              <p>
                <FormOutlined />
              </p>
            </NavLink>
            <NavLink to={"/"}>
              <p className="roll__back">
                <RollbackOutlined />
              </p>
            </NavLink>
          </div>
        </div>
        <div className="header__dashboard">
          <div className="dashboard__title">
            <AlignRightOutlined />
            <b>Dashboard</b>
          </div>
          <div className="info__admin">
            <p>{infoAdmin.fullName}</p>
            <Avatar
              style={{
                width: 45,
                height: 45,
              }}
              src={
                <Image
                  src={infoAdmin.avatar}
                  style={{
                    width: 60,
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
