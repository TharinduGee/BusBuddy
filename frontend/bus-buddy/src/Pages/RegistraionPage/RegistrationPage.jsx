import React, { useState, useEffect } from 'react';
import './RegistraionPage.css';
import TextField from '@mui/material/TextField';
import Footer from '../../Components/OnBoaringComponents/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function RegistrationPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNo: '',
		confirm_password: '',
		role: '',
	});

	useEffect(() => {
		if (location.state && location.state.role) {
			setUser({ ...user, role: location.state.role });
		}
	}, [location.state]);

	const handleChange = (e) => {
		const value = e.target.value;
		setUser({
			...user,
			[e.target.name]: value,
		});
	};

	const [touchedFields, setTouchedFields] = useState({
		firstName: false,
		lastName: false,
		email: false,
		mobileNo: false,
		password: false,
		confirm_password: false,
	});

	const handlePassRequest = async () => {
		try {
			if (
				user.firstName === '' ||
				user.lastName === '' ||
				user.email === '' ||
				user.password === '' ||
				user.mobileNo === '' ||
				user.confirm_password === ''
			) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'All the fields should be filled! ',
				});
			} else if (user.confirm_password !== user.password) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Passwords do not match',
				});
			} else {
				console.log('userdata', user);
				const response = await axios.post(
					'http://localhost:8081/api/v1/signUp',
					user
				);
				console.log('Response:', response.data);
				navigate('/login');
			}
		} catch (error) {
			console.error('Error:', error.response.data);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Username or mobile number is already taken, sign up again to proceed',
			});
		}
	};

	const [checkbox1, setCheckbox1] = useState(false);
	const [checkbox2, setCheckbox2] = useState(false);
	const handleCheckbox1Change = () => {
		setCheckbox1(!checkbox1);
	};

	const handleCheckbox2Change = () => {
		setCheckbox2(!checkbox2);
	};
	const isButtonDisabled = !checkbox1 || !checkbox2;

	const buttonStyle = {
		backgroundColor: isButtonDisabled ? 'grey' : '#FF7A00',
		color: '#ffffff',
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<div className="container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
					<div className="justify-content-start">
						<button
							className="back-button"
							onClick={() => navigate('/userrole')}
						>
							Back
						</button>
					</div>
					<div className="sign-up-text-main">Sign up to Busbuddy</div>
					<div>
						<div className="row row-cols-2 mt-2">
							<div className="col">
								<TextField
									value={user.firstName}
									onChange={handleChange}
									onBlur={() =>
										setTouchedFields({ ...touchedFields, firstName: true })
									}
									helperText={
										touchedFields.firstName && user.firstName.length === 0
											? 'Required field'
											: ''
									}
									error={touchedFields.firstName && user.firstName.length === 0}
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									margin="normal"
								/>
							</div>
							<div className="col">
								<TextField
									value={user.lastName}
									onChange={handleChange}
									margin="normal"
									onBlur={() =>
										setTouchedFields({ ...touchedFields, lastName: true })
									}
									helperText={
										touchedFields.lastName && user.lastName.length === 0
											? 'Required field'
											: ''
									}
									error={touchedFields.lastName && user.lastName.length === 0}
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
								/>
							</div>
						</div>
					</div>

					<TextField
						value={user.email}
						onChange={handleChange}
						margin="normal"
						required
						fullWidth
						onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
						helperText={
							touchedFields.email && user.email.length === 0
								? 'Required field'
								: ''
						}
						error={touchedFields.email && user.email.length === 0}
						id="email"
						label="Email Address"
						name="email"
					/>

					<TextField
						value={user.mobileNo}
						onChange={handleChange}
						margin="normal"
						required
						fullWidth
						onBlur={() =>
							setTouchedFields({ ...touchedFields, mobileNo: true })
						}
						helperText={
							touchedFields.mobileNo && user.mobileNo.length === 0
								? 'Required field'
								: ''
						}
						error={touchedFields.mobileNo && user.mobileNo.length === 0}
						id="mobileNo"
						label="Mobile Number"
						placeholder="+94711234567"
						name="mobileNo"
						onKeyPress={(e) => {
							const isNumeric = /^[0-9+]$/.test(e.key);
							if (!isNumeric) {
								e.preventDefault();
							}
						}}
					/>
					<TextField
						value={user.password}
						onChange={handleChange}
						margin="normal"
						required
						fullWidth
						onBlur={() =>
							setTouchedFields({ ...touchedFields, password: true })
						}
						helperText={
							touchedFields.password && user.password.length === 0
								? 'Required field'
								: ''
						}
						error={touchedFields.password && user.password.length === 0}
						id="password"
						label="Password"
						type="password"
						name="password"
						autoComplete="password"
					/>
					<div className="label mt-3">
						* Something at least 8 characters long
					</div>
					<div className="label mt-1">* Use at least one number</div>
					<div className="label mt-1">* Use at least one lowercase letter</div>
					<div className="label mt-1">
						* Use at least one uppercase letter (@,#,$,%..)
					</div>
					<div className="label mt-1">* Use at least one special character</div>

					<TextField
						value={user.confirm_password}
						onChange={handleChange}
						margin="normal"
						required
						fullWidth
						onBlur={() =>
							setTouchedFields({ ...touchedFields, confirm_password: true })
						}
						helperText={
							touchedFields.confirm_password &&
							user.confirm_password.length === 0
								? 'Required field'
								: user.password !== user.confirm_password
								? 'Passwords do not match'
								: ''
						}
						error={
							(touchedFields.confirm_password &&
								user.confirm_password.length === 0) ||
							user.password !== user.confirm_password
						}
						id="confirm_password"
						label="Confirm Password"
						type="password"
						name="confirm_password"
						autoComplete="confirm_password"
					/>
					<div className="row ms-1 mt-3">
						<input
							className="col-1 form-check-input transparent-box"
							type="checkbox"
							id="gridCheck_1"
							checked={checkbox1}
							onChange={handleCheckbox1Change}
						/>
						<label className="col label" htmlFor="gridCheck_1">
							Sign me up for the wish list weekly newsletter
						</label>
					</div>
					<div className="row ms-1 mt-2">
						<input
							className="col-1 form-check-input transparent-box "
							type="checkbox"
							id="gridCheck_2"
							checked={checkbox2}
							onChange={handleCheckbox2Change}
						/>
						<label className="col label" htmlFor="gridCheck_2">
							By clicking the checkbox, I hereby (i) accept{' '}
							<a href="link_to_terms_of_service">TERMS OF SERVICE</a> and agree
							to be bound by them and (ii) acknowledge that I have received and
							reviewed <a href="link_to_privacy_policy">PRIVACY POLICY</a>.
						</label>
					</div>

					<div className="d-grid gap-2 mt-3 d-md-flex justify-content-center ">
						<button
							className="btn me-md-2 next-btn"
							type="button"
							onClick={handlePassRequest}
							disabled={isButtonDisabled}
							style={buttonStyle}
						>
							CREATE ACCOUNT
						</button>
					</div>
					<div className="d-flex flex-row mt-3 mb-5">
						<div className="mt-3 label">Already have an account?</div>
						<a className="register-link" href="login">
							<div className="mt-3 ms-2 clickable-text mb-3">Sign in here</div>
						</a>
					</div>
				</div>
			</div>
			<div className="footer-full">
				<Footer />
			</div>
		</div>
	);
}

export default RegistrationPage;
