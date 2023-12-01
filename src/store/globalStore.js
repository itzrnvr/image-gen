import create from 'zustand';

export const useGlobalStore = create((set) => ({
	// Example global state for theme
	theme: 'light',
	
	// Toggle theme action
	toggleTheme: () =>
		set((state) => ({
			theme: state.theme === 'light' ? 'dark' : 'light',
		})),
	
	// Other global states and actions...
}));
