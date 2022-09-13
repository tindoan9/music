import React, { useEffect, useState } from "react";
import { HeartFilled, LoadingOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSortLikeSongDescAction } from "../../../stores/slices/user.slice";
import { playSongAction } from "../../../stores/slices/song.slice.admin";

export default function Trends() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();
  const [idSong, setIdSong] = useState(0);

  const loading = userInfoState?.loading
  const listSortLikeSongDesc = userInfoState?.listSortLikeSong;

  useEffect(() => {
    dispatch(fetchSortLikeSongDescAction());
  }, [dispatch]);

  const handlePlaySong = (song) => {
    setIdSong(song);
    dispatch(playSongAction(song));
  };
  let count = 0;
  return (
    <>
      <div className="leaderboard">
        <h1>BẢNG XẾP HẠNG BÀI HÁT</h1>
        <div className="rank__song">
          {listSortLikeSongDesc?.map((item) => {
            count++;
            return (
              <div
                key={item.id}
                className={`rank__song--item ${
                  idSong === item.id && "active__song"
                }`}
              >
                <div className="number__rank">
                  <span>{count}</span>
                </div>
                <span>
                  <MinusOutlined />
                </span>
                <div
                  className="info__song__left"
                  onClick={() => handlePlaySong(item.id)}
                >
                  <img src={item.imgSong} alt="" />
                  <div className="song__name_author">
                    <b>{item.songName}</b>
                    <span>{item.songAuthor}</span>
                  </div>
                </div>
                <div className="album__song__center"></div>
                <div className="like__song__right">
                  <HeartFilled />
                </div>
              </div>
            );
          })}
          {loading && (
            <LoadingOutlined
              style={{
                fontSize: "22px",
                textAlign: "center",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
