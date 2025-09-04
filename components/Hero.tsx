"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export function HeroSectionOne() {
	const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

	return (
		<div
			className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center overflow-hidden rounded-2xl"
			onMouseMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				setPos({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			}}
			onMouseLeave={() => setPos(null)}
		>
			{/* Purple glow that follows mouse */}
			{pos && (
				<motion.div
					className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
					style={{
						background: `radial - gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(168, 85, 247, 0.35), transparent 70 %)`,
					}}
				/>
			)}

			{/* Sparkles */}
			{pos && (
				<div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
					{[...Array(40)].map((_, i) => {
						const size = Math.random() * 2 + 1; // 1-3px
						const spread = 220; // spread of sparkles
						return (
							<motion.span
								key={i}
								className="absolute rounded-full bg-purple-400"
								style={{ width: size, height: size }}
								initial={{
									opacity: 0,
									scale: 0,
									x: pos.x,
									y: pos.y,
								}}
								animate={{
									opacity: [0, 1, 0],
									scale: [0, 1, 0],
									x: pos.x + (Math.random() - 0.5) * spread,
									y: pos.y + (Math.random() - 0.5) * spread,
								}}
								transition={{
									duration: Math.random() * 1.2 + 0.8, // 0.8 - 2s
									repeat: Infinity,
									repeatType: "loop",
									delay: i * 0.05,
								}}
							/>
						);
					})}
				</div>
			)}

			{/* Left vertical line */}
			<div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/50 dark:bg-neutral-800/60">
				<div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
			</div>

			{/* Right vertical line */}
			<div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/50 dark:bg-neutral-800/60">
				<div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
			</div>

			{/* Top horizontal line */}
			<div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/50 dark:bg-neutral-800/60">
				<div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
			</div>

			{/* Bottom horizontal line */}
			<div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/50 dark:bg-neutral-800/60">
				<div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-20 px-4 py-10 md:py-20">
				<h1 className="mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
					{"Empower your ideas with PeerPulse"
						.split(" ")
						.map((word, index) => (
							<motion.span
								key={index}
								initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
								animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
									ease: "easeInOut",
								}}
								className="mr-2 inline-block"
							>
								{word}
							</motion.span>
						))}
				</h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.8 }}
					className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
				>
					We are there to make a change
					how you put your ideas into reality.
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 1 }}
					className="mt-8 flex flex-wrap items-center justify-center gap-4"
				>
					<button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
						Explore Now
					</button>
					<button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
						Contact Support
					</button>
				</motion.div>
			</div>
		</div>
	);
}