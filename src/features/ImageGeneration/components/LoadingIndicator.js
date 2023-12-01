import React from 'react';
import { Spinner } from "@material-tailwind/react";

const LoadingIndicator = () => {
	return (
		<div className={'my-4 w-full justify-center flex items-center'}>
			<Spinner className="h-12 w-12" />
		</div>
	);
};

export default LoadingIndicator;
