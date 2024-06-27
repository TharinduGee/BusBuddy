import React, { useState, useEffect } from 'react';
import logo from '../../../Assets/bus.png';
import '../../Bus_Owner_Pages/Owner_profile_setting/SidebarOwner.css';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '@mui/material-next/Button';


function SidebarInfoDriver({ children }) {
	const [sidebarOwnerClass, setSidebarOwnerClass] = useState('sidebarOwner');
	const [mainClass, setmainClass] = useState('main-content');
	const spans = document.querySelectorAll('span');
	const [activeOwnerLink, setActiveOwnerLink] = useState('');
	const location = useLocation();
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState('');

	const [menuIcon, setMenuIcon] = useState(<IoIosMenu name="menu-outline" />);

	useEffect(() => {
		setMenuIcon(
			sidebarOwnerClass === 'sidebarOwner' ? (
				<IoIosMenu name="menu-outline" />
			) : (
				<IoIosClose name="close-outline" />
			),

			sidebarOwnerClass === 'sidebarOwner'
				? setmainClass('main-content')
				: setmainClass('main-content-hidden')
		);

		setActiveOwnerLink(location.pathname);
	}, [sidebarOwnerClass]);

	const togglemenu = () => {
		if (sidebarOwnerClass === 'sidebarOwner') {
			setSidebarOwnerClass('sidebarOwner max-sidebarOwner ');
		} else {
			setSidebarOwnerClass('sidebarOwner');

			spans.forEach((span) => {
				span.classList.remove('hidden');
			});
		}
	};

	const toggleSidebarOwner = () => {
		if (sidebarOwnerClass === 'sidebarOwner') {
			setSidebarOwnerClass('sidebarOwner mini-sidebarOwner ');
			spans.forEach((span) => {
				span.classList.add('hidden');
			});
		} else {
			setSidebarOwnerClass('sidebarOwner');
			spans.forEach((span) => {
				span.classList.remove('hidden');
			});
		}
	};

	useEffect(() => {
		if (username === '') {
			axios
				.get(`http://localhost:8081/api/v1/user/getUsername`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					setUsername(response.data);
				})
				.catch(function (error) {
					console.error('Error posting data:', error);
				});
		}
	}, [username, token]);

	return (
		<div className="sidebarOwner-container">
			<div className="menu" onClick={togglemenu}>
				{menuIcon}
			</div>
			<div className={sidebarOwnerClass}>
				<div>
					<div className="page-name my-0">
						<img
							id="cloud"
							src={logo}
							className="sidebarOwnericon_main"
							onClick={toggleSidebarOwner}
						/>
						<span>BusBuddy</span>
					</div>
				</div>
				{/* <div className="user ms-3">
					<img name="ellipsis-vertical-outline" src={logo} />

					<div className="user-info">
						<div className="name-email">
							<span className="name">{username}</span>
							<span className="email">ID: CP001238905</span>
						</div>
					</div>
				</div> */}
				<div className="title-text">
					<span>Profile & Settings</span>
				</div>
				<div className="line"></div>
				<nav className="navigation">
					<ul className="px-3">
						<li>
							<a
								href="/Bus_Info_Driver"
								className={
									activeOwnerLink === '/Bus_Info_Driver'
										? 'activeOwner-link'
										: 'notactiveOwner-link'
								}
							>
								{activeOwnerLink === '/Bus_Info_Driver' ? (
									<span>| Profile Info</span>
								) : (
									<span>Profile</span>
								)}
							</a>
						</li>
						{/*<li>
							<a
								href="/contactInfo"
								className={
									activeOwnerLink === '/contactInfo'
										? 'activeOwner-link'
										: 'notactiveOwner-link'
								}
							>
								{activeOwnerLink === '/contactInfo' ? (
									<span>| Contact Info</span>
								) : (
									<span>Contact Info</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/membership"
								className={
									activeOwnerLink === '/membership'
										? 'activeOwner-link'
										: 'notactiveOwner-link'
								}
							>
								{activeOwnerLink === '/membership' ? (
									<span>| Membership</span>
								) : (
									<span>Membership</span>
								)}
							</a>
						</li>*/}
						<li>
							<a
								href="/passwordSecurityDriver"
								className={
									activeOwnerLink === '/passwordSecurityDriver'
										? 'activeOwner-link'
										: 'notactiveOwner-link'
								}
							>
								{activeOwnerLink === '/passwordSecurityDriver' ? (
									<span>| Password & Security</span>
								) : (
									<span>Password & Security</span>
								)}
							</a>
						</li>
					</ul>
				</nav>
				<div className="line"></div>
				{/* <a className="logout" href="/dashboard">
					<span>Back</span>
				</a> */}
				<div className="mx-5 justify-content-center">
					<Button
						href="/DriverDashboard"
						className="d-flex flex-row justify-content-start owner-settings-back"
						// size="large"
						variant="text"
						startIcon={<IoIosArrowBack color="black" />}
						style={{ borderRadius: 10, color: 'black' }}
					>
						BACK
					</Button>
				</div>
			</div>
			<div className={mainClass}>{children}</div>
		</div>
	);
}

export default SidebarInfoDriver;
