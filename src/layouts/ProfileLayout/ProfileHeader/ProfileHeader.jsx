import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateInfoUserAction } from "../../../stores/slices/user.slice";

export default function ProfileHeader() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch()

  const userInfo = userInfoState.data;
  const userId = userInfo?.id
  const userEmail = userInfo?.email
  const decentralization = userInfo?.decentralization
  const userAvatar = userInfo?.avatar
  const userFullName = userInfo.fullName
  const loading = userInfoState?.loading

  const [visible, setVisible] = useState(false);
  const [urlImage, setUrlImage] = useState(userAvatar);
  const [editNameInput, setEditNameInput] = useState(userFullName);
  
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
    dispatch(updateInfoUserAction({urlImage, editNameInput, userId, userEmail, decentralization}))
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOnchangeEditFile = (e) => {
    const file = e.target.files[0];
    function getBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    var promise = getBase64(file);
    promise.then(function (result) {
      setUrlImage(result);
    });
  };

  return (
    <div className="form__profile">
      <div className="profile__header">
        <div className="profile__menu">
          <NavLink to={`/mymusic/song`}>
            <b>BÀI HÁT</b>
          </NavLink>
          <b>ALBUM</b>
        </div>
      </div>
      <div className="form__info__user">
        <div className="image__user">
          <Image
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={userInfo.avatar}
          />
          <div className="edit__icon">
            <EditOutlined onClick={showModal} />
            <Modal
              title="Chỉnh sửa thông tin"
              visible={visible}
              onOk={handleOk}
              confirmLoading={loading && (<LoadingOutlined />)}
              onCancel={handleCancel}
            >
              <div className="form__edit">
                <div className="edit__image">
                    <h3>Đổi ảnh</h3>
                  <input type="file" onChange={handleOnchangeEditFile} />
                  {urlImage && (
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      src={urlImage}
                    />
                  )}
                </div>
                <div className="edit__name">
                      <h3>Đổi tên</h3>
                  <input
                    type="text"
                    value={editNameInput}
                    onChange={(e) => setEditNameInput(e.target.value)}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <h1>{userInfo.fullName}</h1>
      </div>
    </div>
  );
}
