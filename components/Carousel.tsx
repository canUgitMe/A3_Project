import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import React, { JSX } from "react";

// replace icons with your own if needed
import {
	FiCircle,
	FiCode,
	FiFileText,
	FiLayers,
	FiLayout,
} from "react-icons/fi";
export interface CarouselItem {
	title: string;
	description: string;
	id: number;
	icon: React.ReactNode;
}

export interface CarouselProps {
	items?: CarouselItem[];
	baseWidth?: number;
	mobileWidth?: number;
	autoplay?: boolean;
	autoplayDelay?: number;
	pauseOnHover?: boolean;
	loop?: boolean;
	round?: boolean;
	fullHeight?: boolean;
	title?: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
	{
		title: "Text Animations",
		description: "Engaging text animations that bring your content to life with smooth transitions and eye-catching effects. Perfect for adding visual interest to your user interface.",
		id: 1,
		icon: <FiFileText className="h-[20px] w-[20px] text-white" />,
	},
	{
		title: "Smooth Animations",
		description: "Fluid motion effects that enhance user experience and make your interface feel responsive and dynamic. Create seamless transitions between states and pages.",
		id: 2,
		icon: <FiCircle className="h-[20px] w-[20px] text-white" />,
	},
	{
		title: "Reusable Components",
		description: "Modular building blocks that help you construct consistent interfaces across your entire application. Save time and maintain quality with our pre-built components.",
		id: 3,
		icon: <FiLayers className="h-[20px] w-[20px] text-white" />,
	},
	{
		title: "Beautiful Backgrounds",
		description: "Stunning patterns and gradients that create depth and visual interest in your application design. Choose from a variety of styles to match your brand aesthetic.",
		id: 4,
		icon: <FiLayout className="h-[20px] w-[20px] text-white" />,
	},
	{
		title: "Advanced UI Tools",
		description: "Powerful interface elements that simplify complex interactions and enhance user workflow efficiency. Build sophisticated interfaces with minimal effort.",
		id: 5,
		icon: <FiCode className="h-[20px] w-[20px] text-white" />,
	},
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
	items = DEFAULT_ITEMS,
	baseWidth = 500,
	mobileWidth = 350,
	autoplay = false,
	autoplayDelay = 3000,
	pauseOnHover = false,
	loop = false,
	round = false,
	fullHeight = false,
	title = "Our Features",
}: CarouselProps): JSX.Element {
	const containerPadding = 16;
	const [currentWidth, setCurrentWidth] = useState<number>(typeof window !== 'undefined' ?
		window.innerWidth < 768 ? mobileWidth : baseWidth : baseWidth);
	const [itemWidth, setItemWidth] = useState<number>(currentWidth - containerPadding * 2);
	const [trackItemOffset, setTrackItemOffset] = useState<number>((currentWidth - containerPadding * 2) + GAP);

	const carouselItems = loop ? [...items, items[0]] : items;
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const x = useMotionValue(0);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isResetting, setIsResetting] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement>(null);

	// Handle window resize for responsive behavior
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateDimensions = () => {
			const isMobile = window.innerWidth < 768;
			const newWidth = isMobile ? mobileWidth : baseWidth;
			setCurrentWidth(newWidth);

			const newItemWidth = newWidth - containerPadding * 2;
			setItemWidth(newItemWidth);
			setTrackItemOffset(newItemWidth + GAP);
		};

		// Initial calculation
		updateDimensions();

		// Add event listener
		window.addEventListener('resize', updateDimensions);

		// Clean up
		return () => window.removeEventListener('resize', updateDimensions);
	}, [baseWidth, mobileWidth, containerPadding]);

	useEffect(() => {
		if (pauseOnHover && containerRef.current) {
			const container = containerRef.current;
			const handleMouseEnter = () => setIsHovered(true);
			const handleMouseLeave = () => setIsHovered(false);
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
			return () => {
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			};
		}
	}, [pauseOnHover]);

	useEffect(() => {
		if (autoplay && (!pauseOnHover || !isHovered)) {
			const timer = setInterval(() => {
				setCurrentIndex((prev) => {
					if (prev === items.length - 1 && loop) {
						return prev + 1;
					}
					if (prev === carouselItems.length - 1) {
						return loop ? 0 : prev;
					}
					return prev + 1;
				});
			}, autoplayDelay);
			return () => clearInterval(timer);
		}
	}, [
		autoplay,
		autoplayDelay,
		isHovered,
		loop,
		items.length,
		carouselItems.length,
		pauseOnHover,
	]);

	const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

	const handleAnimationComplete = () => {
		if (loop && currentIndex === carouselItems.length - 1) {
			setIsResetting(true);
			x.set(0);
			setCurrentIndex(0);
			setTimeout(() => setIsResetting(false), 50);
		}
	};

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	): void => {
		const offset = info.offset.x;
		const velocity = info.velocity.x;
		if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
			if (loop && currentIndex === items.length - 1) {
				setCurrentIndex(currentIndex + 1);
			} else {
				setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
			}
		} else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
			if (loop && currentIndex === 0) {
				setCurrentIndex(items.length - 1);
			} else {
				setCurrentIndex((prev) => Math.max(prev - 1, 0));
			}
		}
	};

	const dragProps = loop
		? {}
		: {
			dragConstraints: {
				left: -trackItemOffset * (carouselItems.length - 1),
				right: 0,
			},
		};

	return (
		<div
			ref={containerRef}
			className={`self-center relative overflow-hidden p-4 ${fullHeight ? "min-h-screen flex flex-col justify-center items-center" : ""
				} ${round
					? "rounded-full border border-white"
					: "rounded-[15px] border border-[#222]"
				}`}
			style={{
				borderWidth: '2px',
				borderColor: '#6600ff',
				backdropFilter: 'blur(10px)',
				width: `${currentWidth}px`,
				...(round && { height: `${currentWidth}px` }),
			}}
		>
			<motion.div
				className="flex"
				drag="x"
				{...dragProps}
				style={{
					width: itemWidth,
					gap: `${GAP}px`,
					perspective: 1000,
					perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
					x,
				}}
				onDragEnd={handleDragEnd}
				animate={{ x: -(currentIndex * trackItemOffset) }}
				transition={effectiveTransition as any}
				onAnimationComplete={handleAnimationComplete}
			>
				{carouselItems.map((item, index) => {
					const range = [
						-(index + 1) * trackItemOffset,
						-index * trackItemOffset,
						-(index - 1) * trackItemOffset,
					];
					const outputRange = [90, 0, -90];
					const rotateY = useTransform(x, range, outputRange, { clamp: false });
					return (
						<motion.div
							key={index}
							className={`relative shrink-0 flex flex-col ${round
								? "items-center justify-center text-center bg-opacity-40 bg-gradient-to-br from-[#13111d]/70 to-[#161040]/70 border border-[#333267]/30"
								: "items-start justify-between bg-gradient-to-br from-[#1a1a2e]/60 to-[#161b2b]/60 border border-[#464669]/20 rounded-[12px]"
								} overflow-hidden backdrop-filter backdrop-blur-sm cursor-grab active:cursor-grabbing`}
							style={{
								width: itemWidth,
								height: round ? itemWidth : currentWidth >= 500 ? 300 : 250,
								rotateY: rotateY,
								...(round && { borderRadius: "50%" }),
								boxShadow: "0 8px 32px rgba(78, 0, 170, 0.15), 0 2px 8px rgba(55, 40, 84, 0.1)",
							}}
							transition={effectiveTransition as any}
						>
							<div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
								<span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-700">
									{item.icon}
								</span>
							</div>
							<div className="p-5 flex-1">
								<div className="mb-3 font-bold text-xl text-white">
									{item.title}
								</div>
								<p className="text-sm text-gray-300">{item.description}</p>
							</div>
						</motion.div>
					);
				})}
			</motion.div>
			<div
				className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
					}`}
			>
				<div className="mt-6 flex w-[150px] justify-between px-8">
					{items.map((_, index) => (
						<motion.div
							key={index}
							className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index
								? round
									? "bg-white"
									: "bg-gradient-to-r from-purple-600 to-blue-700"
								: round
									? "bg-[#555]"
									: "bg-[rgba(100,100,150,0.3)]"
								}`}
							animate={{
								scale: currentIndex % items.length === index ? 1.2 : 1,
							}}
							onClick={() => setCurrentIndex(index)}
							transition={{ duration: 0.15 }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
