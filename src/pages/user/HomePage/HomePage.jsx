import {
  CustomerServiceOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongAction,
  playSongAction,
} from "../../../stores/slices/song.slice.admin";
import {
  countLikeAction,
  fetchListUserLikeSongAction,
  likeSongAction,
} from "../../../stores/slices/user.slice";

export default function HomePage() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const songState = useSelector((state) => state.song.songState);
  const dispatch = useDispatch();
  const [idSong, setIdSong] = useState(0);

  const loading = songState?.loading;
  const listSong = songState?.data;
  const songActive = songState?.playSong;
  const userInfo = userInfoState?.data;
  const likeSong = userInfoState?.likeSong;
  const userID = userInfo?.id;
  const userEmail = userInfo?.email;
  const listInfoLike = userInfoState?.listUserLikeSong;
  const userIdLikeSong = listInfoLike.filter((e) => e.email === userEmail);
  const likeSongId = [];
  const likeUserEmail = [];
  userIdLikeSong.map((item) => likeSongId.push(item.songId));
  userIdLikeSong.map((item) => likeUserEmail.push(item.email));

  useEffect(() => {
    dispatch(fetchSongAction());
    dispatch(fetchListUserLikeSongAction());
  }, [dispatch, likeSong]);

  useEffect(() => {
    setIdSong(songActive.id);
  }, [songActive]);

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };

  const handleLikeSong = (
    idUser,
    email,
    idSong,
    songName,
    songAuthor,
    urlSong,
    imgSong,
    countLike
  ) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập để có thể yêu thích bài hát!",
        duration: 2,
      });
    } else {
      let newUserLikeSong = {
        idUser,
        email,
        idSong,
        songName,
        songAuthor,
        urlSong,
        imgSong,
      };
      dispatch(countLikeAction({ countLike, idSong }));
      dispatch(likeSongAction(newUserLikeSong));
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="section">
          <h1>DANH SÁCH NHẠC</h1>
          <div className="play__list">
            <div className="media__left">
              <span>BÀI HÁT</span>
            </div>
            <div className="media__center">
              <span>ALBUM</span>
            </div>
            <div className="media__right">
              <span></span>
            </div>
          </div>
          {loading && (
            <LoadingOutlined
              style={{
                fontSize: "22px",
                textAlign: "center",
              }}
            />
          )}
          {listSong?.map?.((item, index) => {
            return (
              <div
                key={item.id}
                className={`new__list__song ${
                  idSong === item.id && "active__song"
                }`}
              >
                <div
                  className="newsong__left"
                  onClick={() => handlePlaySong(item.id)}
                >
                  <img src={item.imgSong} alt="OT" />
                  <div className="info__song">
                    <span>{item.songName}</span>
                    <span style={{ color: "#999" }}>{item.songAuthor}</span>
                  </div>
                </div>
                <div className="newsong__center">
                  <span></span>
                </div>
                <div className="newsong__right">
                  {likeUserEmail[index] === userEmail &&
                  likeSongId[index] === item.id ? (
                    <HeartFilled
                      className="icon__love"
                      onClick={() => {
                        notification.warning({
                          message:
                            "Bạn cần vào trang cá nhân để có thể xóa bài hát!",
                          duration: 2,
                        });
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      className="icon__love"
                      onClick={() =>
                        handleLikeSong(
                          userID,
                          userEmail,
                          item.id,
                          item.songName,
                          item.songAuthor,
                          item.urlSong,
                          item.imgSong,
                          item.like
                        )
                      }
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="info__select__song">
          <CustomerServiceOutlined
            style={{ fontSize: "180px", color: "#239292" }}
            className="dcd__icon"
          />
          <b>{songActive?.songName}</b>
          <span>{songActive?.songAuthor}</span>
        </div>
      </div>
    </>
  );
}
