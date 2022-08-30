import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import AdminHeader from "../../../layouts/AdminLayout/AdminHeader/AdminHeader";
import { editSongAction } from "../../../stores/slices/song.slice.admin";

export default function EditSong() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const songDetailsEdit = location?.state;
  const songID = songDetailsEdit.id;

  const [editInput, setEditInput] = useState({
    editSongName: songDetailsEdit.songName,
    editSongAuthor: songDetailsEdit.songAuthor,
    editUrlSong: songDetailsEdit.urlSong,
  });

  const handleEditSong = (songName, songAuthor, urlSong) => {
    if (
      !editInput.editSongName ||
      !editInput.editSongAuthor ||
      !editInput.editUrlSong
    ) {
      notification.warning({
        message: `Bạn cần nhập đủ thông tin!`,
        duration: 2,
      });
    } else {
      let newEditSong = {
        songName,
        songAuthor,
        urlSong,
      };
      dispatch(editSongAction({ newEditSong, songID }));
      navigate(`/dashboard/postsong`);
    }
  };

  return (
    <>
      {<AdminHeader />}
      <div className="form__edit__song">
        <h1>CHỈNH SỬA NHẠC</h1>
        <div className="edit__song__item">
          <div className="song__name__item">
            <input
              type="text"
              value={editInput.editSongName}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
                  editSongName: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editInput.editSongAuthor}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
                  editSongAuthor: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editInput.editUrlSong}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
                  editUrlSong: e.target.value,
                })
              }
            />
          </div>
        </div>
        <p
          onClick={() =>
            handleEditSong(
              editInput.editSongName,
              editInput.editSongAuthor,
              editInput.editUrlSong
            )
          }
        >
          Lưu chỉnh sửa
        </p>
      </div>
    </>
  );
}
