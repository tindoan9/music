import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function uploaded() {
    return (
        <>
            <div className="form__songs__uploaded__list">
                <div className="url__upload__song">
                    <NavLink to={'/mymusic/postsong'}>
                        <UploadOutlined
                            style={{
                                color:'#fff',
                                fontSize: '16px',
                                background: '#239292',
                                padding: '10px 10px',
                                borderRadius: '60px'
                            }}
                        />
                    </NavLink>
                </div>
            </div>
        </>
    )
}