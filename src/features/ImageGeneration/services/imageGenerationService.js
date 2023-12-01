import {apiClient} from "../../../services/apiClient";

export const generateImage = async (formData) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	};
	
	const body = {
		...formData,
		enhance_prompt: 'yes',
		safety_checker: 'no',
	};
	const startTimestamp = Date.now();
	try {
		const response = await apiClient.post('/v4/dreambooth', body, config);
		const endTimestamp = Date.now(); // End timing the generateImage request
		const duration = (endTimestamp - startTimestamp) / 1000; // Calculate request duration
		
		return {...response.data, duration};
	} catch (error) {
		console.error('Error generating image:', error.response?.data || error.message);
		throw error;
	}
};
