import React, { useState, useEffect } from 'react';
import './RegistraionPage.css';
import TextField from '@mui/material/TextField';
import Footer from '../../Components/OnBoaringComponents/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';

function RegistrationPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [checkbox1, setCheckbox1] = useState(false);
	const [checkbox2, setCheckbox2] = useState(false);

	useEffect(() => {
		if (location.state && location.state.role) {
			formik.setFieldValue('role', location.state.role);
		}
	}, [location.state]);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			mobileNo: '',
			confirm_password: '',
			role: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const response = await axios.post(
					'http://localhost:8081/api/v1/signUp',
					values
				);
				console.log('Response:', response.data);
				navigate('/login');
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Username or mobile number is already taken, sign up again to proceed',
				});
			}
		},
	});

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
					<form onSubmit={formik.handleSubmit}>
						<div className="row row-cols-2 mt-2">
							<div className="col">
								<TextField
									value={formik.values.firstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.firstName && formik.errors.firstName
											? formik.errors.firstName
											: ''
									}
									error={
										formik.touched.firstName && Boolean(formik.errors.firstName)
									}
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
									value={formik.values.lastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.lastName && formik.errors.lastName
											? formik.errors.lastName
											: ''
									}
									error={
										formik.touched.lastName && Boolean(formik.errors.lastName)
									}
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									margin="normal"
								/>
							</div>
						</div>

						<TextField
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.email && formik.errors.email
									? formik.errors.email
									: ''
							}
							error={formik.touched.email && Boolean(formik.errors.email)}
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							margin="normal"
						/>

						<TextField
							value={formik.values.mobileNo}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.mobileNo && formik.errors.mobileNo
									? formik.errors.mobileNo
									: ''
							}
							error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
							required
							fullWidth
							id="mobileNo"
							label="Mobile Number"
							placeholder="+94711234567"
							name="mobileNo"
							margin="normal"
							onKeyPress={(e) => {
								const isNumeric = /^[0-9+]$/.test(e.key);
								if (!isNumeric) {
									e.preventDefault();
								}
							}}
						/>

						<TextField
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.password && formik.errors.password
									? formik.errors.password
									: ''
							}
							error={formik.touched.password && Boolean(formik.errors.password)}
							required
							fullWidth
							id="password"
							label="Password"
							type="password"
							name="password"
							margin="normal"
						/>

						<div className="label mt-3">
							* Something at least 8 characters long
						</div>
						<div className="label mt-1">* Use at least one number</div>
						<div className="label mt-1">
							* Use at least one lowercase letter
						</div>
						<div className="label mt-1">
							* Use at least one uppercase letter (@,#,$,%..)
						</div>
						<div className="label mt-1">
							* Use at least one special character
						</div>

						<TextField
							value={formik.values.confirm_password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.confirm_password &&
								formik.errors.confirm_password
									? formik.errors.confirm_password
									: ''
							}
							error={
								formik.touched.confirm_password &&
								Boolean(formik.errors.confirm_password)
							}
							required
							fullWidth
							id="confirm_password"
							label="Confirm Password"
							type="password"
							name="confirm_password"
							margin="normal"
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
								<a href="link_to_terms_of_service">TERMS OF SERVICE</a> and
								agree to be bound by them and (ii) acknowledge that I have
								received and reviewed{' '}
								<a href="link_to_privacy_policy">PRIVACY POLICY</a>.
							</label>
						</div>

						<div className="d-grid gap-2 mt-3 d-md-flex justify-content-center ">
							<button
								className="btn me-md-2 next-btn"
								type="submit"
								disabled={isButtonDisabled}
								style={buttonStyle}
							>
								CREATE ACCOUNT
							</button>
						</div>
						<div className="d-flex flex-row mt-3 mb-5">
							<div className="mt-3 label">Already have an account?</div>
							<a className="register-link" href="login">
								<div className="mt-3 ms-2 clickable-text mb-3">
									Sign in here
								</div>
							</a>
						</div>
					</form>
				</div>
			</div>
			<div className="footer-full">
				<Footer />
			</div>
		</div>
	);
}

export default RegistrationPage;
