import React from 'react';
import GenerationForm from '../../features/ImageGeneration/components/GenerationForm';
import LoadingIndicator from '../../features/ImageGeneration/components/LoadingIndicator';
import { useImageGenerationStore } from '../../features/ImageGeneration/store/useImageGenerationStore';
import GeneratedImagesDisplay from "../../features/ImageGeneration/components/GeneratedImageDisplay";

const ImageGenerationScreen = () => {
	const { isLoading } = useImageGenerationStore();
	
	return (
		<div className="mx-auto p-4 space-y-6">
			<h1 className="text-2xl font-bold text-center mb-6">Image Generation</h1>
			
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-3/10">
					<GenerationForm />
				</div>
				<div className="w-full md:w-7/10 mt-8 md:mt-0 border-2 border-pink-400 flex-col justify-center items-center">
					
					{isLoading && <LoadingIndicator />}
					
					<GeneratedImagesDisplay />
				</div>
			</div>

		</div>
	);
};

export default ImageGenerationScreen;
