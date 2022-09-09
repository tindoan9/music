import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdminLayout } from '../../layouts/AdminLayout/AdminLayout';
import HomeAdmin from './HomeAdmin/HomeAdmin';
import PostSong from './PostSong/PostSong';

export default function HeaderAdmin(props) {
    const location = useLocation();

	const renderContent = () => {
		switch (location.pathname) {
		case "/dashboard/home":
			return <HomeAdmin/>;
		case "/dashboard/postsong":
			return <PostSong/>;
		default:
			return <HomeAdmin/>;
		}
	};

	return <AdminLayout>{renderContent()}</AdminLayout>
}