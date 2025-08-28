import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscFeedback } from "react-icons/vsc";
import { FaRegHandshake } from "react-icons/fa6";
import { BiUserPin } from "react-icons/bi";
import { useResponsiveWidth } from '../lib/useResponsiveWidth';
import { IconFileCvFilled, IconReplaceUser } from '@tabler/icons-react';

interface FeatureItem {
	id: number;
	title: string;
	description: string;
	icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
	{
		id: 1,
		title: "Micro-Feedback System",
		description: "Receive quick, constructive feedback on presentations, resumes, interviews, and communication skills, anonymously and growth-focused.",
		icon: <VscFeedback className="w-12 h-12" />
	},
	{
		id: 2,
		title: "Guidance & Help Forums",
		description: "Ask questions, seek advice, and share insights on academic, career, and workplace challenges. Build a culture of mentorship and support.",
		icon: <FaRegHandshake className="w-12 h-12" />
	},
	{
		id: 3,
		title: "Resume & Portfolio Reviews",
		description: "Upload your resume or portfolio and get structured peer or professional feedback that actually helps you grow.",
		icon: <IconFileCvFilled className="w-12 h-12" />
	},
	{
		id: 4,
		title: "User Profiles & Roles",
		description: "Every registered user has a profile that highlights their role like Student, Educator, or Professional, making it easier to understand feedback in context.",
		icon: <BiUserPin className="w-12 h-12" />
	},
	{
		id: 5,
		title: "Skill Exchange & Collaboration",
		description: "Connect with peers in your network to share & learn skills whether it’s coding, design, or public speaking, fostering a true community of growth.",
		icon: <IconReplaceUser className="w-12 h-12" />
	}
];

const CarouselNew = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTouching, setIsTouching] = useState(false);
	const [touchStart, setTouchStart] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const width = useResponsiveWidth(1024, 375, 768);

	// Determine if we're on mobile or desktop
	const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

	// Autoplay effect
	useEffect(() => {
		if (isTouching) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURES.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isTouching]);

	// Touch handlers for mobile swiping
	const handleTouchStart = (e: React.TouchEvent) => {
		setIsTouching(true);
		setTouchStart(e.touches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isTouching) return;

		const touchEnd = e.touches[0].clientX;
		const diff = touchStart - touchEnd;

		// Only change slide if the swipe is significant enough
		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				// Swipe left - go to next slide
				setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURES.length);
			} else {
				// Swipe right - go to previous slide
				setCurrentIndex((prevIndex) => (prevIndex - 1 + FEATURES.length) % FEATURES.length);
			}
			setIsTouching(false);
		}
	};

	const handleTouchEnd = () => {
		setIsTouching(false);
	};

	// Change slide function
	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="w-full min-h-[85vh] md:h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12">
			<h2 className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 text-white text-center">
				Our <span className="text-purple-500">Features</span>
			</h2>

			<div
				ref={containerRef}
				className="relative w-full mx-auto h-[350px] md:h-[400px] flex items-center justify-center"
				style={{ maxWidth: '46rem' }}
			>
				{/* Outer transparent box with blur */}
				<div className="absolute inset-0 rounded-2xl overflow-hidden">
					{/* Background blur */}
					<div className="absolute inset-0 backdrop-blur-md bg-black/20 rounded-2xl border border-gray-700/50"></div>

					{/* Subtle glow effect at corners */}
					<div className="absolute top-0 left-0 w-20 h-20 bg-purple-500/20 blur-xl rounded-full"></div>
					<div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/20 blur-xl rounded-full"></div>
				</div>

				{/* Feature slides container */}
				<div
					className="relative z-20 w-full h-full overflow-hidden rounded-2xl px-4 py-3 md:px-6 md:py-6 flex flex-col"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5 }}
							className="w-full flex-1 flex flex-col items-center justify-center pt-4 md:pt-0 pb-4 text-center"
						>
							{/* Inner box with subtle background for each feature */}
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 md:p-8 w-full max-w-xl mx-auto shadow-xl h-[250px] md:h-[300px] overflow-auto flex flex-col items-center justify-center"
							>
								<motion.div
									initial={{ scale: 0.8 }}
									animate={{ scale: 1 }}
									transition={{ duration: 0.5 }}
									className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4 rounded-full mb-2 md:mb-4 mx-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
								>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
										className="text-white"
									>
										{FEATURES[currentIndex].icon}
									</motion.div>
								</motion.div>
								<motion.h3
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-white"
								>
									{FEATURES[currentIndex].title}
								</motion.h3>
								<motion.p
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									className="text-gray-300 text-sm md:text-base max-w-xl overflow-auto"
								>
									{FEATURES[currentIndex].description}
								</motion.p>
							</motion.div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation dots */}
					<div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
						{FEATURES.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentIndex === index
									? "bg-purple-500 w-5 md:w-6"
									: "bg-gray-500/50 hover:bg-gray-400/80"
									}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>

					{/* Navigation arrows for desktop */}
					{!isMobile && (
						<>
							<button
								onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + FEATURES.length) % FEATURES.length)}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 md:p-3 rounded-full z-30 transition-all border border-purple-500/30"
								aria-label="Previous slide"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M15 18l-6-6 6-6" />
								</svg>
							</button>
							<button
								onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURES.length)}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 md:p-3 rounded-full z-30 transition-all border border-purple-500/30"
								aria-label="Next slide"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M9 18l6-6-6-6" />
								</svg>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CarouselNew;