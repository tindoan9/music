import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarLayout } from '../../layouts/SideBarLayout/SidebarLayout';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import HomePage from './HomePage/HomePage';

export default function Sidebar(props) {
    const location = useLocation();

	const renderContent = () => {
		switch (location.pathname) {
		case "/":
			return <HomePage/>;
        case "/trends":
			return <HomePage/>;
		case "/albums":
			return <HomePage/>;
		case "/login":
			return <Login/>;
		case "/register":
			return <Register/>;
		default:
			return <HomePage/>;
		}
	};

	return <SidebarLayout>{renderContent()}</SidebarLayout>
}