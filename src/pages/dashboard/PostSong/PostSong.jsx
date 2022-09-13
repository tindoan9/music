import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSongAction,
  playSongAction,
  postSongAction,
} from "../../../stores/slices/song.slice.admin";
import { Popconfirm } from "antd";
import { searchSongAction } from "../../../stores/slices/user.slice";

export default function PostSong() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const songState = useSelector((state) => state.song.songState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchItem = userInfoState?.searchSong;
  const loading = songState?.loading;
  const postSong = songState?.postSong;
  const deleteSong = songState?.deleteSong;
  const songActive = songState?.playSong;

  useEffect(() => {
    dispatch(searchSongAction(""));
  }, [dispatch, postSong, deleteSong]);

  useEffect(() => {
    setIdSong(songActive.id);
  }, [songActive]);

  const [visible, setVisible] = useState(false);
  const [idSong, setIdSong] = useState(0);
  const [infoSongInput, setInfoSongInput] = useState({
    songName: "",
    songAuthor: "",
    urlSong: "",
    imgDefaultSong:
      "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (
      !infoSongInput.songName ||
      !infoSongInput.songAuthor ||
      !infoSongInput.urlSong
    ) {
      notification.warning({
        message: "Vui lòng nhập đầy đủ thông tin!",
        duration: 2,
      });
    } else {
      setTimeout(() => {
        setVisible(false);
        setInfoSongInput({
          ...infoSongInput,
          songName: "",
          songAuthor: "",
          urlSong: "",
        });
      }, 2000);
      let newSong = {
        songName: infoSongInput.songName,
        songAuthor: infoSongInput.songAuthor,
        urlSong: infoSongInput.urlSong,
        imgSong: infoSongInput.imgDefaultSong,
        like: 0,
      };
      dispatch(postSongAction(newSong));
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const confirmDeleteSong = (id) => {
    dispatch(deleteSongAction(id));
  };

  const editSong = (item) => {
    navigate(`/dashboard/editsong${item.id}`, { state: { ...item } });
  };

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };

  const handleSearchChange = (text) => {
    const values = text.target.value;
    dispatch(searchSongAction(values));
  };

  return (
    <>
      <div className="form__postsong">
        <div className="btn__postsong">
          <span onClick={showModal}>
            <CloudUploadOutlined />
            TẢI NHẠC LÊN
          </span>
          <Modal
            title="TẢI NHẠC"
            visible={visible}
            onOk={handleOk}
            confirmLoading={loading && <LoadingOutlined />}
            onCancel={handleCancel}
          >
            <input
              className="input__infosong"
              type="text"
              placeholder="Nhập Tên Bài Hát"
              value={infoSongInput.songName}
              onChange={(e) =>
                setInfoSongInput({
                  ...infoSongInput,
                  songName: e.target.value,
                })
              }
            />
            <input
              className="input__infosong"
              type="text"
              placeholder="Nhập Tên Tác Giả"
              value={infoSongInput.songAuthor}
              onChange={(e) =>
                setInfoSongInput({
                  ...infoSongInput,
                  songAuthor: e.target.value,
                })
              }
            />
            <input
              className="input__infosong"
              type="text"
              placeholder="Link Nhạc"
              value={infoSongInput.urlSong}
              onChange={(e) =>
                setInfoSongInput({
                  ...infoSongInput,
                  urlSong: e.target.value,
                })
              }
            />
          </Modal>
        </div>
        <div className="form__search__song--admin">
          <SearchOutlined className="search__icon__admin" />
          <input
            type="text"
            className="search__input__admin"
            placeholder="Nhập tên bài hát, nghệ sĩ"
            onChange={handleSearchChange}
          />
        </div>
        <div className="list__song__play">
          <div className="media__header__admin">
            <div className="media__left">
              <span>BÀI HÁT</span>
            </div>
            <div className="media__center">
              <span>ALBUM</span>
            </div>
            <div className="media__action">
              <span></span>
            </div>
          </div>
          {searchItem?.map?.((item) => {
            return (
              <div
                key={item.id}
                className={`list__music ${
                  idSong === item.id && "active__song"
                }`}
              >
                <div
                  className="item__left"
                  onClick={() => handlePlaySong(item.id)}
                >
                  <img src={item.imgSong} alt="OT" />
                  <div className="info__song">
                    <span>{item.songName}</span>
                    <span style={{ color: "#999" }}>{item.songAuthor}</span>
                  </div>
                </div>
                <div className="item__center">
                  <span></span>
                </div>
                <div className="item__action">
                  <span onClick={() => editSong(item)}>
                    <EditOutlined />
                  </span>
                  <Popconfirm
                    placement="topRight"
                    title="Bạn muốn xóa bài hát này?"
                    onConfirm={() => confirmDeleteSong(item.id)}
                    okText="Xóa"
                    cancelText="TỪ TỪ"
                  >
                    <span>
                      <DeleteOutlined />
                    </span>
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
