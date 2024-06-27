import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarOwner from './SidebarOwner';

function ContactInfo() {
	const [userData, setUserData] = useState({});
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			axios
				.get('http://localhost:8081/api/v1/user/getUserDetails', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					setUserData(response.data);
					console.log('Data successfully fetched:', response.data);
				})
				.catch(function (error) {
					console.error('Error fetching user data:', error);
				});
		} else {
			console.error('No token found in local storage');
		}
	}, [token]);

	return (
		<SidebarOwner>
			<div className="d-flex flex-row mt-2 justify-content-start">
				<h1>Contact Info</h1>
			</div>
			<div className="borderdcontainer border border-2 border-dark rounded-4 m-5">
				<h2 className="m-3">Account</h2>
				<div className="row mt-2 p-3">
					<div className="col-12 col-md-2">
						<span className="p-3">User ID</span>
					</div>
					<div className="col-12 col-md-10">
						<span>{userData.id}</span>
					</div>
				</div>
				<div className="row mt-2 p-3">
					<div className="col-12 col-md-2">
						<span className="p-3">First Name</span>
					</div>
					<div className="col-12 col-md-4">
						<span>{userData.firstName}</span>
					</div>
					<div className="col-12 col-md-2">
						<span className="p-3">Last Name</span>
					</div>
					<div className="col-12 col-md-4">
						<span>{userData.lastName}</span>
					</div>
				</div>
				<div className="row mt-2 p-3">
					<div className="col-12 col-md-2">
						<span className="p-3">Email</span>
					</div>
					<div className="col-12 col-md-10">
						<span>{userData.email}</span>
					</div>
				</div>
				<div className="row mt-2 p-3">
					<div className="col-12 col-md-2">
						<span className="p-3">Phone</span>
					</div>
					<div className="col-12 col-md-10">
						<span>{userData.mobileNo}</span>
					</div>
				</div>
			</div>
		</SidebarOwner>
	);
}

export default ContactInfo;
