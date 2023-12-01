import {apiClient} from "../../../services/apiClient";

export const fetchPublicModels = async (key) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	};
	
	const body = {
		key: key
	};

	try {
		const response = await apiClient.post('/v4/dreambooth/model_list', body, config);
		return response.data
	} catch (error) {
		console.error('Error generating image:', error.response?.data || error.message);
		throw error;
	}
};
