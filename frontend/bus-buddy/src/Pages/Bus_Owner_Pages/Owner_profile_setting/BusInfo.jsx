import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BusInfo.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SidebarOwner from './SidebarOwner';
import Swal from 'sweetalert2';

function BusInfo() {
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState('');
	const [imageData, setImageData] = useState(null);
	const [data, setData] = useState({
		businessName: '',
		registrationNo: '',
		address: '',
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		if (token) {
			axios
				.get('http://localhost:8081/api/v1/business/getInfo', {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					if (response && response.data) {
						setData(response.data);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [token]);

	useEffect(() => {
		if (username === '') {
			axios
				.get('http://localhost:8081/api/v1/user/getUsername', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setUsername(response.data);
				})
				.catch((error) => {
					console.error('Error fetching username:', error);
				});
		}
	}, [username, token]);

	useEffect(() => {
		fetchData();
	}, [token]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				'http://localhost:8081/api/v1/user/getImage',
				{
					responseType: 'arraybuffer',
					headers: {
						Authorization: `Bearer ${token}`,
					},
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

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setData((prevData) => ({
			...prevData,
			[id]: value,
		}));
		setButtonDisabled(false);
	};

	const handleUpdate = () => {
		axios
			.post('http://localhost:8081/api/v1/business/editBusinessInfo', data, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				console.log('Update Successful');
				setButtonDisabled(true);
				Swal.fire({
					title: 'Good job!',
					text: 'Information updated successfully!',
					icon: 'success',
				});
			})
			.catch((error) => {
				console.error('Update Failed:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
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
				fetchData();
				Swal.fire({
					title: 'Good job!',
					text: 'Image Added Successfully!',
					icon: 'success',
				});
			})
			.catch((error) => {
				console.error('Error updating profile picture:', error);
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
			<div className="d-flex flex-column align-items-center justify-content-center">
				<h1 className="d-flex pb-3">Bus Business Information</h1>
				<div className="op-main-container">
					<div className="d-flex flex-row align-items-center">
						<div className="d-flex flex-column align-items-center">
							<img
								className="op-prof-pic-set input-and-label"
								src={imageData}
								alt="User"
							/>
							<div className="d-flex justify-content-center">
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
										height: '50%',
										width: '100%',
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
										width: '50%',
										height: '50%',
										backgroundColor: '#ff760d',
									}}
									className="d-flex update-btn"
									variant="contained"
									onClick={handleUpload}
								>
									Upload
								</Button>
							</div>
						</div>
						<div className="d-flex flex-column mx-4">
							<label>{username}</label>
						</div>
					</div>
					<div className="d-flex flex-wrap justify-content-between two-fields">
						<div className="input-and-label">
							<label className="form-label">Business Name*</label>
							<input
								type="text"
								id="businessName"
								className="form-control input-field"
								value={data.businessName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="input-and-label">
							<label className="form-label">Registration ID*</label>
							<input
								type="text"
								id="registrationNo"
								className="form-control input-field"
								value={data.registrationNo}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="input-and-label">
						<label className="form-label">Address*</label>
						<input
							type="text"
							id="address"
							className="form-control address-text-field"
							value={data.address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<Button
							style={{
								borderRadius: 10,
								margin: 30,
								width: '100%',
								backgroundColor: buttonDisabled ? 'gray' : '#ff760d',
							}}
							className="d-flex update-btn"
							variant="contained"
							onClick={handleUpdate}
							disabled={buttonDisabled}
						>
							Update Information
						</Button>
					</div>
				</div>
			</div>
		</SidebarOwner>
	);
}

export default BusInfo;
