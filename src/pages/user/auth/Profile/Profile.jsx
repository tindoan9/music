import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileLayout } from '../../../../layouts/ProfileLayout/ProfileLayout';
import Songs from './Songs/Songs';

export default function Profile(props) {
    const location = useLocation();

	const renderContent = () => {
		switch (location.pathname) {
		case "/mymusic/song":
			return <Songs/>;
		default:
			return <Songs/>;
		}
	};

	return <ProfileLayout>{renderContent()}</ProfileLayout>
}