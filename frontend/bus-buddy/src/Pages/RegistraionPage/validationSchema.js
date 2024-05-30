import * as yup from 'yup';

const validationSchema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	mobileNo: yup
		.string()
		.matches(/^[0-9]+$/, 'Mobile number must be numeric')
		.required('Mobile number is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(
			/[!@#$%^&*(),.?":{}|<>]/,
			'Password must contain at least one special character'
		)
		.required('Password is required'),
	confirm_password: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
});

export default validationSchema;
