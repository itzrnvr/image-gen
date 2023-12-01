// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import ImageGeneration from './screens/ImageGeneration';
// ... any other imports ...

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/image-gen" element={<ImageGeneration />} />
				<Route path="/image-generation" element={<ImageGeneration />} />
			</Routes>
		</Router>
	);
}

export default App;
