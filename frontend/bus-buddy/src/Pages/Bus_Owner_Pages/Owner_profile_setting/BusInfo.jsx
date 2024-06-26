// BusInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BusInfo.css';
import Button from '@mui/material/Button';
import SidebarOwner from './SidebarOwner';

function BusInfo() {
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState('');
	const [imageData, setImageData] = useState(null);
	const [data, setData] = useState({
		businessName: '',
		registrationNo: '',
		address: '',
	});

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
		const fetchData = async () => {
			const data = await fetchImageData(
				'http://localhost:8081/api/v1/user/getImage',
				token
			);
			if (data) {
				const base64Image = arrayBufferToBase64(data);
				setImageData(`data:image/png;base64,${base64Image}`);
			}
		};

		fetchData();
	}, [token]);

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setData((prevData) => ({
			...prevData,
			[id]: value,
		}));
		setButtonDisabled(false); // Enable the button when input changes
	};

	const handleUpdate = () => {
		axios
			.post('http://localhost:8081/api/v1/business/editBusinessInfo', data, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				console.log('Update Successful');
				setButtonDisabled(true);
			})
			.catch((error) => {
				console.error('Update Failed:', error);
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

	async function fetchImageData(url, token) {
		try {
			const response = await axios.get(url, {
				responseType: 'arraybuffer',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			console.error('Error fetching image data:', error);
			return null;
		}
	}

	return (
		<SidebarOwner>
			<div className="d-flex flex-column align-items-center justify-content-center">
				<h1 className="d-flex pb-3">Bus Business Information</h1>
				<div className="op-main-container">
					<div className="d-flex flex-row align-items-center">
						<img
							className="op-prof-pic input-and-label"
							src={imageData}
							alt="User"
						/>
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
