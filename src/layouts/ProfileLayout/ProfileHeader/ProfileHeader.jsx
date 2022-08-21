import React from 'react';
import { NavLink } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';


export default function ProfileHeader() {
    return (
        <>
            <div className="profile__header">
                <div className="profile__menu">
                    <NavLink to={`/mymusic/song`}>
                        <b>BÀI HÁT</b>
                    </NavLink>
                    <b>ALBUM</b>
                    <NavLink to={`/mymusic/uploaded`}>
                        <b>ĐÃ TẢI LÊN</b>
                    </NavLink>
                </div>
            </div>
        </>
    )
}