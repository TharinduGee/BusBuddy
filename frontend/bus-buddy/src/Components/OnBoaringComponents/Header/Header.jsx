import React from 'react';
import Logo from '../../../Assets/logo.png';
import './Header.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Partner_1 from '../../../Assets/partner_1.png';
import Partner_2 from '../../../Assets/partner_2.png';
import Partner_3 from '../../../Assets/partner_3.png';
import Partner_4 from '../../../Assets/partner_4.png';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
	backgroundColor: '#FF7A00',
	textAlign: 'center',
	fontFamily: 'Roboto',
	fontSize: '16px',
	fontWeight: 500,
	letterSpacing: '0.5px',
	width: '210px',
	height: '50px',
	display: 'flex',
	marginLeft: '10px',
	marginBottom: '20px',
	marginTop: '20px',
	borderRadius: '4px',
	border: '1px solid #FF7A00',
	justifyContent: 'center',
	alignItems: 'center',
	transition: 'background-color 0.3s',
	'&:hover': {
		backgroundColor: '#ff9933',
	},

	'@media (max-width: 600px)': {
		width: '150px',
		height: '40px',
		fontSize: '12px',
	},
});

const CustomButton_sign_up = styled(Button)({
	backgroundColor: '#FF7A00',
	textAlign: 'center',
	fontFamily: 'Roboto',
	fontSize: '16px',
	fontWeight: 500,
	letterSpacing: '0.5px',
	width: '160px',
	height: '40px',
	display: 'flex',
	marginLeft: '10px',
	marginBottom: '20px',

	borderRadius: '4px',
	border: '1px solid #FF7A00',
	justifyContent: 'center',
	alignItems: 'center',
	transition: 'background-color 0.3s',
	'&:hover': {
		backgroundColor: '#ff9933',
	},

	'@media (max-width: 600px)': {
		width: '150px',
		height: '40px',
		fontSize: '12px', // Change the width for screens smaller than 600px
	},
});

const Subscriptions = styled(Button)({
	backgroundColor: 'transparent',
	color: 'white',
	textAlign: 'center',
	fontFamily: 'Roboto',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '16px',
	letterSpacing: '0.5px',
	marginLeft: '9px',
	marginBottom: '20px',

	width: '196px',
	height: '40px',
	display: 'flex',
	borderRadius: '4px', // Use camelCase for property names
	border: '1px solid #FF7A00', // Set the border property with the correct syntax
	justifyContent: 'center',
	alignItems: 'center',
	transition: 'background-color 0.3s',
	'&:hover': {
		backgroundColor: '#ff9933',
	},
});

const handleSignUpClick = () => {
	window.location.href = '/userrole';
};

function Header() {
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column whole-page">
			<div className="header-main">
				<div>
					<img className="logo" alt="logo" src={Logo} />
				</div>
				<div className="items-labels">
					<a href="" className="text-label">
						Features
					</a>
					<a href="" className="text-label">
						News & Blog
					</a>
					<a href="" className="text-label">
						Subscriptions
					</a>
					<a href="" className="text-label">
						About
					</a>
				</div>

				<div className="d-flex flex-row align-items-center me-4">
					<a href="/login" className="text-label">
						Login
					</a>
					<CustomButton variant="contained">Get started free</CustomButton>
				</div>
			</div>

			<div className="simplyfy-your-div">
				Simplify Your Finances, Grow Your Bus Business
			</div>
			<div className="busbuddy-makes-div">
				BusBuddy makes financial management effortless, saving you time and
				money to focus on what matters.
			</div>
			<div className="Simplify-Finances-div">Sign Up and Simplify Finances</div>
			<div className="d-flex flex-row  btn-2-div">
				<CustomButton_sign_up variant="contained" onClick={handleSignUpClick}>
					Sign up
				</CustomButton_sign_up>
				<Subscriptions variant="contained">Subscriptions</Subscriptions>
			</div>
			<div className="out-partners">Our Partners</div>
			<div className="partner-row">
				<img className="partner-icon-1" alt="logo" src={Partner_1} />
				<img className="partner-icon-2" alt="logo" src={Partner_2} />
				<img className="partner-icon-3" alt="logo" src={Partner_3} />
				<img className="partner-icon-4" alt="logo" src={Partner_4} />
			</div>
		</div>
	);
}

export default Header;
