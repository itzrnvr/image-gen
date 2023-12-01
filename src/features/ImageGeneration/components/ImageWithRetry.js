import { useEffect, useState } from 'react';

const MAX_RETRIES = 10;
const RETRY_INTERVAL = 500; // 500ms

const ImageWithRetry = ({ src, alt, placeholder, ...props }) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [retries, setRetries] = useState(0);
	
	useEffect(() => {
		const img = new Image();
		
		img.onload = () => {
			setLoaded(true);
		};
		
		img.onerror = () => {
			if (retries < MAX_RETRIES) {
				setTimeout(() => {
					setRetries((currentRetries) => currentRetries + 1);
					img.src = `${src}?retry=${retries}`;
				}, RETRY_INTERVAL);
			} else {
				setError(true);
			}
		};
		
		img.src = src;
		
		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [src, retries]);
	
	if (error) {
		return <p>Failed to load image after multiple retries.</p>;
	}
	
	return (
		<div style={{ position: 'relative' }}>
			<img src={placeholder} alt={alt} {...props} style={{ display: loaded ? 'none' : 'block' }} />
			{loaded && <img src={src} alt={alt} {...props} style={{ position: 'absolute', top: 0, left: 0, transition: 'opacity 0.5s ease-out', opacity: loaded ? 1 : 0 }} />}
		</div>
	);
};

export default ImageWithRetry;
