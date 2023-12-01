import { apiClient } from "../../../services/apiClient";

export const fetchImage = async (id, key) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${key}`
		},
	};
	
	const body = {
		key: key
	};
	
	
	// Recursive function to poll the API every 500ms until the status is 'success'
	const pollForImage = async () => {
		try {
			const response = await apiClient.post(`/v3/dreambooth/fetch/${id}`, body, config);
			
			if (response.data.status === 'success') {
				// When status is 'success', resolve the promise with the response data
				return response.data;
			} else {
				// If status is not 'success', wait for 500ms and then retry
				await new Promise(resolve => setTimeout(resolve, 500));
				return pollForImage(); // Recursively call until success
			}
		} catch (error) {
			// Handle errors that occur during the API request
			console.error('Error fetching image:', error.response?.data || error.message);
			throw error;
		}
	};
	
	// Initial call to the recursive polling function
	return pollForImage();
};
