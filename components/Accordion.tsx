"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

interface AccordionItemProps {
	title: string;
	content: string;
	isOpen: boolean;
	onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	content,
	isOpen,
	onClick,
}) => {
	return (
		<div
			className="mb-2 rounded-lg bg-transparent backdrop-blur-md border border-[#6600ff]/50 p-3 cursor-pointer select-none shadow-sm hover:backdrop-blur-lg transition"
			onClick={onClick}
		>
			{/* Header */}
			<div className="flex justify-between items-center text-white">
				<span className="text-lg font-medium">{title}</span>
				<motion.span
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<FiChevronRight size={18} />
				</motion.span>
			</div>

			{/* Content */}
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
						className="overflow-hidden mt-1 text-sm text-[white]/75"
					>
						<div className="p-1">{content}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default function CustomAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="flex justify-center items-start min-h-[60vh] py-8 text-white">
			{/* Outer glassmorphic box */}
			<div className="w-full max-w-6xl rounded-2xl p-6 shadow-2xl">

				{/* Heading */}
				<h2 className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 text-white text-center">
					Frequently Asked <span className="text-purple-500">Questions</span>
				</h2>

				{/* Inner glassmorphic box */}
				<div className="w-full p-4 shadow-lg">
					{[
						{ title: "Who can join SkillPulse?", content: "Students, teachers, and professionals anyone who wants to give or receive constructive feedback." },
						{ title: "How is SkillPulse different from other platforms?", content: "Unlike social platforms that focus on likes and followers, SkillPulse is built for professional growth, mentorship, and skill-building." },
						{ title: "Who can post feedback? Is feedback anonymous?", content: "Only registered users (those with accounts) can post feedback. Reviewers may choose to submit feedback anonymously to the recipient, but all submissions are tied to accounts internally for safety." },
						{ title: "Will it cost me to use the platform?", content: "No, the core features are free. The goal is to make learning and feedback accessible to everyone." },
						{ title: "Can all feedback be guaranteed to be useful?", content: "Not always. Feedback depends on the reviewer’s perspective, so usefulness may vary. SkillPulse simply provides a space to share and receive different viewpoints." },
					].map((item, index) => (
						<AccordionItem
							key={index}
							title={item.title}
							content={item.content}
							isOpen={openIndex === index}
							onClick={() => toggleItem(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}