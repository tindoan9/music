import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { BackTop, notification } from "antd";
import AudioPlayer from "react-h5-audio-player";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSongAction,
  playSongAction,
} from "../../stores/slices/song.slice.admin";

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 50,
  backgroundColor: "#666",
  color: "#fff",
  textAlign: "center",
  fontSize: "24px",
  transform: "translate(50px, -50px)",
};

export default function Audio() {
  const songState = useSelector((state) => state.song.songState);
  const songActive = songState?.playSong;
  const lengthSong = songState?.data?.length;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongAction());
  }, []);

  const handleNextSong = () => {
    if (songActive.id !== lengthSong) {
      dispatch(playSongAction(songActive.id + 1));
    } else {
      notification.warning({
        message: `Bạn đang ở cuối danh sách nhạc!`,
        duration: 2,
      });
    }
  };

  const handlePreviouSong = () => {
    if (songActive.id !== 1) {
      dispatch(playSongAction(songActive.id - 1));
    } else {
      notification.warning({
        message: `Bạn đang ở đầu danh sách nhạc!`,
        duration: 2,
      });
    }
  };

  return (
    <>
      <div className="audio__play">
        <AudioPlayer
          volume={0.5}
          src={songActive.urlSong}
          onPlay={(e) => console.log("onPlay")}
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={handleNextSong}
          onClickPrevious={handlePreviouSong}
          // onEnded
        />
      </div>
      <BackTop>
        <div style={style}>
          <VerticalAlignTopOutlined />
        </div>
      </BackTop>
    </>
  );
}
