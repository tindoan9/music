import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarLayout } from '../../layouts/SideBarLayout/SidebarLayout';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import HomePage from './HomePage/HomePage';
import Trends from './Trends/Trends';

export default function Sidebar(props) {
    const location = useLocation();

	const renderContent = () => {
		switch (location.pathname) {
		case "/":
			return <HomePage/>;
        case "/trends":
			return <Trends/>;
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