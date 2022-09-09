import { HeartFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { playSongAction } from "../../../../../stores/slices/song.slice.admin";
import {
  countDislikeAction,
  dislikeSongAction,
  fetchListUserLikeSongAction,
} from "../../../../../stores/slices/user.slice";

export default function Songs() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const songState = useSelector((state) => state.song.songState);
  const dispatch = useDispatch();
  const [idSong, setIdSong] = useState(0);

  const listInfoLike = userInfoState?.listUserLikeSong;
  const userInfo = userInfoState?.data;
  const listSong = songState?.data;
  const userEmail = userInfo?.email;
  const dislike = userInfoState?.dislikeSong;

  useEffect(() => {
    dispatch(fetchListUserLikeSongAction());
  }, [dispatch, dislike]);

  const handleDeleteLikeSong = (id, songId, songName) => {
    const song = listSong.filter((e) => e.id === songId);
    const like = song[0].like;
    const idSong = song[0].id;
    dispatch(countDislikeAction({ like, idSong }));
    dispatch(dislikeSongAction({ id, songName }));
  };

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };

  return (
    <div className="form__favorite__song">
      <div className="category__song">
        <div className="category__item">
          <NavLink to={`/mymusic/song`}>
            <p>YÊU THÍCH</p>
          </NavLink>
        </div>
      </div>
      <div className="songsfavorite__list">
        <div className="media__header">
          <div className="media__left">
            <span>BÀI HÁT</span>
          </div>
          <div className="media__center">
            <span>ALBUM</span>
          </div>
        </div>
        {listInfoLike?.map((item) => {
          if (item.email === userEmail) {
            return (
              <div
                key={item.id}
                className={`list__songs ${
                  idSong === item.songId && "active__song"
                }`}
              >
                <div
                  onClick={() => handlePlaySong(item.songId)}
                  className="item__left"
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
                <div className="item__love">
                  <HeartFilled
                    onClick={() =>
                      handleDeleteLikeSong(item.id, item.songId, item.songName)
                    }
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
