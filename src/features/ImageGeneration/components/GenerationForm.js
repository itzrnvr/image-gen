import React, {useEffect} from 'react';
import useImageGenerationForm from '../hooks/useImageGenerationForm';
import { Input } from "@material-tailwind/react";
import {fetchPublicModels} from "../services/publicmodelFetchingService";

const modelOptions = [
	{ id: 'protovisionxl-v3', label: 'Protovisionxl-v3' },
	{ id: 'rundiffusion-fx-photoreal', label: 'RunDiffusion FX Photorealistic' },
	{ id: 'abyssorangemix2-hardcore', label: 'Abyssorangemix2 Hardcore'},
	{ id: 'realistic-stock-photo', label: 'Realistic Stock Photo' },
	{ id: 'lob-realvisxl-v20', label: 'lob-RealVisXL V2.0' },
	{ id: 'midjourney', label: 'MidJourney' },
	// ... other model options
];

const initialState = {
	height: 1024,
	model_id: '', // We can start with an empty string if no default is selected
	num_inference_steps: 41,
	enhance_prompt: 'yes',
	samples: 4,
	negative_prompt: '',
	prompt: '',
	seed: '',
	key: '',
	upscale: 'no',
	safety_checker: 'no',
	width: 1024,
	guidance_scale: 11
};

const GenerationForm = () => {
	const {models, formData, handleChange, handleSubmit } = useImageGenerationForm(initialState);
	
	return (
		<>
			<h1 className="text-2xl font-extrabold mt-4 mb-6">Configuration</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="form-group">
					<label htmlFor="model_id" className="font-medium">Model:</label>
					<select
						id="model_id"
						name="model_id"
						value={formData.model_id}
						onChange={handleChange}
						multiple={true} // Allow multiple selections if applicable
						className="form-control border-2 p-2 rounded w-full"
					>
						{models?.map((option) => (
							<option key={option?.model_id} value={option?.model_id}>
								{option?.model_name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="prompt" className="font-medium">Prompt:</label>
					<input
						type="text"
						id="prompt"
						name="prompt"
						value={formData.prompt}
						onChange={handleChange}
						className="form-control border-2 p-2 rounded w-full"
						placeholder="Enter prompt"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="numSamples" className="font-medium">Number of Samples:</label>
					<input
						type="number"
						id="samples"
						name="samples"
						onChange={handleChange}
						className="form-control border-2 p-2 rounded w-full"
						value={formData.samples}
						min="1"
						max="4"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="numInferenceSteps" className="font-medium">Number of Inference Steps:</label>
					<input
						type="number"
						id="num_inference_steps"
						name="num_inference_steps"
						className="form-control border-2 p-2 rounded w-full"
						value={formData.num_inference_steps}
						onChange={handleChange}
						required
					/>
				</div>
				{/* More fields can be added similarly. Using height, width as examples. */}
				<div className="form-group">
					<label htmlFor="height" className="font-medium">Height:</label>
					<input
						type="number"
						id="height"
						name="height"
						onChange={handleChange}
						className="form-control border-2 p-2 rounded w-full"
						value={formData.height}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="width" className="font-medium">Width:</label>
					<input
						type="number"
						id="width"
						name="width"
						onChange={handleChange}
						className="form-control border-2 p-2 rounded w-full"
						value={formData.width}
						required
					/>
				</div>
				
				<div className="form-group">
					<label htmlFor="key" className="font-medium">API KEY:</label>
					<input
						type="text"
						id="key"
						name="key"
						onChange={handleChange}
						className="form-control border-2 p-2 rounded w-full"
						value={formData.key}
						required
					/>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Generate Image
				</button>
			</form>
		</>
	);
};

export default GenerationForm;
