import create from 'zustand';

export const useImageGenerationStore = create((set) => ({
	generatedImages: [],
	isLoading: false,
	
	// Action to add images to the existing list
	addGeneratedImages: (newImages) => set(state => ({
		generatedImages: [...state.generatedImages, ...newImages]
	})),
	// Action to set generated images
	setGeneratedImages: (images) => set({ generatedImages: images }),
	
	// Action to set loading status
	setIsLoading: (loading) => set({ isLoading: loading }),
	
	// Reset store to initial state
	reset: () => set({ generatedImages: [], isLoading: false }),
}));
