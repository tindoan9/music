import { CustomerServiceOutlined, HeartOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongAction,
  playSongAction,
} from "../../../stores/slices/song.slice.admin";

export default function HomePage() {
  const songState = useSelector((state) => state.song.songState);
  const dispatch = useDispatch();
  const [idSong, setIdSong] = useState(0);

  const listSong = songState?.data;
  const songActive = songState?.playSong;

  useEffect(() => {
    dispatch(fetchSongAction());
  }, [dispatch]);

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };

  useEffect(() => {
    setIdSong(songActive.id);
  }, [songActive]);

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
          {listSong?.map?.((item) => {
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
                  <HeartOutlined />
                </div>
              </div>
            );
          })}
        </div>
        <div className="info__select__song">
          {<img src={songActive.imgSong} alt="" /> && (
            <CustomerServiceOutlined
              style={{ fontSize: "130px", color: "#239292" }}
            />
          )}

          <b>{songActive.songName}</b>
          <span>{songActive.songAuthor}</span>
        </div>
      </div>
    </>
  );
}
