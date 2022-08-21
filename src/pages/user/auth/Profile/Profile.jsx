import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileLayout } from '../../../../layouts/ProfileLayout/ProfileLayout';
import Songs from './Songs/Songs';
import Uploaded from './Uploaded/Uploaded';

export default function Profile(props) {
    const location = useLocation();

	const renderContent = () => {
		switch (location.pathname) {
		case "/mymusic/song":
			return <Songs/>;
		case "/mymusic/uploaded":
			return <Uploaded/>;
		default:
			return <Songs/>;
		}
	};

	return <ProfileLayout>{renderContent()}</ProfileLayout>
}