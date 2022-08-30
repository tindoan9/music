import { HeartFilled } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Songs() {
    return (
        <div className='form__favorite__song'>
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
                <div className="list__songs">
                    <div className="item__left">
                        <img src="qừdqwf" alt="OT" />
                        <div className="info__song">
                            <span>Song name</span>
                            <span style={{color: '#999'}}>tac gia</span>
                        </div>
                        
                    </div>
                    <div className="item__center">
                        <span></span>
                    </div>
                    <div className="item__love">
                        <HeartFilled />
                    </div>
                </div>
            </div>
        </div>
    )
}