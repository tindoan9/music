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
import { Avatar, Dropdown, Image, Menu, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAction,
  searchSongAction,
} from "../../../stores/slices/user.slice";
import { playSongAction } from "../../../stores/slices/song.slice.admin";
import { BsMusicNoteList } from "react-icons/bs";

export default function SidebarHeader() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const songState = useSelector((state) => state.song.songState);
  const [menuList, setMenuList] = useState([]);
  const [urlAdmin, setUrlAmin] = useState();
  const [idSong, setIdSong] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfoDashboard = userInfoState?.data?.decentralization;
  const searchItem = userInfoState?.searchSong;
  const listSong = songState?.data;


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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (keyword) => {
    const values = keyword.target.value;
    dispatch(searchSongAction(values));
  };

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };

  const unauthenticatedMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink to={"/login"}>
              <span>
                <LoginOutlined style={{ marginRight: "10px" }} /> Đăng nhập
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
                <ProfileOutlined style={{ marginRight: "10px" }} /> Cá nhân
              </span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <span onClick={handleLogout}>
              <LogoutOutlined style={{ marginRight: "10px" }} /> Đăng xuất
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
        height: "35px",
        marginBottom: "10px",
      }}
      src={
        <Image
          src={userInfoState?.data?.avatar}
          style={{
            width: "50px",
          }}
        />
      }
    />
  );

  const unAvataUser = (
    <UserOutlined
      style={{
        backgroundColor: "#cce0e0",
        padding: "8px 8px",
        borderRadius: "60px",
      }}
      className="user__icon"
    />
  );

  const urlDashboard = (
    <>
      <NavLink to={"/dashboard/home"}>
        <DashboardOutlined
          style={{
            fontSize: 24,
            backgroundColor: "#cce0e0",
            padding: "8px 8px",
            borderRadius: "60px",
            color: "#111",
            marginRight: 25,
          }}
        />
      </NavLink>
    </>
  );

  const [openListSong, setOpenListSong] = useState(false);

  const showDrawerListSong = () => {
    setOpenListSong(true);
  };

  const onCloseListSong = () => {
    setOpenListSong(false);
  };

  return (
    <>
      <header>
        <div className="header__layout">
          <div className="user__outline">
            {urlAdmin}
            <BsMusicNoteList
              style={{
                backgroundColor: "#cce0e0",
                padding: "8px 8px",
                borderRadius: "60px",
              }}
              className="list__song__icon"
              onClick={showDrawerListSong}
            />
            <Drawer
              title="DANH SÁCH NHẠC"
              placement="left"
              onClose={onCloseListSong}
              visible={openListSong}
            >
              {listSong?.map?.((item) => {
                return (
                  <div
                    onClick={() => handlePlaySong(item.id)}
                    className={`song__list__search ${
                      idSong === item.id && "active__song"
                    }`}
                    key={item.id}
                  >
                    <img src={item.imgSong} alt="" />
                    <div className="info__song__search">
                      <b>{item.songName}</b>
                      <span>{item.songAuthor}</span>
                    </div>
                  </div>
                );
              })}
            </Drawer>
            <SearchOutlined
              onClick={showDrawer}
              style={{
                backgroundColor: "#cce0e0",
                padding: "8px 8px",
                borderRadius: "60px",
              }}
              className="search__icon"
            />
            <Drawer
              title="Tìm kiếm"
              placement="right"
              onClose={onClose}
              visible={open}
            >
              <input
                type="text"
                className="input__search__song"
                placeholder="Nhập Tên Bài Hát Hoặc Nghệ Sĩ"
                onChange={handleSearchChange}
              />
              {(searchItem ?? []).map?.((item) => {
                return (
                  <div
                    onClick={() => handlePlaySong(item.id)}
                    className={`song__list__search ${
                      idSong === item.id && "active__song"
                    }`}
                    key={item.id}
                  >
                    <img src={item.imgSong} alt="" />
                    <div className="info__song__search">
                      <b>{item.songName}</b>
                      <span>{item.songAuthor}</span>
                    </div>
                  </div>
                );
              })}
            </Drawer>
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
                <NavLink style={{ color: "#239292" }} to={item.url}>
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
