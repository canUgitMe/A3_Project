import { useState, useEffect } from 'react';

export function useResponsiveWidth(desktopWidth: number, mobileWidth: number, breakpoint: number = 768) {
	const [width, setWidth] = useState<number>(
		typeof window !== 'undefined' ?
			window.innerWidth < breakpoint ? mobileWidth : desktopWidth :
			desktopWidth
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			setWidth(window.innerWidth < breakpoint ? mobileWidth : desktopWidth);
		};

		window.addEventListener('resize', handleResize);

		// Initial call to set the correct width
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [desktopWidth, mobileWidth, breakpoint]);

	return width;
}
