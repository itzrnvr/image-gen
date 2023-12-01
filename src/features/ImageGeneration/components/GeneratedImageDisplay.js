import React from 'react';
import { useImageGenerationStore } from '../store/useImageGenerationStore';
import ImageWithRetry from "./ImageWithRetry";

const MAX_RETRIES = 20;
const RETRY_INTERVAL = 500; // 500ms
const GeneratedImagesDisplay = () => {
	const { generatedImages } = useImageGenerationStore();
	
	if (generatedImages.length === 0) {
		return <p>No images generated yet. Use the form to generate some images.</p>;
	}
	
	return (
		<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{generatedImages.map((imageSrc, index) => (
				<div key={index} className="rounded shadow-lg">
					<ImageWithRetry src={imageSrc} alt={"Generated content"} className={'rounded-lg'}/>
				</div>
			))}
		</div>
	);
};

export default GeneratedImagesDisplay;
