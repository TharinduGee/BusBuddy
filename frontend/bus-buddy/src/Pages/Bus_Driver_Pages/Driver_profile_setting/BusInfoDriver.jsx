import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Bus_Owner_Pages/Owner_profile_setting/BusInfo.css';
import './BusInfoDriver.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SidebarOwner from './SidebarInfoDriver';
import Swal from 'sweetalert2';

function BusInfoDriver() {
	const token = localStorage.getItem('token');
	const [userData, setUserData] = useState({});
	const [imageData, setImageData] = useState(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

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

	useEffect(() => {
		fetchImage();
	}, [token]);

	const fetchImage = async () => {
		try {
			const response = await axios.get(
				'http://localhost:8081/api/v1/user/getImage',
				{
					responseType: 'arraybuffer',
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.data) {
				const base64Image = arrayBufferToBase64(response.data);
				setImageData(`data:image/png;base64,${base64Image}`);
			}
		} catch (error) {
			console.error('Error fetching image data:', error);
		}
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = () => {
		if (!file) {
			console.error('No file selected.');
			return;
		}

		const formData = new FormData();
		formData.append('image', file);

		setLoading(true);
		axios
			.post('http://localhost:8081/api/v1/user/uploadImage', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log('Profile picture updated successfully:', response.data);
				fetchImage();
				Swal.fire({
					title: 'Good job!',
					text: 'Image Added Successfully!',
					icon: 'success',
				});
			})
			.catch((error) => {
				console.error('Error updating profile picture:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	function arrayBufferToBase64(buffer) {
		let binary = '';
		const bytes = new Uint8Array(buffer);
		for (let i = 0; i < bytes.byteLength; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}

	return (
		<SidebarOwner>
			<div className="container-fluid d-flex flex-column align-items-center justify-content-center full-screen">
				<h1 className="d-flex pb-3">Profile Information</h1>
				<div className="op-main-container d-flex flex-column align-items-center">
					<div className="d-flex flex-column align-items-center mb-4">
						<div className="profile-picture-container">
							<img
								className="op-prof-pic-set"
								src={imageData}
								alt="User"
							/>
						</div>
						<div className="d-flex justify-content-center mt-3">
							<input
								accept="image/*"
								id="icon-button-file"
								type="file"
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
							<Button
								style={{
									backgroundColor: 'Gray',
									color: 'white',
									marginRight: '10px',
								}}
								variant="contained"
								component="label"
								htmlFor="icon-button-file"
								startIcon={<AddIcon />}
							>
								Select Image
							</Button>
							<Button
								style={{
									backgroundColor: '#ff760d',
									color: 'white',
									marginLeft: '10px',
									padding: '10px 20px',
									borderRadius: '5px',
									fontSize: '16px',
								}}
								className="d-flex update-btn"
								variant="contained"
								onClick={handleUpload}
								disabled={loading}
							>
								{loading ? 'Uploading...' : 'Upload Image'}
							</Button>
						</div>
					</div>
					<label className="full-name-label">
						{userData.firstName} {userData.lastName}
					</label>
					<div className="row justify-content-center details-container">
						<div className="col-md-6 p-3">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label col-form-label-lg">Email</label>
								<div className="col-sm-8">
									<input type="text" readOnly className="form-control form-control-lg" value={userData.email} />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-4 col-form-label col-form-label-lg">Mobile Number</label>
								<div className="col-sm-8">
									<input type="text" readOnly className="form-control form-control-lg" value={userData.mobileNo} />
								</div>
							</div>
						</div>
						<div className="col-md-6 p-3">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label col-form-label-lg">Birthday</label>
								<div className="col-sm-8">
									<input type="text" readOnly className="form-control form-control-lg" value={new Date(userData.bday).toLocaleDateString()} />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-4 col-form-label col-form-label-lg">Salary</label>
								<div className="col-sm-8">
									<input type="text" readOnly className="form-control form-control-lg" value={`$${userData.salary}`} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SidebarOwner>
	);
}

export default BusInfoDriver;
