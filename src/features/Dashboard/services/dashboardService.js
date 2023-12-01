import { apiClient } from '../../../services/apiClient';

export const dashboardService = {
	// Function to get dashboard statistics
	getStatistics: async () => {
		try {
			const response = await apiClient.get('/dashboard/statistics');
			return response.data;
		} catch (error) {
			console.error('Failed to fetch statistics', error);
			// Handle the error scenario
			throw error;
		}
	},
	// ... other API calls specific to the Dashboard feature ...
};
