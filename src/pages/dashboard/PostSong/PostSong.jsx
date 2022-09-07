import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSongAction,
  fetchSongAction,
  playSongAction,
  postSongAction,
} from "../../../stores/slices/song.slice.admin";
import { Popconfirm } from "antd";

export default function PostSong() {
  const songState = useSelector((state) => state.song.songState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = songState?.loading;
  const songData = songState?.data;
  const postSong = songState?.postSong;
  const deleteSong = songState?.deleteSong;
  const songActive = songState?.playSong;

  useEffect(() => {
    dispatch(fetchSongAction());
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
        like: 0
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
          {songData?.map?.((item) => {
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
