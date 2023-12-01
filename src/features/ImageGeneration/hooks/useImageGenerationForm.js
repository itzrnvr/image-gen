import { useState } from 'react';
import { useImageGenerationStore } from '../store/useImageGenerationStore';
import { generateImage } from '../services/imageGenerationService';
import {fetchImage} from "../services/imageFetchingService";
import {fetchPublicModels} from "../services/publicmodelFetchingService";

// Refactored useImageGenerationForm hook
const useImageGenerationForm = (initialState) => {
	const [formData, setFormData] = useState(initialState);
	const [models, setModels] = useState()
	const {setIsLoading, addGeneratedImages, setGeneratedImages } = useImageGenerationStore();
	
	const fetchModels = (key) => {
		fetchPublicModels(key).then(response => {
			setModels(response)
		})
	}
	
	const handleChange = (e) => {
		const { name, value, type, selectedOptions } = e.target;
		setFormData(prevState => {
			if (type === 'select-multiple') {
				const values = Array.from(selectedOptions, option => option.value);
				return { ...prevState, [name]: values };
			} else {
				if(name === 'key') {
					fetchModels(value)
				}
				return { ...prevState, [name]: value };
			}
		});
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setGeneratedImages([])
		
		try {
			const model_ids = Array.isArray(formData.model_id) ? formData.model_id : [formData.model_id];
			
			const responses = await Promise.all(model_ids.map(model_id =>
				generateImage({ ...formData, model_id })
			));
			
			const waitForEta = (eta, duration) => {
				const adjustedEta = Math.max(eta - duration, 0);
				return new Promise(resolve => setTimeout(resolve, adjustedEta * 1000));
			};
			
			const imagesFetchingPromises = responses.flatMap(async (response) => {
				const { status, output, id, eta, duration } = response;
				
				if (status === "success") {
					addGeneratedImages(output);
					return output; // Use the output directly from the generateImage response
				} else if (status === "processing" && id && eta) {
					await waitForEta(eta, duration); // Wait for the provided eta before fetching
					const fetchResponse = await fetchImage(id, formData.key);
					addGeneratedImages(fetchResponse.output);
					return fetchResponse.output; // Use the output from the fetchImage response
				}
			});
			
			const fetchedImages = await Promise.all(imagesFetchingPromises);
			
			// Flatten the arrays since the responses could be arrays of image URLs
			const completelyGeneratedImages = fetchedImages.flat();
			
			// setGeneratedImages(completelyGeneratedImages);
		} catch (error) {
			console.error('Failed to generate images:', error);
		} finally {
			setIsLoading(false);
		}
	};
	
	return {
		models,
		formData,
		handleChange,
		handleSubmit,
	};
};

export default useImageGenerationForm;
