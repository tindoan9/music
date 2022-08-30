import {
  BellOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menu from "./menu";
import { Avatar, Dropdown, Image, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../stores/slices/user.slice";


export default function SidebarHeader() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const [menuList, setMenuList] = useState([]);
  const [urlAdmin, setUrlAmin] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfoDashboard = userInfoState?.data?.decentralization;

  useEffect(() => {
    return !userInfoState.data
      ? setMenuList(unauthenticatedMenu)
      : setMenuList(authenticatedMenu);
  }, [userInfoState]);

  useEffect(() => {
    return userInfoState?.data?.decentralization === "admin"
      ? setUrlAmin(urlDashboard)
      : setUrlAmin("");
  }, [userInfoDashboard]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate(`/`);
  };

  const unauthenticatedMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink to={"/login"}>
              <span>
                <LoginOutlined style={{marginRight: '10px'}} /> Đăng nhập
              </span>
            </NavLink>
          ),
        },
      ]}
    />
  );

  const authenticatedMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink to={"/mymusic/song"}>
              <span>
                <ProfileOutlined style={{marginRight: '10px'}} /> Cá nhân
              </span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <span onClick={handleLogout}>
              <LogoutOutlined style={{marginRight: '10px'}} /> Đăng xuất
            </span>
          ),
        },
      ]}
    />
  );

  const avataUser = (
    <Avatar
    style={{
        width: "35px",
        height: '35px',
        marginBottom: '10px'
      }}
      src={
        <Image
          src={userInfoState?.data?.avatar}
          style={{
            width: '50px',

          }}
        />
      }
    />
  )

  const unAvataUser = (
    <UserOutlined
                style={{
                  backgroundColor: "#cce0e0",
                  padding: "8px 8px",
                  borderRadius: "60px",
                }}
                className="user__icon"
              />
  )
  

  const urlDashboard = (
    <>
        <NavLink to={"/dashboard/home"}>
          <DashboardOutlined 
            className='dashboard__icon'
            style={{
                backgroundColor: "#cce0e0",
                padding: "8px 8px",
                borderRadius: "60px",
                color: '#111'
              }}
          />
        </NavLink>
    </>
  );

  return (
    <>
      <header>
        <div className="header__layout">
          <div className="search__music">
            <SearchOutlined className="search__icon" />
            <input type="text" placeholder="Tìm kiếm bài hát, nghệ sĩ" />
          </div>
          <div className="user__outline">
            {urlAdmin}
            <BellOutlined
              style={{
                backgroundColor: "#cce0e0",
                padding: "8px 8px",
                borderRadius: "60px",
              }}
              className="bell__icon"
            />
            <Dropdown
              overlay={menuList}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
            >
                {!userInfoState.data ? unAvataUser : avataUser}
            </Dropdown>
          </div>
        </div>
      </header>
      <div className="sidebar">
        <ul className="menu">
          {menu.map((item) => {
            return (
              <li key={item.url} className="menu__item">
                <NavLink style={{ color: '#239292'}} to={item.url}>
                  <span className="icon">{item.icon}</span>
                  {/* <span className="title">{item.title}</span> */}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
