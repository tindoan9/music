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
                    <div className="media__left"></div>
                    <div className="media__center"></div>
                    <div className="media__right"></div>
                </div>
            </div>
        </div>
    )
}