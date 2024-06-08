import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSelectPage.css';
import Briefcase from '../../Assets/Briefcase.png';
import SteeringWheel from '../../Assets/SteeringWheel.png';
import User from '../../Assets/User.png';
import Footer from '../../Components/OnBoaringComponents/Footer/Footer';
import Swal from 'sweetalert2';

function UserSelectPage() {
	const navigate = useNavigate();
	const [selectedRole, setSelectedRole] = useState('');

	const handleRoleSelect = (role) => {
		setSelectedRole(role);
	};

	const mapRoleToApiRole = (role) => {
		switch (role) {
			case 'Owner':
				return 'ROLE_ADMIN';
			case 'Driver':
				return 'ROLE_DRIVER';
			case 'Conductor':
				return 'ROLE_CONDUCTOR';
			default:
				return '';
		}
	};

	const handleNextStep = () => {
		if (selectedRole) {
			navigate('/signup', { state: { role: mapRoleToApiRole(selectedRole) } });
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please select a role before proceeding.',
			});
		}
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<div className="user_container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
					<button className="back-button" onClick={() => navigate('/')}>
						Back
					</button>
					<div className="userrole-text-main">Select User Role</div>

					<div className="row d-flex justify-content-around">
						<div className="col d-flex justify-content-center ">
							<button
								className={`user-container d-flex flex-column justify-content-center ${
									selectedRole === 'Owner' ? 'selected' : ''
								}`}
								onClick={() => handleRoleSelect('Owner')}
							>
								<div className="d-flex flex-column justify-content-center text-center ">
									<div className="row d-flex justify-content-center">
										<img
											className=" icon-style mb-4"
											alt="briefcaseIcon"
											src={Briefcase}
										/>
									</div>
									<div className="row">
										<div className="role-text">Owner</div>
									</div>
								</div>
							</button>
						</div>

						<div className="col d-flex justify-content-center ">
							<button
								className={`user-container d-flex flex-column justify-content-center ${
									selectedRole === 'Driver' ? 'selected' : ''
								}`}
								onClick={() => handleRoleSelect('Driver')}
							>
								<div className="d-flex flex-column justify-content-center text-center ">
									<div className="row d-flex justify-content-center">
										<img
											className=" icon-style mb-4"
											alt="steeringWheelIcon"
											src={SteeringWheel}
										/>
									</div>
									<div className="row">
										<div className="role-text">Driver</div>
									</div>
								</div>
							</button>
						</div>

						<div className="col d-flex justify-content-center ">
							<button
								className={`user-container d-flex flex-column justify-content-center ${
									selectedRole === 'Conductor' ? 'selected' : ''
								}`}
								onClick={() => handleRoleSelect('Conductor')}
							>
								<div className="d-flex flex-column justify-content-center text-center ">
									<div className="row d-flex justify-content-center">
										<img
											className=" icon-style mb-4"
											alt="userIcon"
											src={User}
										/>
									</div>
									<div className="row">
										<div className="role-text">Conductor</div>
									</div>
								</div>
							</button>
						</div>
					</div>

					<div className="d-grid gap-2 mt-3 d-md-flex justify-content-center">
						<button
							className="btn me-md-2 create-btn"
							type="button"
							onClick={handleNextStep}
						>
							NEXT STEP
						</button>
					</div>
				</div>
			</div>
			<div className="footer-full">
				<Footer />
			</div>
		</div>
	);
}

export default UserSelectPage;
