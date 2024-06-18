import PriceContainerGallery from '../../../Components/OnBoaringComponents/PriceContainers/PriceContainerGallery.jsx';

import React from 'react';
import SidebarOwner from './SidebarOwner';

function Membership() {
	return (
		<SidebarOwner>
			<div className="d-flex flex-row justify-content-start">
				<h1>Membership</h1>
			</div>
			<div className="d-flex flex-row justify-content-center">
				<PriceContainerGallery />
			</div>
		</SidebarOwner>
	);
}

export default Membership;
